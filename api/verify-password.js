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
// Required env vars:
//   ADMIN_PASSWORD
'use strict';

const { isPasswordAuthorized } = require('./_auth');

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
  return res.status(200).json({ ok: true, needsTotp: true });
};
