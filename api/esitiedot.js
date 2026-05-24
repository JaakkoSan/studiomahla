// api/esitiedot.js — Vercel Serverless Function
//
// Receives the pre-treatment form (lomake.html). Saves the sensitive data
// directly to a Supabase Postgres table (`esitiedot`) instead of emailing it,
// then sends ONLY a minimal "new submission" notification email to the studio
// — no sensitive data leaves the database via email.
//
// Required env vars:
//   SUPABASE_URL           — e.g. https://abc123.supabase.co
//   SUPABASE_ANON_KEY      — public anon key; INSERT-only via RLS policy
//   RESEND_API_KEY         — for the minimal notification email
//   EMAIL_FROM             — sender, e.g. 'Mahlamäen Kauneusstudio <asiakaspalvelu@studiomahla.fi>'
//   BOOKING_NOTIFY_EMAIL   — recipient, e.g. asiakaspalvelu@studiomahla.fi
//
// IMPORTANT — Supabase Row Level Security:
//   The `esitiedot` table MUST have RLS enabled, with an INSERT policy that
//   allows the `anon` role to insert. Crucially, there should be NO SELECT
//   policy for `anon` — only the service_role (used via Supabase Dashboard
//   or admin tooling) should be able to read submissions back.
//
// Request:  POST /api/esitiedot  { name, email, phone, age, skinIssue,
//                                  kontra: { ... }, otherMeds, allergies,
//                                  consent1..4, website (honeypot) }
// Response: 200 { ok: true }
//           4xx/5xx { error }
'use strict';

const KONTRA_KEYS = [
  'raskaus', 'ihotulehdus', 'akne', 'herpes', 'keloidi', 'teras',
  'verenohennus', 'immunosuppressio', 'syopahoito', 'diabetes',
  'isotretinoiini', 'tupakointi',
];

const CONSENT_KEYS = ['consent1', 'consent2', 'consent3', 'consent4'];

function sanitize(value, maxLength) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}
function isValidEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}
function getClientIp(req) {
  const xff = req.headers['x-forwarded-for'];
  if (typeof xff === 'string' && xff.length > 0) {
    return xff.split(',')[0].trim();
  }
  return (req.socket && req.socket.remoteAddress) || '';
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    console.error('Supabase env vars not configured');
    return res.status(500).json({ error: 'Tietokantapalvelua ei ole konfiguroitu' });
  }

  try {
    const body = (req.body && typeof req.body === 'object') ? req.body : {};

    // Honeypot — bots usually fill any visible field. Silent 200.
    const honeypot = sanitize(body.website, 100);
    if (honeypot) {
      console.warn('esitiedot honeypot triggered, ignoring submission.');
      return res.status(200).json({ ok: true });
    }

    // --- Required basic fields ---
    const nimi        = sanitize(body.name,      200);
    const sahkoposti  = sanitize(body.email,     200).toLowerCase();
    const puhelin     = sanitize(body.phone,     50);
    const ika         = sanitize(body.age,       10);
    const iho_ongelma = sanitize(body.skinIssue, 4000);

    if (!nimi) return res.status(400).json({ error: 'Nimi puuttuu' });
    if (!isValidEmail(sahkoposti)) {
      return res.status(400).json({ error: 'Virheellinen sähköpostiosoite' });
    }
    if (!puhelin || puhelin.replace(/\D/g, '').length < 6) {
      return res.status(400).json({ error: 'Puhelinnumero puuttuu' });
    }
    if (!ika || !/^\d{1,3}$/.test(ika)) {
      return res.status(400).json({ error: 'Virheellinen ikä' });
    }

    // --- Contraindications: every key must be 'kyllä' or 'ei' ---
    const kontraInput = (body.kontra && typeof body.kontra === 'object') ? body.kontra : {};
    const kontraindikaatiot = {};
    for (let i = 0; i < KONTRA_KEYS.length; i++) {
      const key = KONTRA_KEYS[i];
      const val = sanitize(kontraInput[key], 10).toLowerCase();
      if (val !== 'kyllä' && val !== 'kylla' && val !== 'ei') {
        return res.status(400).json({
          error: 'Vastaa kaikkiin kontraindikaatiokysymyksiin (' + key + ' puuttuu)',
        });
      }
      kontraindikaatiot[key] = (val === 'ei') ? 'ei' : 'kyllä';
    }

    const muut_laakitykset = sanitize(body.otherMeds, 4000);
    const allergiat        = sanitize(body.allergies, 4000);

    // --- Consents: all four required ---
    const suostumus = {};
    for (let i = 0; i < CONSENT_KEYS.length; i++) {
      const key = CONSENT_KEYS[i];
      if (body[key] !== true && body[key] !== 'true') {
        return res.status(400).json({
          error: 'Hyväksy kaikki suostumuskohdat ennen lähettämistä.',
        });
      }
      suostumus[key] = true;
    }

    const ip_osoite = getClientIp(req).slice(0, 100);

    // --- Save to Supabase ---
    let createClient;
    try {
      createClient = require('@supabase/supabase-js').createClient;
    } catch (e) {
      console.error('@supabase/supabase-js not installed:', e);
      return res.status(500).json({ error: 'Tietokantariippuvuus puuttuu' });
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY,
      { auth: { persistSession: false } }
    );

    const { data: inserted, error: insertError } = await supabase
      .from('esitiedot')
      .insert([{
        nimi: nimi,
        sahkoposti: sahkoposti,
        puhelin: puhelin,
        ika: ika,
        iho_ongelma: iho_ongelma,
        kontraindikaatiot: kontraindikaatiot,
        muut_laakitykset: muut_laakitykset,
        allergiat: allergiat,
        suostumus: suostumus,
        ip_osoite: ip_osoite,
      }])
      .select('id')
      .single();

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      return res.status(500).json({
        error: 'Tallennus epäonnistui. Yritäthän hetken päästä uudelleen.',
      });
    }

    // --- Send minimal notification email (no sensitive data) ---
    // Email failure is non-fatal: the data is safely saved already.
    await sendNotification({ nimi: nimi, recordId: inserted && inserted.id });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('esitiedot error:', err);
    return res.status(500).json({
      error: (err && err.message) || 'Tallennus epäonnistui',
    });
  }
};

