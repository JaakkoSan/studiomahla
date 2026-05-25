// functions/api/verify-totp.js — Cloudflare Pages Functions version.

import { passwordOk, issueSessionToken, TOKEN_TTL_SECONDS, hashBackupCode, jsonResponse } from './_auth.js';
import { checkRateLimit, getClientIp } from './_ratelimit.js';
import { authenticator } from 'otplib';
import { createClient } from '@supabase/supabase-js';

const RATE_LIMIT_MAX     = 10;
const RATE_LIMIT_WINDOW  = 5 * 60;

function readField(body, key) {
  if (!body || typeof body !== 'object') return '';
  const raw = typeof body[key] === 'string' ? body[key] : '';
  return raw.replace(/\s+/g, '');
}

function isValidTotpFormat(code) {
  return /^\d{6}$/.test(code);
}

function isPlausibleBackupCode(code) {
  return /^[A-Za-z0-9 \-]{8,20}$/.test(code);
}

function verifyTotp(code) {
  try {
    authenticator.options = { window: 1 };
    return { ok: authenticator.check(code, process.env.TOTP_SECRET) };
  } catch (e) {
    console.error('TOTP check threw:', e);
    return { error: 'TOTP-tarkistus epäonnistui' };
  }
}

async function consumeBackupCode(plaintext) {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Backup-code lookup: Supabase not configured');
    return false;
  }
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
  );

  const codeHash = hashBackupCode(plaintext);
  const usedAt = new Date().toISOString();

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

export async function onRequestPost(context) {
  const { request } = context;

  if (!process.env.ADMIN_PASSWORD) {
    return jsonResponse({ error: 'Adminia ei ole konfiguroitu' }, 500);
  }
  if (!process.env.TOTP_SECRET) {
    return jsonResponse({ error: 'Kaksivaiheista tunnistautumista ei ole konfiguroitu' }, 500);
  }

  const ip = getClientIp(request);
  const rl = await checkRateLimit('login:' + ip, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW);
  if (!rl.allowed) {
    return jsonResponse(
      {
        error: 'Liian monta kirjautumisyritystä. Yritä uudelleen noin ' +
          Math.ceil(rl.retryAfter / 60) + ' minuutin kuluttua.',
      },
      429,
      { 'Retry-After': String(rl.retryAfter) }
    );
  }

  let body;
  try { body = await request.json(); } catch (e) { body = {}; }
  const password = typeof body.password === 'string' ? body.password : '';
  const code = readField(body, 'code');
  const backupCode = readField(body, 'backupCode');

  if (!passwordOk(password)) {
    return jsonResponse({ error: 'Väärä salasana tai koodi' }, 401);
  }

  let secondFactorOk = false;
  if (backupCode) {
    if (!isPlausibleBackupCode(backupCode)) {
      return jsonResponse({ error: 'Väärä salasana tai koodi' }, 401);
    }
    try {
      secondFactorOk = await consumeBackupCode(backupCode);
    } catch (e) {
      console.error('consumeBackupCode threw:', e);
      return jsonResponse({ error: 'Palautuskoodin tarkistus epäonnistui' }, 500);
    }
  } else {
    if (!isValidTotpFormat(code)) {
      return jsonResponse({ error: 'Väärä salasana tai koodi' }, 401);
    }
    const r = verifyTotp(code);
    if (r.error) return jsonResponse({ error: r.error }, 500);
    secondFactorOk = !!r.ok;
  }

  if (!secondFactorOk) {
    return jsonResponse({ error: 'Väärä salasana tai koodi' }, 401);
  }

  const token = issueSessionToken();
  return jsonResponse({
    ok: true,
    token: token,
    expiresInSeconds: TOKEN_TTL_SECONDS,
    usedBackupCode: !!backupCode,
  }, 200);
}
