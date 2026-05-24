// api/setup-totp.js — ONE-TIME TOTP setup endpoint.
//
// Generates a fresh TOTP secret + otpauth URL the admin scans into their
// Authenticator app. The same secret must then be copied manually into
// the Vercel env var TOTP_SECRET. Subsequent /api/verify-totp calls
// validate against that env var.
//
// This endpoint does NOT store the secret anywhere on its own — the
// admin is responsible for syncing it to Vercel. Re-visiting this page
// generates a different secret each time (good: doesn't leak the
// production secret if someone discovers the page later).
//
// Use cases: initial setup, re-pairing after a lost phone.
//
// IMPORTANT: After setup, delete this file (and admin-setup-totp.html)
// to reduce attack surface. The endpoint still requires ADMIN_PASSWORD,
// but defense in depth is better.
//
// Required env vars:
//   ADMIN_PASSWORD
'use strict';

const { isPasswordAuthorized } = require('./_auth');

const ISSUER = 'Mahlamäen Kauneusstudio';
const ACCOUNT = 'admin';

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!process.env.ADMIN_PASSWORD) {
    console.error('ADMIN_PASSWORD not configured');
    return res.status(500).json({ error: 'Adminia ei ole konfiguroitu' });
  }
  if (!isPasswordAuthorized(req)) {
    return res.status(401).json({ error: 'Väärä salasana' });
  }

  let authenticator;
  try {
    authenticator = require('otplib').authenticator;
  } catch (e) {
    console.error('otplib not installed:', e);
    return res.status(500).json({ error: 'TOTP-kirjasto puuttuu' });
  }

  const secret = authenticator.generateSecret(); // base32, 32 chars
  const otpauthUrl = authenticator.keyuri(ACCOUNT, ISSUER, secret);

  return res.status(200).json({
    ok: true,
    secret: secret,
    otpauthUrl: otpauthUrl,
    issuer: ISSUER,
    account: ACCOUNT,
    alreadyConfigured: !!process.env.TOTP_SECRET,
  });
};
