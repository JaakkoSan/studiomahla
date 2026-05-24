// api/contact.js — Vercel Serverless Function
//
// Receives the pre-treatment form (lomake.html) and emails a structured
// summary to the studio. Reuses the same Resend setup as booking confirmations.
//
// Required env vars (all already configured for the booking flow):
//   RESEND_API_KEY
//   EMAIL_FROM             — sender (e.g. 'Mahlamäen Kauneusstudio <asiakaspalvelu@studiomahla.fi>')
//   BOOKING_NOTIFY_EMAIL   — recipient (e.g. asiakaspalvelu@studiomahla.fi)
//
// Request:  POST /api/contact  { name, email, phone, age, skinIssue,
//                                kontra: { raskaus: 'kyllä'|'ei', ... },
//                                otherMeds, allergies,
//                                consent1, consent2, consent3, consent4,
//                                website (honeypot) }
// Response: 200 { ok: true }
//           4xx/5xx { error }
'use strict';

const KONTRA_LABELS = {
  raskaus:                 'Raskaus tai imetys',
  ihotulehdus:             'Aktiivinen ihotulehdus, ihottuma tai infektio hoitoalueella',
  akne:                    'Aktiivinen akne hoitoalueella',
  herpes:                  'Aktiivinen herpesinfektio',
  keloidi:                 'Keloidi- tai hypertrofinen arpi -taipumus',
  teras:                   'Teräsallergia',
  verenohennus:            'Verenohennuslääkitys',
  immunosuppressio:        'Immunosuppressiivinen lääkitys tai sairaus',
  syopahoito:              'Aktiivinen syöpähoito',
  diabetes:                'Huonosti hallinnassa oleva diabetes',
  isotretinoiini:          'Isotretinoiini viimeisen 6 kuukauden aikana',
  tupakointi:              'Tupakointi',
};

