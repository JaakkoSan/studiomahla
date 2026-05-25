// functions/api/esitiedot.js — Cloudflare Pages Functions version.
// Public endpoint: receives pre-treatment form (lomake.html), saves to
// Supabase, sends minimal email notification to studio (no sensitive data).

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { jsonResponse } from './_auth.js';

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
function getClientIp(request) {
  const cf = request.headers.get('cf-connecting-ip');
  if (typeof cf === 'string' && cf.length > 0) return cf;
  const xff = request.headers.get('x-forwarded-for');
  if (typeof xff === 'string' && xff.length > 0) return xff.split(',')[0].trim();
  return '';
}

export async function onRequestPost(context) {
  const { request } = context;

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return jsonResponse({ error: 'Tietokantapalvelua ei ole konfiguroitu' }, 500);
  }

  try {
    let body;
    try { body = await request.json(); } catch (e) { body = {}; }

    const honeypot = sanitize(body.website, 100);
    if (honeypot) {
      console.warn('esitiedot honeypot triggered, ignoring submission.');
      return jsonResponse({ ok: true }, 200);
    }

    const nimi        = sanitize(body.name,      200);
    const sahkoposti  = sanitize(body.email,     200).toLowerCase();
    const puhelin     = sanitize(body.phone,     50);
    const ika         = sanitize(body.age,       10);
    const iho_ongelma = sanitize(body.skinIssue, 4000);

    if (!nimi) return jsonResponse({ error: 'Nimi puuttuu' }, 400);
    if (!isValidEmail(sahkoposti)) return jsonResponse({ error: 'Virheellinen sähköpostiosoite' }, 400);
    if (!puhelin || puhelin.replace(/\D/g, '').length < 6) {
      return jsonResponse({ error: 'Puhelinnumero puuttuu' }, 400);
    }
    if (!ika || !/^\d{1,3}$/.test(ika)) {
      return jsonResponse({ error: 'Virheellinen ikä' }, 400);
    }

    const kontraInput = (body.kontra && typeof body.kontra === 'object') ? body.kontra : {};
    const kontraindikaatiot = {};
    for (let i = 0; i < KONTRA_KEYS.length; i++) {
      const key = KONTRA_KEYS[i];
      const val = sanitize(kontraInput[key], 10).toLowerCase();
      if (val !== 'kyllä' && val !== 'kylla' && val !== 'ei') {
        return jsonResponse({
          error: 'Vastaa kaikkiin kontraindikaatiokysymyksiin (' + key + ' puuttuu)',
        }, 400);
      }
      kontraindikaatiot[key] = (val === 'ei') ? 'ei' : 'kyllä';
    }

    const muut_laakitykset = sanitize(body.otherMeds, 4000);
    const allergiat        = sanitize(body.allergies, 4000);

    const suostumus = {};
    for (let i = 0; i < CONSENT_KEYS.length; i++) {
      const key = CONSENT_KEYS[i];
      if (body[key] !== true && body[key] !== 'true') {
        return jsonResponse({
          error: 'Hyväksy kaikki suostumuskohdat ennen lähettämistä.',
        }, 400);
      }
      suostumus[key] = true;
    }

    const ip_osoite = getClientIp(request).slice(0, 100);

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
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
      return jsonResponse({
        error: 'Tallennus epäonnistui. Yritäthän hetken päästä uudelleen.',
      }, 500);
    }

    await sendNotification({ nimi: nimi, recordId: inserted && inserted.id });

    return jsonResponse({ ok: true }, 200);
  } catch (err) {
    console.error('esitiedot error:', err);
    return jsonResponse({ error: (err && err.message) || 'Tallennus epäonnistui' }, 500);
  }
}

async function sendNotification(ctx) {
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM || !process.env.BOOKING_NOTIFY_EMAIL) {
    console.warn('Notification email env vars not configured — skipped');
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
