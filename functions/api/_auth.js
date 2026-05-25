// functions/api/_auth.js — Cloudflare Pages Functions version of /api/_auth.js
//
// Uses named imports from node:crypto instead of default import, which
// is more reliable across bundlers and ESM contexts.

import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { Buffer } from 'node:buffer';

const TOKEN_TTL_SECONDS = 12 * 60 * 60;

/* ---------- generic helpers ---------- */

function timingSafeEqualStrings(a, b) {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
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

function getProvidedPassword(request) {
  const header = request.headers.get('x-admin-password');
  if (typeof header === 'string' && header) return header;
  const auth = request.headers.get('authorization');
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

function isPasswordAuthorized(request) {
  return passwordOk(getProvidedPassword(request));
}

/* ---------- session tokens ---------- */

function getSigningKey() {
  const base = process.env.ADMIN_PASSWORD || '';
  return createHash('sha256').update('mahla-admin-session-v1|' + base).digest();
}

function issueSessionToken() {
  const now = Math.floor(Date.now() / 1000);
  const payload = JSON.stringify({ iat: now, exp: now + TOKEN_TTL_SECONDS, v: 1 });
  const payloadB64 = b64url(payload);
  const sig = createHmac('sha256', getSigningKey()).update(payloadB64).digest();
  return payloadB64 + '.' + b64url(sig);
}

function verifySessionToken(token) {
  if (typeof token !== 'string' || !token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const payloadB64 = parts[0];
  const sigB64 = parts[1];

  const expectedSig = createHmac('sha256', getSigningKey()).update(payloadB64).digest();

  let providedSig;
  try { providedSig = b64urlDecode(sigB64); } catch (e) { return false; }
  if (providedSig.length !== expectedSig.length) return false;
  if (!timingSafeEqual(providedSig, expectedSig)) return false;

  let payload;
  try { payload = JSON.parse(b64urlDecode(payloadB64).toString('utf8')); }
  catch (e) { return false; }
  if (!payload || typeof payload.exp !== 'number') return false;
  if (payload.exp < Math.floor(Date.now() / 1000)) return false;

  return true;
}

function getProvidedToken(request) {
  const header = request.headers.get('x-admin-token');
  if (typeof header === 'string' && header) return header;
  return '';
}

function isTokenAuthorized(request) {
  return verifySessionToken(getProvidedToken(request));
}

function isAdminAuthorized(request) {
  return isTokenAuthorized(request);
}

/* ---------- backup recovery codes ---------- */

function getBackupCodeHmacKey() {
  const base = process.env.ADMIN_PASSWORD || '';
  return createHash('sha256').update('mahla-backup-codes-v1|' + base).digest();
}

function hashBackupCode(code) {
  const normalized = String(code || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  return createHmac('sha256', getBackupCodeHmacKey()).update(normalized).digest('hex');
}

function generateBackupCode() {
  const alphabet = 'ABCDEFGHJKMNPQRSTVWXYZ23456789';
  const len = 10;
  const buf = randomBytes(len * 2);
  let out = '';
  for (let i = 0; i < len; i++) {
    out += alphabet[buf.readUInt16BE(i * 2) % alphabet.length];
  }
  return out.slice(0, 5) + '-' + out.slice(5);
}

/* ---------- JSON response helper ---------- */

function jsonResponse(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status: status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...extraHeaders },
  });
}

export {
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
  jsonResponse,
};