const CONSENT_LABELS = {
  consent1: 'Olen tietoinen hoidon vaikutuksista (punoitus, turvotus, lievä verenvuoto)',
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

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = (req.body && typeof req.body === 'object') ? req.body : {};

    // Honeypot — bots usually fill any field they find. Silent success.
    const honeypot = sanitize(body.website, 100);
    if (honeypot) {
      console.warn('Contact form honeypot triggered, ignoring submission.');
      return res.status(200).json({ ok: true });
    }

    // Required basic fields
    const name      = sanitize(body.name,      200);
    const email     = sanitize(body.email,     200);
    const phone     = sanitize(body.phone,     50);
    const age       = sanitize(body.age,       10);
    const skinIssue = sanitize(body.skinIssue, 4000);

    if (!name)               return res.status(400).json({ error: 'Nimi puuttuu' });
    if (!isValidEmail(email))return res.status(400).json({ error: 'Virheellinen sähköpostiosoite' });
    if (!phone || phone.replace(/\D/g, '').length < 6) {
      return res.status(400).json({ error: 'Puhelinnumero puuttuu' });
    }
    if (!age || !/^\d{1,3}$/.test(age)) {
      return res.status(400).json({ error: 'Virheellinen ikä' });
    }

    // Contraindications: all must be answered 'kyllä' or 'ei'
    const kontra = (body.kontra && typeof body.kontra === 'object') ? body.kontra : {};
    const kontraAnswers = {};
    for (const key of Object.keys(KONTRA_LABELS)) {
      const val = sanitize(kontra[key], 10).toLowerCase();
      if (val !== 'kyllä' && val !== 'ei' && val !== 'kylla') {
        return res.status(400).json({
          error: 'Vastaa kaikkiin kontraindikaatiokysymyksiin: ' + KONTRA_LABELS[key],
        });
      }
      kontraAnswers[key] = (val === 'ei') ? 'Ei' : 'Kyllä';
    }

    const otherMeds = sanitize(body.otherMeds, 4000);
    const allergies = sanitize(body.allergies, 4000);

    // All four consents must be true
    for (const key of Object.keys(CONSENT_LABELS)) {
      if (body[key] !== true && body[key] !== 'true') {
        return res.status(400).json({
          error: 'Hyväksy kaikki suostumuskohdat ennen lähettämistä.',
        });
      }
    }

    // Send email (best effort — booking-style)
    if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM || !process.env.BOOKING_NOTIFY_EMAIL) {
      console.error('Email env vars not configured');
      return res.status(500).json({ error: 'Sähköpostipalvelua ei ole konfiguroitu' });
    }

    let Resend;
    try {
      Resend = require('resend').Resend;
    } catch (e) {
      console.error('resend package not installed:', e);
      return res.status(500).json({ error: 'Sähköpostiriippuvuus puuttuu' });
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
      return res.status(500).json({ error: 'Lähetys epäonnistui. Yritäthän hetken päästä uudelleen.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('contact error:', err);
    return res.status(500).json({ error: err.message || 'Lomakkeen lähetys epäonnistui' });
  }
};

/* ============================================================
   EMAIL TEMPLATES
   ============================================================ */

function studioEmailHtml(ctx) {
  const kontraRows = Object.keys(KONTRA_LABELS).map(function (key) {
    const value = ctx.kontraAnswers[key];
    const color = value === 'Kyllä' ? '#b85a3a' : '#4a6157';
    return (
      '<tr>' +
        '<td style="padding:6px 12px 6px 0;font-size:14px;color:#4a5e55;vertical-align:top;">' +
          escapeHtml(KONTRA_LABELS[key]) +
        '</td>' +
        '<td style="padding:6px 0;font-size:14px;color:' + color + ';font-weight:500;vertical-align:top;white-space:nowrap;">' +
          escapeHtml(value) +
        '</td>' +
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

            sectionTitle('Perustiedot'),
            kvRow('Nimi',          escapeHtml(ctx.name)),
            kvRow('Sähköposti',    '<a href="mailto:' + escapeHtml(ctx.email) + '" style="color:#c8997a;">' + escapeHtml(ctx.email) + '</a>'),
            kvRow('Puhelin',       '<a href="tel:' + escapeHtml(ctx.phone.replace(/\s/g, '')) + '" style="color:#c8997a;">' + escapeHtml(ctx.phone) + '</a>'),
            kvRow('Ikä',           escapeHtml(ctx.age)),
            kvLong('Hoidettava iho-ongelma', nl2br(ctx.skinIssue) || '—'),

            sectionTitle('Kontraindikaatiot'),
            '<table style="width:100%;border-collapse:collapse;margin-bottom:24px;">' + kontraRows + '</table>',

            sectionTitle('Avoimet kysymykset'),
            kvLong('Muut lääkitykset / ihosairaudet', nl2br(ctx.otherMeds) || '—'),
            kvLong('Allergiat',                       nl2br(ctx.allergies) || '—'),

            sectionTitle('Suostumukset'),
            '<p style="font-size:14px;line-height:1.7;color:#4a5e55;margin:0 0 16px;">Asiakas on vahvistanut kaikki neljä suostumuskohtaa.</p>',

            '<hr style="border:0;border-top:1px solid rgba(74,94,85,0.12);margin:24px 0;">',
            '<p style="font-size:13px;line-height:1.7;color:#4a5e55;margin:0;">',
              'Voit vastata suoraan tähän viestiin — vastaus menee asiakkaalle (' + escapeHtml(ctx.email) + ').',
            '</p>',
          '</td></tr>',
        '</table>',
      '</td></tr>',
    '</table>',
    '</body></html>',
  ].join('');
}

function sectionTitle(title) {
  return '<h2 style="font-family:Georgia,\'Times New Roman\',serif;font-weight:400;font-size:18px;color:#2a3830;margin:24px 0 12px;border-bottom:1px solid rgba(74,94,85,0.12);padding-bottom:6px;">' +
    escapeHtml(title) + '</h2>';
}
function kvRow(label, valueHtml) {
  return '<table style="width:100%;border-collapse:collapse;margin-bottom:6px;"><tr>' +
    '<td style="padding:4px 12px 4px 0;width:160px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#4a5e55;vertical-align:top;">' + escapeHtml(label) + '</td>' +
    '<td style="padding:4px 0;font-size:15px;color:#2a3830;">' + valueHtml + '</td>' +
  '</tr></table>';
}
function kvLong(label, valueHtml) {
  return '<div style="margin-bottom:12px;">' +
    '<div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#4a5e55;margin-bottom:6px;">' + escapeHtml(label) + '</div>' +
    '<div style="font-size:14px;line-height:1.7;color:#2a3830;background:#f5f0e8;padding:12px 14px;border-radius:2px;">' + valueHtml + '</div>' +
  '</div>';
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
    '  Muut lääkitykset / ihosairaudet:',
    '  ' + (ctx.otherMeds || '—'),
    '',
    '  Allergiat:',
    '  ' + (ctx.allergies || '—'),
    '',
    'SUOSTUMUKSET',
    '  Asiakas on vahvistanut kaikki neljä suostumuskohtaa.',
    '',
    '— Voit vastata suoraan tähän viestiin — vastaus menee asiakkaalle (' + ctx.email + ').',
  ].join('\n');
}
