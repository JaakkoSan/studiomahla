// functions/api/keep-alive.js — Cloudflare Pages Functions
// Julkinen endpoint joka tekee minimaalisen Supabase-kyselyn pitääkseen
// free-tier-projektin aktiivisena. Tarkoitettu kutsuttavaksi ulkoisesta
// cron-palvelusta (esim. UptimeRobot, cron-job.org) säännöllisesti
// (esim. 5 min - 24 h välein).
//
// Tarkoitus:
//   - Supabase pausettaa Free-tier-projektit jos niissä ei ole ollut
//     riittävää aktiivisuutta 7 päivän ajan.
//   - Tämä endpoint tekee yhden count-kyselyn esitiedot-tauluun (HEAD-tason
//     metakysely, ei dataa) joka rekisteröityy aktiivisuudeksi.
//
// Turvallisuus:
//   - Ei autentikointia (cron-palvelu kutsuu)
//   - Ei dataa vuoda ulospäin (vain status + aikaleima)
//   - Käyttää service_role-avainta vain count-kyselyyn
//   - Rate-limiting hoituu Cloudflare DDoS-suojauksella

import { createClient } from '@supabase/supabase-js';

export async function onRequest(context) {
  // Vastaa kaikkiin HTTP-metodeihin (GET, HEAD, POST) — UptimeRobot
  // ja eri cron-palvelut käyttävät eri metodeja.

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return new Response(
      JSON.stringify({ status: 'misconfigured', timestamp: new Date().toISOString() }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { persistSession: false } }
    );

    // HEAD count -kysely: palauttaa vain rivimäärän, ei rivejä.
    // Kevyin mahdollinen kysely joka silti rekisteröityy aktiivisuudeksi.
    const { error } = await supabase
      .from('esitiedot')
      .select('*', { count: 'exact', head: true });

    if (error) {
      return new Response(
        JSON.stringify({
          status: 'db_error',
          timestamp: new Date().toISOString(),
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        status: 'ok',
        timestamp: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          // Estä välimuistitus — jokaisen kutsun on osuttava Supabaseen
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({
        status: 'exception',
        timestamp: new Date().toISOString(),
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
