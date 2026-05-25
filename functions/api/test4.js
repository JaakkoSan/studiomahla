// functions/api/test4.js — onRequestPost + paikallinen import.

import { jsonResponse } from './_auth.js';

export async function onRequestPost(context) {
  return jsonResponse({
    ok: true,
    message: 'POST + paikallinen import toimii.',
  });
}
