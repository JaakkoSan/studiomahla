// api/verify-password.js — stage 1 of admin login.
//
// Verifies ADMIN_PASSWORD only. Returns 200 { ok: true } so the client
// knows it can proceed to stage 2 (TOTP). NO session token is issued
// here — the token is only issued after the TOTP code is also verified
// in /api/verify-totp.
//
// This endpoint exists so the UI can show the TOTP field only after a
// correct password is entered, while still preventing data access from
// password alone.
//
// Rate limiting: shared key 'login:<ip>' (same key used by verify-totp)
// so attackers can't alternate between the two endpoints to double their
// budget. 10 attempts per 5 minutes per IP. Fails open if Upstash is
// unavailable — see api/_ratelimit.js.
//
// Required env vars:
//   ADMIN_PASSWORD
// Optional env vars (rate limiting only):
//   UPSTASH_REDIS_REST_URL
//   UPSTASH_REDIS_REST_TOKEN
'use strict';

const { isPasswordAuthorized } = require('./_auth');
const { checkRateLimit, getClientIp } = require('./_ratelimit');

const RATE_LIMIT_MAX     = 10;
const RATE_LIMIT_WINDOW  = 5 * 60; // seconds

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!process.env.ADMIN_PASSWORD) {
    console.error('ADMIN_PASSWORD not configured');
    return res.status(500).json({ error: 'Adminia ei ole konfiguroitu' });
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

  if (!isPasswordAuthorized(req)) {
    return res.status(401).json({ error: 'Väärä salasana' });
  }
  return res.status(200).json({ ok: true, needsTotp: true });
};
