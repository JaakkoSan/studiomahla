// functions/api/test5.js — identtinen verify-password.js:n kanssa, eri tiedostonimellä.

import { isPasswordAuthorized, jsonResponse } from './_auth.js';
import { checkRateLimit, getClientIp } from './_ratelimit.js';

const RATE_LIMIT_MAX    = 10;
const RATE_LIMIT_WINDOW = 5 * 60;

export async function onRequestPost(context) {
  const { request } = context;

  if (!process.env.ADMIN_PASSWORD) {
    console.error('ADMIN_PASSWORD not configured');
    return jsonResponse({ error: 'Adminia ei ole konfiguroitu' }, 500);
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

  if (!isPasswordAuthorized(request)) {
    return jsonResponse({ error: 'Väärä salasana' }, 401);
  }

  return jsonResponse({ ok: true, needsTotp: true }, 200);
}
