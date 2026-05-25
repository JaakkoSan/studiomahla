// functions/api/contact.js — Cloudflare Pages Functions version.

import { Resend } from 'resend';
import { jsonResponse } from './_auth.js';

const KONTRA_LABELS = {
  raskaus:          'Raskaus tai imetys',
  ihotulehdus:      'Aktiivinen ihotulehdus, ihottuma tai infektio hoitoalueella',
  akne:             'Aktiivinen akne hoitoalueella',
  herpes:           'Aktiivinen herpesinfektio',
  keloidi:          'Keloidi- tai hypertrofinen arpi -taipumus',
  teras:            'Teräsallergia',
  verenohennus:     'Verenohennuslääkitys',
  immunosuppressio: 'Immunosuppressiivinen lääkitys tai sairaus',
  syopahoito:       'Aktiivinen syöpähoito',
  diabetes:         'Huonosti hallinnassa oleva diabetes',
  isotretinoiini:   'Isotretinoiini viimeisen 6 kuukauden aikana',
  tupakointi:       'Tupakointi',
};

const CONSENT_LABELS = {
  consent1: 'Olen tietoinen hoidon vaikutuksista',
  consent2: 'Sitoudun noudattamaan jälkihoito-ohjeita',
  consent3: 'Vakuutan tietojen oikeellisuuden',
  consent4: 'Sitoudun ilmoittamaan terveydentilan muutoksista',
};

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
function nl2br(s) {
  return escapeHtml(s).replace(/\n/g, '<br>');
}

export async function onRequestPost(context) {
  const { request } = context;

  try {
    let body;
    try { body = await request.json(); } catch (e) { body = {}; }

    const honeypot = sanitize(body.website, 100);
    if (honeypot) {
      console.warn('Contact form honeypot triggered, ignoring submission.');
      return jsonResponse({ ok: true }, 200);
    }

    const name      = sanitize(body.name,      200);
    const email     = sanitize(body.email,     200);
    const phone     = sanitize(body.phone,     50);
    const age       = sanitize(body.age,       10);
    const skinIssue = sanitize(body.skinIssue, 4000);

    if (!name) return jsonResponse({ error: 'Nimi puuttuu' }, 400);
    if (!isValidEmail(email)) return jsonResponse({ error: 'Virheellinen sähköpostiosoite' }, 400);
    if (!phone || phone.replace(/\D/g, '').length < 6) {
      return jsonResponse({ error: 'Puhelinnumero puuttuu' }, 400);
    }
    if (!age || !/^\d{1,3}$/.test(age)) {
      return jsonResponse({ error: 'Virheellinen ikä' }, 400);
    }

    const kontra = (body.kontra && typeof body.kontra === 'object') ? body.kontra : {};
    const kontraAnswers = {};
    for (const key of Object.keys(KONTRA_LABELS)) {
      const val = sanitize(kontra[key], 10).toLowerCase();
      if (val !== 'kyllä' && val !== 'ei' && val !== 'kylla') {
        return jsonResponse({
          error: 'Vastaa kaikkiin kontraindikaatiokysymyksiin: ' + KONTRA_LABELS[key],
        }, 400);
      }
      kontraAnswers[key] = (val === 'ei') ? 'Ei' : 'Kyllä';
    }

    const otherMeds = sanitize(body.otherMeds, 4000);
    const allergies = sanitize(body.allergies, 4000);

    for (const key of Object.keys(CONSENT_LABELS)) {
      if (body[key] !== true && body[key] !== 'true') {
        return jsonResponse({
          error: 'Hyväksy kaikki suostumuskohdat ennen lähettämistä.',
        }, 400);
      }
    }

    if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM || !process.env.BOOKING_NOTIFY_EMAIL) {
      return jsonResponse({ error: 'Sähköpostipalvelua ei ole konfiguroitu' }, 500);
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const ctx = {
      name, email, phone, age, skinIssue,
      kontraAnswers, otherMeds, allergies,
      submittedAt: new Date().toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' }),
    };

    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: process.env.BOOKING_NOTIFY_EMAIL,
      subject: 'Esitietolomake: ' + name,
      html: studioEmailHtml(ctx),
      text: studioEmailText(ctx),
      replyTo: email,
    });

    if (result && result.error) {
      console.error('Contact email failed:', result.error);
      return jsonResponse({ error: 'Lähetys epäonnistui. Yritäthän hetken päästä uudelleen.' }, 500);
    }

    return jsonResponse({ ok: true }, 200);
  } catch (err) {
    console.error('contact error:', err);
    return jsonResponse({ error: err.message || 'Lomakkeen lähetys epäonnistui' }, 500);
  }
}

