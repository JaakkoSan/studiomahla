// functions/api/cancel-booking.js — Cloudflare Pages Functions version.

import Stripe from 'stripe';
import { Resend } from 'resend';
import { timingSafeEqualStrings, jsonResponse } from './_auth.js';

function sanitize(value, maxLength) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
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
    const customerId = sanitize(body.customerId, 100);
    const token      = sanitize(body.token,      200);

    if (!customerId.startsWith('cus_')) {
      return jsonResponse({ error: 'Virheellinen varauksen tunniste' }, 400);
    }
    if (!token || token.length < 16) {
      return jsonResponse({ error: 'Virheellinen peruutuskoodi' }, 400);
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    let customer;
    try {
      customer = await stripe.customers.retrieve(customerId);
    } catch (err) {
      if (err && err.statusCode === 404) {
        return jsonResponse({ error: 'Varausta ei löytynyt' }, 404);
      }
      throw err;
    }
    if (customer.deleted) {
      return jsonResponse({ error: 'Varausta ei löytynyt' }, 404);
    }

    const meta = customer.metadata || {};

    if (meta.booking_status === 'cancelled') {
      return jsonResponse({ ok: true, alreadyCancelled: true }, 200);
    }

    const expectedToken = meta.cancellation_token;
    if (!expectedToken || !timingSafeEqualStrings(expectedToken, token)) {
      return jsonResponse({ error: 'Peruutuslinkki ei kelpaa' }, 403);
    }

    if (customer.invoice_settings && customer.invoice_settings.default_payment_method) {
      const pmId = typeof customer.invoice_settings.default_payment_method === 'string'
        ? customer.invoice_settings.default_payment_method
        : customer.invoice_settings.default_payment_method.id;
      try {
        await stripe.paymentMethods.detach(pmId);
      } catch (e) {
        console.warn('detach payment method failed (non-fatal):', e && e.message);
      }
    }

    const now = new Date().toISOString();
    await stripe.customers.update(customerId, {
      metadata: Object.assign({}, meta, {
        booking_status: 'cancelled',
        cancelled_at: now,
        cancellation_token: '',
      }),
    });

    await sendCancellationEmails({
      customerName:  meta.name  || customer.name  || '',
      customerEmail: customer.email || '',
      customerPhone: customer.phone || '',
      customerId:    customerId,
    });

    return jsonResponse({ ok: true }, 200);
  } catch (err) {
    console.error('cancel-booking error:', err);
    return jsonResponse({ error: (err && err.message) || 'Peruutus epäonnistui' }, 500);
  }
}

async function sendCancellationEmails(ctx) {
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) return;

  const resend = new Resend(process.env.RESEND_API_KEY);

  if (ctx.customerEmail) {
    try {
      const r = await resend.emails.send({
        from: process.env.EMAIL_FROM,
        to: ctx.customerEmail,
        subject: 'Ennakkovarauksesi on peruttu – Mahlamäen Kauneusstudio',
        html: customerCancelHtml(ctx),
        text: customerCancelText(ctx),
      });
      if (r && r.error) console.error('Customer cancel email failed:', r.error);
    } catch (e) {
      console.error('Customer cancel email threw:', e);
    }
  }

  if (process.env.BOOKING_NOTIFY_EMAIL) {
    try {
      const r = await resend.emails.send({
        from: process.env.EMAIL_FROM,
        to: process.env.BOOKING_NOTIFY_EMAIL,
        subject: 'Ennakkovaraus peruttu: ' + (ctx.customerName || ctx.customerEmail || ctx.customerId),
        html: studioCancelHtml(ctx),
        text: studioCancelText(ctx),
        replyTo: ctx.customerEmail || undefined,
      });
      if (r && r.error) console.error('Studio cancel email failed:', r.error);
    } catch (e) {
      console.error('Studio cancel email threw:', e);
    }
  }
}

