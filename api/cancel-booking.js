// api/cancel-booking.js — Vercel Serverless Function
//
// Cancels a pre-booking made via api/save-booking.js. Called by peruuta.html
// after the customer confirms the cancellation.
//
// Request:   POST /api/cancel-booking  { customerId, token }
// Response:  200 { ok: true }
//            4xx/5xx { error }
//
// The token is the per-customer cancellation token generated when the booking
// was saved (stored in Customer.metadata.cancellation_token). It's verified
// against constant-time comparison to prevent timing attacks.
//
// On successful cancellation we:
//   1. Detach the default PaymentMethod from the Customer (no future charges)
//   2. Mark the Customer as cancelled (metadata.booking_status = 'cancelled')
//   3. Invalidate the cancellation token (so re-clicks are no-ops, not errors)
//   4. Send a cancellation-confirmation email to the customer
//
// Required env vars:
//   STRIPE_SECRET_KEY        — Stripe (required)
//   RESEND_API_KEY           — Resend (optional)
//   EMAIL_FROM               — sender
//   BOOKING_NOTIFY_EMAIL     — studio's notification address (optional)
'use strict';

const Stripe = require('stripe');
const crypto = require('crypto');

function sanitize(value, maxLength) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}
function timingSafeEqualStrings(a, b) {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('STRIPE_SECRET_KEY is not configured');
    return res.status(500).json({ error: 'Maksupalvelua ei ole konfiguroitu' });
  }

  try {
    const body = (req.body && typeof req.body === 'object') ? req.body : {};
    const customerId = sanitize(body.customerId, 100);
    const token      = sanitize(body.token,      200);

    if (!customerId.startsWith('cus_')) {
      return res.status(400).json({ error: 'Virheellinen varauksen tunniste' });
    }
    if (!token || token.length < 16) {
      return res.status(400).json({ error: 'Virheellinen peruutuskoodi' });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    let customer;
    try {
      customer = await stripe.customers.retrieve(customerId);
    } catch (err) {
      if (err && err.statusCode === 404) {
        return res.status(404).json({ error: 'Varausta ei löytynyt' });
      }
      throw err;
    }
    if (customer.deleted) {
      return res.status(404).json({ error: 'Varausta ei löytynyt' });
    }

    const meta = customer.metadata || {};

    // Idempotent: if already cancelled, treat as success.
    if (meta.booking_status === 'cancelled') {
      return res.status(200).json({ ok: true, alreadyCancelled: true });
    }

    const expectedToken = meta.cancellation_token;
    if (!expectedToken || !timingSafeEqualStrings(expectedToken, token)) {
      // Don't leak whether token-missing vs token-mismatch.
      return res.status(403).json({ error: 'Peruutuslinkki ei kelpaa' });
    }

    // 1. Detach the default PaymentMethod (and any others linked).
    if (customer.invoice_settings && customer.invoice_settings.default_payment_method) {
      const pmId = typeof customer.invoice_settings.default_payment_method === 'string'
        ? customer.invoice_settings.default_payment_method
        : customer.invoice_settings.default_payment_method.id;
      try {
        await stripe.paymentMethods.detach(pmId);
      } catch (e) {
        // Already detached or doesn't exist — non-fatal.
        console.warn('detach payment method failed (non-fatal):', e && e.message);
      }
    }

    // 2. Mark Customer as cancelled + invalidate the token in one update.
    const now = new Date().toISOString();
    await stripe.customers.update(customerId, {
      metadata: Object.assign({}, meta, {
        booking_status: 'cancelled',
        cancelled_at: now,
        cancellation_token: '', // invalidate
      }),
    });

    // 3. Best-effort email notifications.
    await sendCancellationEmails({
      customerName:  meta.name  || customer.name  || '',
      customerEmail: customer.email || '',
      customerPhone: customer.phone || '',
      customerId:    customerId,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('cancel-booking error:', err);
    const message = (err && err.message) ? err.message : 'Peruutus epäonnistui';
    return res.status(500).json({ error: message });
  }
};

/* ============================================================
   EMAIL SENDING (Resend)
   ============================================================ */

async function sendCancellationEmails(ctx) {
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) return;

  let Resend;
  try {
    Resend = require('resend').Resend;
  } catch (e) {
    console.error('resend package not installed:', e);
    return;
  }
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
            '<p style="font-size:15px;line-height:1.7;color:#2a3830;margin:0 0 8px;"><strong>Nimi:</strong> ' + escapeHtml(ctx.customerName || '—') + '</p>',
            '<p style="font-size:15px;line-height:1.7;color:#2a3830;margin:0 0 8px;"><strong>Sähköposti:</strong> ' + escapeHtml(ctx.customerEmail || '—') + '</p>',
            '<p style="font-size:15px;line-height:1.7;color:#2a3830;margin:0 0 8px;"><strong>Puhelin:</strong> ' + escapeHtml(ctx.customerPhone || '—') + '</p>',
            '<p style="font-size:15px;line-height:1.7;color:#2a3830;margin:16px 0 0;"><strong>Stripe:</strong> <a href="' + stripeUrl + '" style="color:#c8997a;">' + escapeHtml(ctx.customerId) + '</a></p>',
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
