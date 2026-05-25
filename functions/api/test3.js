// functions/api/test3.js — testataan paikallista importia _auth.js:stä.

import { jsonResponse } from './_auth.js';

export function onRequestGet(context) {
  return jsonResponse({
    ok: true,
    message: 'Paikallinen import _auth.js:stä toimii.',
  });
}
