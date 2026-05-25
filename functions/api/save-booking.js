// functions/api/save-booking.js — Cloudflare Pages Functions version.

import Stripe from 'stripe';
import { Resend } from 'resend';
import { randomBytes } from 'node:crypto';
import { jsonResponse } from './_auth.js';

const PRICE_LABEL = '190 € (sis. alv 25,5 %)';
const PRICE_NOTE  = 'normaalihinta 200 €';

function sanitize(value, maxLength) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}
function isValidEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
function generateToken() {
  return randomBytes(24).toString('hex');
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

export async function onRequestPost(context) {
  const { request } = context;

  if (!process.env.STRIPE_SECRET_KEY) {
    return jsonResponse({ error: 'Maksupalvelua ei ole konfiguroitu' }, 500);
  }

  try {
    let body;
    try { body = await request.json(); } catch (e) { body = {}; }
    const setupIntentId = sanitize(body.setupIntentId, 100);
    const name     = sanitize(body.name,    200);
    const email    = sanitize(body.email,   200).toLowerCase();
    const phone    = sanitize(body.phone,   50);
    const honeypot = sanitize(body.website, 100);

    if (honeypot) {
      console.warn('Honeypot triggered, ignoring submission. Email was:', email);
      return jsonResponse({ ok: true }, 200);
    }

    if (!setupIntentId.startsWith('seti_')) {
      return jsonResponse({ error: 'Virheellinen varauksen tunniste' }, 400);
    }
    if (!name) return jsonResponse({ error: 'Nimi puuttuu' }, 400);
    if (!isValidEmail(email)) return jsonResponse({ error: 'Virheellinen sähköpostiosoite' }, 400);
    if (!phone || phone.replace(/\D/g, '').length < 6) {
      return jsonResponse({ error: 'Puhelinnumero puuttuu' }, 400);
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    try {
      const existing = await stripe.customers.list({ email: email, limit: 10 });
      const activeBooking = existing.data.find(function (c) {
        return c.metadata && c.metadata.booking_status === 'active';
      });
      if (activeBooking) {
        return jsonResponse({
          error: 'Tällä sähköpostilla on jo aktiivinen ennakkovaraus. ' +
                 'Tarkistathan sähköpostisi — peruutuslinkin avulla voit tarvittaessa perua aiemman varauksen.'
        }, 409);
      }
    } catch (e) {
      console.warn('Duplicate check failed (continuing):', e && e.message);
    }

    const setupIntent = await stripe.setupIntents.retrieve(setupIntentId);
    if (setupIntent.status !== 'succeeded') {
      return jsonResponse({
        error: 'Korttitietojen tallennus ei ole valmis (status: ' + setupIntent.status + ')',
      }, 400);
    }
    if (!setupIntent.payment_method) {
      return jsonResponse({ error: 'Maksutapaa ei löydy varauksesta' }, 400);
    }

    const cancellationToken = generateToken();

    const customer = await stripe.customers.create({
      name: name,
      email: email,
      phone: phone,
      metadata: {
        source: 'ennakkovaraus',
        product: 'Ennakkovaraus – ensikäynti',
        intended_amount_eur: '190',
        setup_intent_id: setupIntentId,
        cancellation_token: cancellationToken,
        booking_status: 'active',
      },
    });

    const paymentMethodId = typeof setupIntent.payment_method === 'string'
      ? setupIntent.payment_method
      : setupIntent.payment_method.id;

    await stripe.paymentMethods.attach(paymentMethodId, { customer: customer.id });
    await stripe.customers.update(customer.id, {
      invoice_settings: { default_payment_method: paymentMethodId },
    });

    await stripe.setupIntents.update(setupIntentId, {
      metadata: {
        source: 'ennakkovaraus',
        product: 'Ennakkovaraus – ensikäynti',
        intended_amount_eur: '190',
        customer_id: customer.id,
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
      },
    });

    const url = new URL(request.url);
    const baseUrl = url.origin;
    const cancellationUrl = baseUrl + '/peruuta.html?customer=' +
      encodeURIComponent(customer.id) + '&token=' + encodeURIComponent(cancellationToken);

    await sendEmails({
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      customerId: customer.id,
      cancellationUrl: cancellationUrl,
    });

    return jsonResponse({ ok: true, customerId: customer.id }, 200);
  } catch (err) {
    console.error('save-booking error:', err);
    return jsonResponse({ error: (err && err.message) || 'Varauksen tallennus epäonnistui' }, 500);
  }
}

async function sendEmails(ctx) {
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
    console.warn('Email env vars not configured — emails skipped');
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const customerResult = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: ctx.customerEmail,
      subject: 'Kiitos ennakkovarauksesta – Mahlamäen Kauneusstudio',
      html: customerEmailHtml(ctx),
      text: customerEmailText(ctx),
    });
    if (customerResult && customerResult.error) {
      console.error('Customer email failed:', customerResult.error);
    }
  } catch (e) {
    console.error('Customer email threw:', e);
  }

  if (process.env.BOOKING_NOTIFY_EMAIL) {
    try {
      const studioResult = await resend.emails.send({
        from: process.env.EMAIL_FROM,
        to: process.env.BOOKING_NOTIFY_EMAIL,
        subject: 'Uusi ennakkovaraus: ' + ctx.customerName,
        html: studioEmailHtml(ctx),
        text: studioEmailText(ctx),
        replyTo: ctx.customerEmail,
      });
      if (studioResult && studioResult.error) {
        console.error('Studio email failed:', studioResult.error);
      }
    } catch (e) {
      console.error('Studio email threw:', e);
    }
  }
}