function customerCancelHtml(ctx) {
  const safeName = escapeHtml(ctx.customerName || 'Hei');
  return [
    '<!DOCTYPE html><html lang="fi"><head><meta charset="utf-8"></head>',
    '<body style="margin:0;padding:0;background:#f5f0e8;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;color:#2a3830;">',
    '<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f5f0e8;padding:40px 16px;">',
      '<tr><td align="center">',
        '<table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;background:#faf8f4;border-radius:4px;border-left:4px solid #c8997a;">',
          '<tr><td style="padding:40px 40px 32px;">',
            '<div style="font-family:Georgia,\'Times New Roman\',serif;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#c8997a;margin-bottom:8px;">Mahlamäen Kauneusstudio</div>',
            '<h1 style="font-family:Georgia,\'Times New Roman\',serif;font-weight:400;font-size:26px;line-height:1.2;color:#2a3830;margin:0 0 20px;">Ennakkovarauksesi on peruttu</h1>',
            '<p style="font-size:16px;line-height:1.7;color:#2a3830;margin:0 0 16px;">Hei ' + safeName + ',</p>',
            '<p style="font-size:16px;line-height:1.7;color:#2a3830;margin:0 0 16px;">Ennakkovarauksesi on peruttu pyyntösi mukaisesti. Korttiasi ei veloiteta eikä korttitiedoillesi tehdä mitään tulevia veloituksia.</p>',
            '<p style="font-size:16px;line-height:1.7;color:#2a3830;margin:0 0 24px;">Toivottavasti tapaamme vielä toiste!</p>',
            '<hr style="border:0;border-top:1px solid rgba(74,94,85,0.12);margin:24px 0;">',
            '<p style="font-size:13px;line-height:1.7;color:#4a5e55;margin:0;">Mahlamäen Kauneusstudio · Mahlamäentie 14, 48300 Kotka<br>',
              '<a href="mailto:asiakaspalvelu@studiomahla.fi" style="color:#4a5e55;">asiakaspalvelu@studiomahla.fi</a> · ',
              '<a href="tel:+358503671683" style="color:#4a5e55;">050 367 1683</a></p>',
          '</td></tr>',
        '</table>',
      '</td></tr>',
    '</table>',
    '</body></html>',
  ].join('');
}

function customerCancelText(ctx) {
  return [
    'Ennakkovarauksesi on peruttu',
    '',
    'Hei ' + (ctx.customerName || '') + ',',
    '',
    'Ennakkovarauksesi on peruttu pyyntösi mukaisesti.',
    'Korttiasi ei veloiteta eikä korttitiedoillesi tehdä mitään tulevia veloituksia.',
    '',
    'Toivottavasti tapaamme vielä toiste!',
    '',
    '— Mahlamäen Kauneusstudio · Mahlamäentie 14, 48300 Kotka',
    'asiakaspalvelu@studiomahla.fi · 050 367 1683',
  ].join('\n');
}

function studioCancelHtml(ctx) {
  const stripeUrl = 'https://dashboard.stripe.com/customers/' + encodeURIComponent(ctx.customerId);
  return [
    '<!DOCTYPE html><html lang="fi"><head><meta charset="utf-8"></head>',
    '<body style="margin:0;padding:0;background:#f5f0e8;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;color:#2a3830;">',
    '<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f5f0e8;padding:32px 16px;">',
      '<tr><td align="center">',
        '<table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;background:#faf8f4;border-radius:4px;">',
          '<tr><td style="padding:32px;">',
            '<h1 style="font-family:Georgia,\'Times New Roman\',serif;font-weight:400;font-size:22px;color:#2a3830;margin:0 0 16px;">Ennakkovaraus peruttu</h1>',
            '<p><strong>Nimi:</strong> ' + escapeHtml(ctx.customerName || '—') + '</p>',
            '<p><strong>Sähköposti:</strong> ' + escapeHtml(ctx.customerEmail || '—') + '</p>',
            '<p><strong>Puhelin:</strong> ' + escapeHtml(ctx.customerPhone || '—') + '</p>',
            '<p><strong>Stripe:</strong> <a href="' + stripeUrl + '">' + escapeHtml(ctx.customerId) + '</a></p>',
            '<p style="font-size:14px;line-height:1.7;color:#4a5e55;margin:20px 0 0;">Korttitiedot on irrotettu eikä asiakkaalle tehdä veloituksia. Customer-objekti säilyy Stripessä historiana.</p>',
          '</td></tr>',
        '</table>',
      '</td></tr>',
    '</table>',
    '</body></html>',
  ].join('');
}

function studioCancelText(ctx) {
  return [
    'Ennakkovaraus peruttu',
    '',
    'Nimi:       ' + (ctx.customerName  || '—'),
    'Sähköposti: ' + (ctx.customerEmail || '—'),
    'Puhelin:    ' + (ctx.customerPhone || '—'),
    'Stripe:     ' + ctx.customerId,
    '            https://dashboard.stripe.com/customers/' + ctx.customerId,
    '',
    'Korttitiedot on irrotettu eikä asiakkaalle tehdä veloituksia.',
    'Customer-objekti säilyy Stripessä historiana.',
  ].join('\n');
}
