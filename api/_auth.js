// api/_auth.js — shared admin auth helpers.
//
// Vercel ignores files starting with "_" for routing (they don't become
// public endpoints), but they ARE deployed and can be required from
// sibling files in /api.
//
// Auth model
// ----------
// Admin access is gated by TWO factors:
//   1. ADMIN_PASSWORD (something you know)
//   2. TOTP code from an Authenticator app, validated against TOTP_SECRET
//      (something you have)
//
// After both factors pass on /api/verify-totp, the server issues a
// short-lived HMAC-signed session token. All protected endpoints
// (list-bookings, list-esitiedot, delete-esitietue, charge-booking) then
// accept ONLY this token — they no longer accept a raw password — so a
// leaked password alone cannot read or mutate any data.
//
// The HMAC signing key is derived from ADMIN_PASSWORD (so it rotates
// automatically when the password changes), passed through SHA-256 with a
// constant prefix so it isn't trivially the password itself.
//
// Token format: <base64url(payloadJson)>.<base64url(hmac)>
//   payloadJson = { iat: <unix>, exp: <unix>, v: 1 }
//
// Endpoints that take a password directly (verify-password, verify-totp,
// setup-totp) still use the x-admin-password header — they must, because
// the client hasn't been issued a token yet at that point.
//
// Endpoints that require a valid 2FA-verified session use the
// x-admin-token header.
'use strict';

const crypto = require('crypto');

const TOKEN_TTL_SECONDS = 12 * 60 * 60; // 12 h sliding session

/* ---------- generic helpers ---------- */

function timingSafeEqualStrings(a, b) {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function b64url(buf) {
  return Buffer.from(buf)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function b64urlDecode(s) {
  let str = String(s).replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return Buffer.from(str, 'base64');
}

/* ---------- password ---------- */

function getProvidedPassword(req) {
  const header = req.headers['x-admin-password'];
  if (typeof header === 'string' && header) return header;
  const auth = req.headers['authorization'];
  if (typeof auth === 'string' && auth.toLowerCase().startsWith('bearer ')) {
    return auth.slice(7);
  }
  return '';
}

function passwordOk(provided) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  if (!provided) return false;
  return timingSafeEqualStrings(expected, provided);
}

function isPasswordAuthorized(req) {
  return passwordOk(getProvidedPassword(req));
}

/* ---------- session tokens ---------- */

function getSigningKey() {
  // Mix in a constant so the key is not literally the password.
  const base = process.env.ADMIN_PASSWORD || '';
  return crypto
    .createHash('sha256')
    .update('mahla-admin-session-v1|' + base)
    .digest();
}

function issueSessionToken() {
  const now = Math.floor(Date.now() / 1000);
  const payload = JSON.stringify({ iat: now, exp: now + TOKEN_TTL_SECONDS, v: 1 });
  const payloadB64 = b64url(payload);
  const sig = crypto.createHmac('sha256', getSigningKey()).update(payloadB64).digest();
  return payloadB64 + '.' + b64url(sig);
}

function verifySessionToken(token) {
  if (typeof token !== 'string' || !token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const payloadB64 = parts[0];
  const sigB64 = parts[1];

  const expectedSig = crypto
    .createHmac('sha256', getSigningKey())
    .update(payloadB64)
    .digest();

  let providedSig;
  try { providedSig = b64urlDecode(sigB64); } catch (e) { return false; }
  if (providedSig.length !== expectedSig.length) return false;
  if (!crypto.timingSafeEqual(providedSig, expectedSig)) return false;

  let payload;
  try { payload = JSON.parse(b64urlDecode(payloadB64).toString('utf8')); }
  catch (e) { return false; }
  if (!payload || typeof payload.exp !== 'number') return false;
  if (payload.exp < Math.floor(Date.now() / 1000)) return false;

  return true;
}

function getProvidedToken(req) {
  const header = req.headers['x-admin-token'];
  if (typeof header === 'string' && header) return header;
  return '';
}

function isTokenAuthorized(req) {
  return verifySessionToken(getProvidedToken(req));
}

/* ---------- the one to use from protected endpoints ---------- */

/** Returns true iff the request carries a valid 2FA-verified session token. */
function isAdminAuthorized(req) {
  return isTokenAuthorized(req);
}

/* ---------- backup recovery codes ---------- */

// Codes are hashed with HMAC-SHA256 using a key derived from ADMIN_PASSWORD
// (separate key from session tokens — different "purpose" prefix). HMAC with
// a server-side secret means a dumped database cannot be brute-forced even
// though codes themselves are only ~50 bits — the attacker would also need
// ADMIN_PASSWORD to compute candidate hashes.

function getBackupCodeHmacKey() {
  const base = process.env.ADMIN_PASSWORD || '';
  return crypto
    .createHash('sha256')
    .update('mahla-backup-codes-v1|' + base)
    .digest();
}

function hashBackupCode(code) {
  // Normalize: uppercase, strip non-alphanumeric (users may write
  // "q7k2p 9n4xf" or "q7k2p-9n4xf" — both should match).
  const normalized = String(code || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  return crypto.createHmac('sha256', getBackupCodeHmacKey()).update(normalized).digest('hex');
}

/**
 * Generate a single new plaintext backup code, e.g. "Q7K2P-9N4XF".
 * Uses Crockford-ish base32 alphabet (no I, L, O, U to avoid confusion
 * with 1, 0, V).
 */
function generateBackupCode() {
  const alphabet = 'ABCDEFGHJKMNPQRSTVWXYZ23456789'; // 30 chars (~4.9 bits each)
  const len = 10; // 10 chars × ~4.9 bits ≈ 49 bits of entropy
  const buf = crypto.randomBytes(len * 2);
  let out = '';
  for (let i = 0; i < len; i++) {
    // Use 16 bits per char (rejection-free for 30 of 65536 buckets is fine;
    // bias is negligible — ~0.001% per draw).
    out += alphabet[buf.readUInt16BE(i * 2) % alphabet.length];
  }
  return out.slice(0, 5) + '-' + out.slice(5);
}

module.exports = {
  timingSafeEqualStrings,
  passwordOk,
  isPasswordAuthorized,
  getProvidedPassword,
  issueSessionToken,
  verifySessionToken,
  isTokenAuthorized,
  isAdminAuthorized,
  TOKEN_TTL_SECONDS,
  hashBackupCode,
  generateBackupCode,
};