function customerEmailHtml(ctx) {
  const safeName = escapeHtml(ctx.customerName);
  const safeUrl  = escapeHtml(ctx.cancellationUrl);
  return [
    '<!DOCTYPE html>',
    '<html lang="fi"><head><meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width,initial-scale=1">',
    '<title>Kiitos ennakkovarauksesta</title></head>',
    '<body style="margin:0;padding:0;background:#f5f0e8;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;color:#2a3830;">',
    '<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f5f0e8;padding:40px 16px;">',
      '<tr><td align="center">',
        '<table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;background:#faf8f4;border-radius:4px;border-left:4px solid #c8997a;">',
          '<tr><td style="padding:40px 40px 28px;">',
            '<div style="font-family:Georgia,\'Times New Roman\',serif;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#c8997a;margin-bottom:8px;">Mahlamäen Kauneusstudio</div>',
            '<h1 style="font-family:Georgia,\'Times New Roman\',serif;font-weight:400;font-size:28px;line-height:1.2;color:#2a3830;margin:0 0 24px;">Kiitos ennakkovarauksesta, ' + safeName + '!</h1>',
            '<p style="font-size:16px;line-height:1.7;color:#2a3830;margin:0 0 20px;">',
              'Ennakkovarauksesi <strong>Ensikäynti (' + PRICE_LABEL + ', ' + PRICE_NOTE + ')</strong> on vastaanotettu.',
            '</p>',
            '<p style="font-size:16px;line-height:1.7;color:#2a3830;margin:0 0 20px;">',
              'Olemme sinuun yhteydessä henkilökohtaisesti puhelinnumerosta <strong>050 367 1683</strong> ennen kuin avaamme kalenterin muille varauksille.',
            '</p>',
            '<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#ede7db;border-radius:2px;border-left:4px solid #c8997a;margin:24px 0;">',
              '<tr><td style="padding:18px 22px;">',
                '<div style="font-weight:600;font-size:15px;color:#2a3830;margin-bottom:4px;">Korttiasi ei veloiteta nyt</div>',
                '<div style="font-size:14px;line-height:1.6;color:#4a5e55;">Tallensimme korttitiedot turvallisesti Stripe-palveluun ja teemme veloituksen vasta kun hoitoaika on vahvistettu kanssasi.</div>',
              '</td></tr>',
            '</table>',
            '<h2 style="font-family:Georgia,\'Times New Roman\',serif;font-weight:400;font-size:20px;color:#2a3830;margin:32px 0 12px;">Haluatko peruuttaa varauksen?</h2>',
            '<p style="font-size:15px;line-height:1.7;color:#4a5e55;margin:0 0 20px;">Voit peruuttaa ennakkovarauksen koska tahansa ilmaiseksi. Klikkaa alla olevaa painiketta — vahvistat peruutuksen vielä erikseen seuraavalla sivulla.</p>',
            '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 24px;"><tr><td style="background:#c8997a;border-radius:2px;">',
              '<a href="' + safeUrl + '" style="display:inline-block;padding:14px 28px;font-size:13px;letter-spacing:0.18em;text-transform:uppercase;color:#2a3830;text-decoration:none;">Peruuta varaus</a>',
            '</td></tr></table>',
            '<p style="font-size:13px;line-height:1.6;color:#4a5e55;margin:0 0 8px;">Jos painike ei toimi, kopioi tämä osoite selaimeesi:</p>',
            '<p style="font-size:12px;line-height:1.5;color:#4a5e55;margin:0 0 32px;word-break:break-all;">' + safeUrl + '</p>',
            '<hr style="border:0;border-top:1px solid rgba(74,94,85,0.12);margin:32px 0 24px;">',
            '<p style="font-size:13px;line-height:1.7;color:#4a5e55;margin:0;">',
              'Mahlamäen Kauneusstudio · Mahlamäentie 14, 48300 Kotka<br>',
              '<a href="mailto:asiakaspalvelu@studiomahla.fi" style="color:#4a5e55;">asiakaspalvelu@studiomahla.fi</a> · ',
              '<a href="tel:+358503671683" style="color:#4a5e55;">050 367 1683</a>',
            '</p>',
          '</td></tr>',
        '</table>',
      '</td></tr>',
    '</table>',
    '</body></html>',
  ].join('');
}

