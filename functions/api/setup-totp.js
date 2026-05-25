// functions/api/setup-totp.js — kertaluonteinen TOTP-secretin generointi.
// Poista käytön jälkeen.

import { authenticator } from 'otplib';
import { isPasswordAuthorized, jsonResponse } from './_auth.js';

const ISSUER = 'Mahlamäen Kauneusstudio';
const ACCOUNT = 'admin';

export async function onRequestPost(context) {
  const { request } = context;

  if (!process.env.ADMIN_PASSWORD) {
    return jsonResponse({ error: 'Adminia ei ole konfiguroitu' }, 500);
  }
  if (!isPasswordAuthorized(request)) {
    return jsonResponse({ error: 'Väärä salasana' }, 401);
  }

  const secret = authenticator.generateSecret();
  const otpauthUrl = authenticator.keyuri(ACCOUNT, ISSUER, secret);

  return jsonResponse({
    ok: true,
    secret: secret,
    otpauthUrl: otpauthUrl,
    issuer: ISSUER,
    account: ACCOUNT,
    alreadyConfigured: !!process.env.TOTP_SECRET,
  }, 200);
}
