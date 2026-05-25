// functions/api/test.js — minimaalinen testifunktio ilman importteja.
// Käytetään diagnosoimaan onko Cloudflare-routings kunnossa.
// Voi poistaa kun migraatio on valmis.

export function onRequestGet(context) {
  return new Response(JSON.stringify({
    ok: true,
    message: 'Cloudflare Pages Functions toimii.',
    timestamp: new Date().toISOString(),
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