function studioEmailHtml(ctx) {
  const kontraRows = Object.keys(KONTRA_LABELS).map(function (key) {
    const value = ctx.kontraAnswers[key];
    const color = value === 'Kyllä' ? '#b85a3a' : '#4a6157';
    return (
      '<tr>' +
        '<td style="padding:6px 12px 6px 0;font-size:14px;color:#4a5e55;vertical-align:top;">' + escapeHtml(KONTRA_LABELS[key]) + '</td>' +
        '<td style="padding:6px 0;font-size:14px;color:' + color + ';font-weight:500;vertical-align:top;white-space:nowrap;">' + escapeHtml(value) + '</td>' +
      '</tr>'
    );
  }).join('');

  return [
    '<!DOCTYPE html><html lang="fi"><head><meta charset="utf-8"></head>',
    '<body style="margin:0;padding:0;background:#f5f0e8;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;color:#2a3830;">',
    '<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f5f0e8;padding:32px 16px;">',
      '<tr><td align="center">',
        '<table role="presentation" cellpadding="0" cellspacing="0" width="640" style="max-width:640px;background:#faf8f4;border-radius:4px;border-left:4px solid #c8997a;">',
          '<tr><td style="padding:32px;">',
            '<div style="font-family:Georgia,\'Times New Roman\',serif;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#c8997a;margin-bottom:8px;">Mahlamäen Kauneusstudio</div>',
            '<h1 style="font-family:Georgia,\'Times New Roman\',serif;font-weight:400;font-size:24px;color:#2a3830;margin:0 0 8px;">Uusi esitietolomake</h1>',
            '<p style="font-size:13px;color:#4a5e55;margin:0 0 24px;">Saapunut ' + escapeHtml(ctx.submittedAt) + '</p>',
            '<h2 style="font-family:Georgia,serif;font-weight:400;font-size:18px;color:#2a3830;margin:24px 0 12px;border-bottom:1px solid rgba(74,94,85,0.12);padding-bottom:6px;">Perustiedot</h2>',
            '<p><strong>Nimi:</strong> ' + escapeHtml(ctx.name) + '</p>',
            '<p><strong>Sähköposti:</strong> ' + escapeHtml(ctx.email) + '</p>',
            '<p><strong>Puhelin:</strong> ' + escapeHtml(ctx.phone) + '</p>',
            '<p><strong>Ikä:</strong> ' + escapeHtml(ctx.age) + '</p>',
            '<p><strong>Hoidettava iho-ongelma:</strong><br>' + nl2br(ctx.skinIssue || '—') + '</p>',
            '<h2 style="font-family:Georgia,serif;font-weight:400;font-size:18px;color:#2a3830;margin:24px 0 12px;border-bottom:1px solid rgba(74,94,85,0.12);padding-bottom:6px;">Kontraindikaatiot</h2>',
            '<table style="width:100%;border-collapse:collapse;margin-bottom:24px;">' + kontraRows + '</table>',
            '<h2 style="font-family:Georgia,serif;font-weight:400;font-size:18px;color:#2a3830;margin:24px 0 12px;border-bottom:1px solid rgba(74,94,85,0.12);padding-bottom:6px;">Avoimet kysymykset</h2>',
            '<p><strong>Muut lääkitykset / ihosairaudet:</strong><br>' + nl2br(ctx.otherMeds || '—') + '</p>',
            '<p><strong>Allergiat:</strong><br>' + nl2br(ctx.allergies || '—') + '</p>',
            '<hr style="border:0;border-top:1px solid rgba(74,94,85,0.12);margin:24px 0;">',
            '<p style="font-size:13px;color:#4a5e55;">Voit vastata suoraan tähän viestiin — vastaus menee asiakkaalle (' + escapeHtml(ctx.email) + ').</p>',
          '</td></tr>',
        '</table>',
      '</td></tr>',
    '</table>',
    '</body></html>',
  ].join('');
}

function studioEmailText(ctx) {
  const kontraText = Object.keys(KONTRA_LABELS)
    .map(function (k) { return '  ' + KONTRA_LABELS[k] + ': ' + ctx.kontraAnswers[k]; })
    .join('\n');
  return [
    'ESITIETOLOMAKE — Mahlamäen Kauneusstudio',
    'Saapunut: ' + ctx.submittedAt,
    '',
    'PERUSTIEDOT',
    '  Nimi:       ' + ctx.name,
    '  Sähköposti: ' + ctx.email,
    '  Puhelin:    ' + ctx.phone,
    '  Ikä:        ' + ctx.age,
    '',
    '  Hoidettava iho-ongelma:',
    '  ' + (ctx.skinIssue || '—'),
    '',
    'KONTRAINDIKAATIOT',
    kontraText,
    '',
    'AVOIMET KYSYMYKSET',
    '  Muut lääkitykset / ihosairaudet: ' + (ctx.otherMeds || '—'),
    '  Allergiat: ' + (ctx.allergies || '—'),
    '',
    'SUOSTUMUKSET',
    '  Asiakas on vahvistanut kaikki neljä suostumuskohtaa.',
  ].join('\n');
}
