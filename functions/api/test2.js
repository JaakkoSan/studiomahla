// functions/api/test2.js — testataan node:crypto-importin toimivuus.
// Käytetään diagnosoimaan miksi muut funktiot eivät bundlaudu.

import { createHash } from 'node:crypto';

export function onRequestGet(context) {
  const hash = createHash('sha256').update('hello world').digest('hex');
  return new Response(JSON.stringify({
    ok: true,
    message: 'node:crypto toimii.',
    hash: hash,
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