function customerEmailText(ctx) {
  return [
    'Kiitos ennakkovarauksesta, ' + ctx.customerName + '!',
    '',
    'Ennakkovarauksesi Ensikäynti (' + PRICE_LABEL + ', ' + PRICE_NOTE + ') on vastaanotettu.',
    '',
    'Olemme sinuun yhteydessä henkilökohtaisesti puhelinnumerosta 050 367 1683',
    'ennen kuin avaamme kalenterin muille varauksille.',
    '',
    'KORTTIASI EI VELOITETA NYT',
    'Tallensimme korttitiedot turvallisesti Stripe-palveluun ja teemme veloituksen',
    'vasta kun hoitoaika on vahvistettu kanssasi.',
    '',
    'HALUATKO PERUUTTAA VARAUKSEN?',
    'Voit peruuttaa ennakkovarauksen koska tahansa ilmaiseksi seuraavasta linkistä',
    '(vahvistat peruutuksen vielä erikseen seuraavalla sivulla):',
    '',
    ctx.cancellationUrl,
    '',
    '— Mahlamäen Kauneusstudio · Mahlamäentie 14, 48300 Kotka',
    'asiakaspalvelu@studiomahla.fi · 050 367 1683',
  ].join('\n');
}

function studioEmailHtml(ctx) {
  const safe = {
    name:  escapeHtml(ctx.customerName),
    email: escapeHtml(ctx.customerEmail),
    phone: escapeHtml(ctx.customerPhone),
    cust:  escapeHtml(ctx.customerId),
    cancel: escapeHtml(ctx.cancellationUrl),
  };
  const stripeUrl = 'https://dashboard.stripe.com/customers/' + safe.cust;
  return [
    '<!DOCTYPE html><html lang="fi"><head><meta charset="utf-8"></head>',
    '<body style="margin:0;padding:0;background:#f5f0e8;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;color:#2a3830;">',
    '<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f5f0e8;padding:32px 16px;">',
      '<tr><td align="center">',
        '<table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;background:#faf8f4;border-radius:4px;">',
          '<tr><td style="padding:32px 32px 24px;">',
            '<h1 style="font-family:Georgia,\'Times New Roman\',serif;font-weight:400;font-size:22px;color:#2a3830;margin:0 0 16px;">Uusi ennakkovaraus</h1>',
            '<p><strong>Nimi:</strong> ' + safe.name + '</p>',
            '<p><strong>Sähköposti:</strong> <a href="mailto:' + safe.email + '">' + safe.email + '</a></p>',
            '<p><strong>Puhelin:</strong> ' + safe.phone + '</p>',
            '<p><strong>Stripe:</strong> <a href="' + stripeUrl + '">' + safe.cust + '</a></p>',
            '<p style="font-size:14px;line-height:1.7;color:#4a5e55;margin:16px 0 0;">Asiakkaalle on lähetetty vahvistus jossa on peruutuslinkki. Voit veloittaa kortin Stripen Dashboardista kun hoitoaika on sovittu.</p>',
            '<p style="font-size:12px;line-height:1.6;color:#4a5e55;margin:24px 0 0;word-break:break-all;">Asiakkaan peruutuslinkki: <a href="' + safe.cancel + '">' + safe.cancel + '</a></p>',
          '</td></tr>',
        '</table>',
      '</td></tr>',
    '</table>',
    '</body></html>',
  ].join('');
}

function studioEmailText(ctx) {
  return [
    'Uusi ennakkovaraus',
    '',
    'Nimi:       ' + ctx.customerName,
    'Sähköposti: ' + ctx.customerEmail,
    'Puhelin:    ' + ctx.customerPhone,
    'Stripe:     ' + ctx.customerId,
    '            https://dashboard.stripe.com/customers/' + ctx.customerId,
    '',
    'Asiakkaalle on lähetetty vahvistus jossa on peruutuslinkki.',
    'Veloita kortti Stripen Dashboardista kun hoitoaika on sovittu.',
    '',
    'Asiakkaan peruutuslinkki: ' + ctx.cancellationUrl,
  ].join('\n');
}
