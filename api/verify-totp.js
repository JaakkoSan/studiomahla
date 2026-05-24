// api/verify-totp.js — stage 2 of admin login.
//
// Verifies BOTH ADMIN_PASSWORD and EITHER the TOTP code OR a backup
// recovery code together (so a malicious client cannot skip stage 1).
// On success, issues a signed session token the client uses for all
// subsequent admin API calls.
//
// Request body (one of):
//   { password: '<admin password>', code: '<6-digit TOTP>' }
//   { password: '<admin password>', backupCode: '<XXXXX-XXXXX>' }
//
// TOTP validation uses the otplib library (RFC 6238), compatible with
// Google Authenticator, Microsoft Authenticator, Authy, 1Password, etc.
// We allow ±1 window (≈30s before/after) to tolerate small clock drift.
//
// Backup codes are stored as HMAC-SHA256 hashes in the Supabase
// `backup_codes` table. Each code is single-use: the row is marked
// `used_at` atomically on consumption so the same code can't be used
// twice (race-safe via UPDATE ... WHERE used_at IS NULL).
//
// Rate limiting: shared key 'login:<ip>' (same key used by verify-password)
// so attackers can't alternate between the two endpoints to double their
// budget. 10 attempts per 5 minutes per IP. Fails open if Upstash is
// unavailable — see api/_ratelimit.js.
//
// Required env vars:
//   ADMIN_PASSWORD
//   TOTP_SECRET                  — base32-encoded TOTP secret
//   SUPABASE_URL                 — for backup-code lookup
//   SUPABASE_SERVICE_ROLE_KEY    — for backup-code lookup
// Optional env vars (rate limiting only):
//   UPSTASH_REDIS_REST_URL
//   UPSTASH_REDIS_REST_TOKEN
'use strict';

const { passwordOk, issueSessionToken, TOKEN_TTL_SECONDS, hashBackupCode } = require('./_auth');
const { checkRateLimit, getClientIp } = require('./_ratelimit');

const RATE_LIMIT_MAX     = 10;
const RATE_LIMIT_WINDOW  = 5 * 60; // seconds

function readField(body, key) {
  if (!body || typeof body !== 'object') return '';
  const raw = typeof body[key] === 'string' ? body[key] : '';
  return raw.replace(/\s+/g, '');
}

function isValidTotpFormat(code) {
  return /^\d{6}$/.test(code);
}

function isPlausibleBackupCode(code) {
  // After normalization the code is 10 alphanumerics. We accept anything
  // that *could* be a backup code (8-20 chars, alphanumeric ± hyphens/spaces)
  // and let the hash lookup decide.
  return /^[A-Za-z0-9 \-]{8,20}$/.test(code);
}

async function verifyTotp(code) {
  let authenticator;
  try {
    authenticator = require('otplib').authenticator;
  } catch (e) {
    console.error('otplib not installed:', e);
    return { error: 'TOTP-kirjasto puuttuu' };
  }
  // Allow ±1 window (≈30s) of clock drift in either direction.
  authenticator.options = { window: 1 };
  try {
    return { ok: authenticator.check(code, process.env.TOTP_SECRET) };
  } catch (e) {
    console.error('TOTP check threw:', e);
    return { error: 'TOTP-tarkistus epäonnistui' };
  }
}

/**
 * Consume a backup code: look up its hash, atomically mark used_at.
 * Returns true iff the code existed and was previously unused.
 */
async function consumeBackupCode(plaintext) {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Backup-code lookup: Supabase not configured');
    return false;
  }
  let createClient;
  try {
    createClient = require('@supabase/supabase-js').createClient;
  } catch (e) {
    console.error('@supabase/supabase-js not installed:', e);
    return false;
  }
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
  );

  const codeHash = hashBackupCode(plaintext);
  const usedAt = new Date().toISOString();

  // Atomic single-use: only succeeds when used_at IS NULL. Two parallel
  // requests for the same code can't both succeed.
  const { data, error } = await supabase
    .from('backup_codes')
    .update({ used_at: usedAt })
    .eq('code_hash', codeHash)
    .is('used_at', null)
    .select('id');

  if (error) {
    console.error('Backup-code lookup error:', error);
    return false;
  }
  return Array.isArray(data) && data.length === 1;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!process.env.ADMIN_PASSWORD) {
    console.error('ADMIN_PASSWORD not configured');
    return res.status(500).json({ error: 'Adminia ei ole konfiguroitu' });
  }
  if (!process.env.TOTP_SECRET) {
    console.error('TOTP_SECRET not configured');
    return res.status(500).json({
      error: 'Kaksivaiheista tunnistautumista ei ole konfiguroitu',
    });
  }

  const ip = getClientIp(req);
  const rl = await checkRateLimit('login:' + ip, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW);
  if (!rl.allowed) {
    res.setHeader('Retry-After', String(rl.retryAfter));
    return res.status(429).json({
      error: 'Liian monta kirjautumisyritystä. Yritä uudelleen noin ' +
        Math.ceil(rl.retryAfter / 60) + ' minuutin kuluttua.',
    });
  }

  const body = (req.body && typeof req.body === 'object') ? req.body : {};
  const password = typeof body.password === 'string' ? body.password : '';
  const code = readField(body, 'code');
  const backupCode = readField(body, 'backupCode');

  // Verify password first (timing-safe).
  if (!passwordOk(password)) {
    return res.status(401).json({ error: 'Väärä salasana tai koodi' });
  }

  let secondFactorOk = false;

  if (backupCode) {
    if (!isPlausibleBackupCode(backupCode)) {
      return res.status(401).json({ error: 'Väärä salasana tai koodi' });
    }
    try {
      secondFactorOk = await consumeBackupCode(backupCode);
    } catch (e) {
      console.error('consumeBackupCode threw:', e);
      return res.status(500).json({ error: 'Palautuskoodin tarkistus epäonnistui' });
    }
  } else {
    if (!isValidTotpFormat(code)) {
      return res.status(401).json({ error: 'Väärä salasana tai koodi' });
    }
    const r = await verifyTotp(code);
    if (r.error) return res.status(500).json({ error: r.error });
    secondFactorOk = !!r.ok;
  }

  if (!secondFactorOk) {
    // Same error text — don't leak which factor (or which method) failed.
    return res.status(401).json({ error: 'Väärä salasana tai koodi' });
  }

  const token = issueSessionToken();
  return res.status(200).json({
    ok: true,
    token: token,
    expiresInSeconds: TOKEN_TTL_SECONDS,
    usedBackupCode: !!backupCode,
  });
};