async function sendNotification(ctx) {
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM || !process.env.BOOKING_NOTIFY_EMAIL) {
    console.warn('Notification email env vars not configured — skipped');
    return;
  }
  let Resend;
  try {
    Resend = require('resend').Resend;
  } catch (e) {
    console.error('resend not installed:', e);
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const safeName = escapeHtml(ctx.nimi);
  const safeId = escapeHtml(ctx.recordId || '');

  try {
    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: process.env.BOOKING_NOTIFY_EMAIL,
      subject: 'Uusi esitietolomake: ' + ctx.nimi,
      text: [
        'Uusi esitietolomake vastaanotettu asiakkaalta ' + ctx.nimi + '.',
        '',
        'Kirjaudu admin-näkymään tarkastellaksesi tietoja.',
        '',
        ctx.recordId ? 'Tietuetunnus (Supabase): ' + ctx.recordId : '',
      ].filter(Boolean).join('\n'),
      html: [
        '<!DOCTYPE html><html lang="fi"><head><meta charset="utf-8"></head>',
        '<body style="margin:0;padding:0;background:#f5f0e8;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;color:#2a3830;">',
        '<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f5f0e8;padding:32px 16px;">',
          '<tr><td align="center">',
            '<table role="presentation" cellpadding="0" cellspacing="0" width="560" style="max-width:560px;background:#faf8f4;border-radius:4px;border-left:4px solid #c8997a;">',
              '<tr><td style="padding:32px;">',
                '<div style="font-family:Georgia,\'Times New Roman\',serif;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#c8997a;margin-bottom:8px;">Mahlamäen Kauneusstudio</div>',
                '<h1 style="font-family:Georgia,\'Times New Roman\',serif;font-weight:400;font-size:22px;color:#2a3830;margin:0 0 16px;">Uusi esitietolomake</h1>',
                '<p style="font-size:15px;line-height:1.7;color:#2a3830;margin:0 0 12px;">',
                  'Uusi esitietolomake vastaanotettu asiakkaalta <strong>' + safeName + '</strong>.',
                '</p>',
                '<p style="font-size:15px;line-height:1.7;color:#2a3830;margin:0 0 16px;">',
                  'Kirjaudu admin-näkymään tarkastellaksesi tietoja.',
                '</p>',
                (safeId ? '<p style="font-size:12px;line-height:1.6;color:#4a5e55;margin:16px 0 0;font-family:monospace;">Tietuetunnus: ' + safeId + '</p>' : ''),
              '</td></tr>',
            '</table>',
          '</td></tr>',
        '</table>',
        '</body></html>',
      ].join(''),
    });
    if (result && result.error) {
      console.error('Notification email failed:', result.error);
    }
  } catch (e) {
    console.error('Notification email threw:', e);
  }
}
