// api/verify-totp.js — stage 2 of admin login.
//
// Verifies BOTH ADMIN_PASSWORD and the TOTP code together (so a malicious
// client cannot skip stage 1). On success, issues a signed session token
// the client uses for all subsequent admin API calls.
//
// Request body: { password: '<admin password>', code: '<6-digit TOTP>' }
//
// TOTP validation uses the otplib library (RFC 6238), compatible with
// Google Authenticator, Microsoft Authenticator, Authy, 1Password, etc.
// We allow ±1 window (≈30s before/after) to tolerate small clock drift.
//
// Required env vars:
//   ADMIN_PASSWORD
//   TOTP_SECRET   — base32-encoded secret, configured once via
//                   admin-setup-totp.html
'use strict';

const { passwordOk, issueSessionToken, TOKEN_TTL_SECONDS } = require('./_auth');

function getCode(body) {
  if (!body || typeof body !== 'object') return '';
  const raw = typeof body.code === 'string' ? body.code : '';
  // Strip whitespace (some apps copy "123 456").
  return raw.replace(/\s+/g, '');
}

function isValidCodeFormat(code) {
  return /^\d{6}$/.test(code);
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

  const body = (req.body && typeof req.body === 'object') ? req.body : {};
  const password = typeof body.password === 'string' ? body.password : '';
  const code = getCode(body);

  // Verify password first (timing-safe inside passwordOk).
  if (!passwordOk(password)) {
    return res.status(401).json({ error: 'Väärä salasana tai koodi' });
  }

  // Format check before we hit otplib (saves a few cycles, clearer error).
  if (!isValidCodeFormat(code)) {
    return res.status(401).json({ error: 'Väärä salasana tai koodi' });
  }

  let authenticator;
  try {
    authenticator = require('otplib').authenticator;
  } catch (e) {
    console.error('otplib not installed:', e);
    return res.status(500).json({ error: 'TOTP-kirjasto puuttuu' });
  }

  // Allow ±1 window (≈30s) of clock drift in either direction.
  authenticator.options = { window: 1 };

  let ok = false;
  try {
    ok = authenticator.check(code, process.env.TOTP_SECRET);
  } catch (e) {
    console.error('TOTP check threw:', e);
    return res.status(500).json({ error: 'TOTP-tarkistus epäonnistui' });
  }

  if (!ok) {
    // Same error text as wrong password — don't leak which factor failed.
    return res.status(401).json({ error: 'Väärä salasana tai koodi' });
  }

  const token = issueSessionToken();
  return res.status(200).json({
    ok: true,
    token: token,
    expiresInSeconds: TOKEN_TTL_SECONDS,
  });
};
