// api/save-booking.js — Vercel Serverless Function
//
// Called from kauppa.html after stripe.confirmSetup has succeeded on the client.
// This endpoint:
//   1. Verifies the SetupIntent succeeded
//   2. Creates a Stripe Customer with name/email/phone
//   3. Attaches the saved PaymentMethod and makes it default
//   4. Generates a random cancellation token and stores it on the Customer
//   5. Sends two emails via Resend:
//        - confirmation to the customer (includes one-click cancellation link)
//        - notification to the studio (BOOKING_NOTIFY_EMAIL)
//   6. Updates SetupIntent metadata so the booking is visible in Stripe Dashboard
//
// Required env vars:
//   STRIPE_SECRET_KEY        — Stripe (required)
//   RESEND_API_KEY           — Resend (optional; emails are skipped if missing)
//   EMAIL_FROM               — sender, e.g. 'Mahlamäen Kauneusstudio <ennakkovaraus@studiomahla.fi>'
//   BOOKING_NOTIFY_EMAIL     — recipient for the studio's own notification email
//
// Booking remains successful even if email sending fails (logged as console.error
// so the studio owner can investigate and contact the customer manually).
'use strict';

const Stripe = require('stripe');
const crypto = require('crypto');

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
  // 24 bytes → 48 hex chars. URL-safe and effectively unguessable.
  return crypto.randomBytes(24).toString('hex');
}
function baseUrlFromReq(req) {
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host  = req.headers['x-forwarded-host']  || req.headers.host;
  return proto + '://' + host;
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
    const setupIntentId = sanitize(body.setupIntentId, 100);
    const name     = sanitize(body.name,    200);
    const email    = sanitize(body.email,   200).toLowerCase();
    const phone    = sanitize(body.phone,   50);
    const honeypot = sanitize(body.website, 100);

    // Honeypot: real users never see the hidden 'website' field, so any value
    // signals a bot. We return 200 silently so the bot doesn't learn it was
    // detected and try again with a different approach.
    if (honeypot) {
      console.warn('Honeypot triggered, ignoring submission. Email was:', email);
      return res.status(200).json({ ok: true });
    }

    if (!setupIntentId.startsWith('seti_')) {
      return res.status(400).json({ error: 'Virheellinen varauksen tunniste' });
    }
    if (!name) {
      return res.status(400).json({ error: 'Nimi puuttuu' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Virheellinen sähköpostiosoite' });
    }
    if (!phone || phone.replace(/\D/g, '').length < 6) {
      return res.status(400).json({ error: 'Puhelinnumero puuttuu' });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Email-based duplicate check — Stripe doesn't enforce uniqueness on
    // customer email, so we check ourselves to prevent accidental double
    // submissions and basic spam from the same address.
    try {
      const existing = await stripe.customers.list({ email: email, limit: 10 });
      const activeBooking = existing.data.find(function (c) {
        return c.metadata && c.metadata.booking_status === 'active';
      });
      if (activeBooking) {
        return res.status(409).json({
          error: 'Tällä sähköpostilla on jo aktiivinen ennakkovaraus. ' +
                 'Tarkistathan sähköpostisi — peruutuslinkin avulla voit tarvittaessa perua aiemman varauksen.'
        });
      }
    } catch (e) {
      console.warn('Duplicate check failed (continuing):', e && e.message);
    }

    // 1. Verify SetupIntent — trust only Stripe, not the client.
    const setupIntent = await stripe.setupIntents.retrieve(setupIntentId);
    if (setupIntent.status !== 'succeeded') {
      return res.status(400).json({
        error: 'Korttitietojen tallennus ei ole valmis (status: ' + setupIntent.status + ')',
      });
    }
    if (!setupIntent.payment_method) {
      return res.status(400).json({ error: 'Maksutapaa ei löydy varauksesta' });
    }

    // 2. Cancellation token — stored on Customer, never exposed back to client
    //    except via the email link.
    const cancellationToken = generateToken();

    // 3. Create Customer with contact info + token.
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

    // 4. Attach PaymentMethod to Customer + set as default.
    const paymentMethodId = typeof setupIntent.payment_method === 'string'
      ? setupIntent.payment_method
      : setupIntent.payment_method.id;

    await stripe.paymentMethods.attach(paymentMethodId, { customer: customer.id });
    await stripe.customers.update(customer.id, {
      invoice_settings: { default_payment_method: paymentMethodId },
    });

    // 5. Update SetupIntent metadata for dashboard visibility.
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

    // 6. Build cancellation URL.
    const baseUrl = baseUrlFromReq(req);
    const cancellationUrl = baseUrl + '/peruuta.html?customer=' +
      encodeURIComponent(customer.id) + '&token=' + encodeURIComponent(cancellationToken);

    // 7. Fire-and-log emails. Booking still succeeds even if email fails.
    await sendEmails({
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      customerId: customer.id,
      cancellationUrl: cancellationUrl,
    });

    return res.status(200).json({ ok: true, customerId: customer.id });
  } catch (err) {
    console.error('save-booking error:', err);
    const message = (err && err.message) ? err.message : 'Varauksen tallennus epäonnistui';
    return res.status(500).json({ error: message });
  }
};

/* ============================================================
   EMAIL SENDING (Resend)
   ============================================================ */

async function sendEmails(ctx) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured — emails skipped');
    return;
  }
  if (!process.env.EMAIL_FROM) {
    console.warn('EMAIL_FROM not configured — emails skipped');
    return;
  }

  let Resend;
  try {
    Resend = require('resend').Resend;
  } catch (e) {
    console.error('resend package not installed:', e);
    return;
  }
  const resend = new Resend(process.env.RESEND_API_KEY);

  // Customer confirmation (best effort)
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

  // Studio notification (best effort)
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

/* ============================================================
   EMAIL TEMPLATES
   Inline-styled HTML for max email-client compatibility.
   ============================================================ */

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
            '<p style="font-size:15px;line-height:1.7;color:#4a5e55;margin:0 0 20px;">',
              'Voit peruuttaa ennakkovarauksen koska tahansa ilmaiseksi. Klikkaa alla olevaa painiketta — vahvistat peruutuksen vielä erikseen seuraavalla sivulla.',
            '</p>',
            '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 24px;"><tr><td style="background:#c8997a;border-radius:2px;">',
              '<a href="' + safeUrl + '" style="display:inline-block;padding:14px 28px;font-size:13px;letter-spacing:0.18em;text-transform:uppercase;color:#faf8f4;text-decoration:none;">Peruuta varaus</a>',
            '</td></tr></table>',
            '<p style="font-size:13px;line-height:1.6;color:#4a5e55;margin:0 0 8px;">Jos painike ei toimi, kopioi tämä osoite selaimeesi:</p>',
            '<p style="font-size:12px;line-height:1.5;color:#4a5e55;margin:0 0 32px;word-break:break-all;">' + safeUrl + '</p>',
            '<hr style="border:0;border-top:1px solid rgba(74,94,85,0.12);margin:32px 0 24px;">',
            '<p style="font-size:13px;line-height:1.7;color:#4a5e55;margin:0;">',
              'Mahlamäen Kauneusstudio · Kotka, Ruonala<br>',
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
    '— Mahlamäen Kauneusstudio · Kotka, Ruonala',
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
            '<table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin:16px 0;">',
              row('Nimi',       safe.name),
              row('Sähköposti', '<a href="mailto:' + safe.email + '" style="color:#c8997a;">' + safe.email + '</a>'),
              row('Puhelin',    '<a href="tel:' + safe.phone.replace(/\s/g, '') + '" style="color:#c8997a;">' + safe.phone + '</a>'),
              row('Tuote',      'Ennakkovaraus – ensikäynti'),
              row('Hinta',      PRICE_LABEL + ' (' + PRICE_NOTE + ')'),
              row('Stripe',     '<a href="' + stripeUrl + '" style="color:#c8997a;">' + safe.cust + '</a>'),
            '</table>',
            '<p style="font-size:14px;line-height:1.7;color:#4a5e55;margin:16px 0 0;">',
              'Asiakkaalle on lähetetty vahvistus jossa on peruutuslinkki. ',
              'Voit veloittaa kortin Stripen Dashboardista kun hoitoaika on sovittu.',
            '</p>',
            '<p style="font-size:12px;line-height:1.6;color:#4a5e55;margin:24px 0 0;word-break:break-all;">',
              'Asiakkaan peruutuslinkki: <a href="' + safe.cancel + '" style="color:#4a5e55;">' + safe.cancel + '</a>',
            '</p>',
          '</td></tr>',
        '</table>',
      '</td></tr>',
    '</table>',
    '</body></html>',
  ].join('');

  function row(label, val) {
    return '<tr>' +
      '<td style="padding:8px 0;width:120px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#4a5e55;vertical-align:top;">' + label + '</td>' +
      '<td style="padding:8px 0;font-size:15px;color:#2a3830;">' + val + '</td>' +
    '</tr>';
  }
}

function studioEmailText(ctx) {
  return [
    'Uusi ennakkovaraus',
    '',
    'Nimi:       ' + ctx.customerName,
    'Sähköposti: ' + ctx.customerEmail,
    'Puhelin:    ' + ctx.customerPhone,
    'Tuote:      Ennakkovaraus – ensikäynti',
    'Hinta:      ' + PRICE_LABEL + ' (' + PRICE_NOTE + ')',
    'Stripe:     ' + ctx.customerId,
    '            https://dashboard.stripe.com/customers/' + ctx.customerId,
    '',
    'Asiakkaalle on lähetetty vahvistus jossa on peruutuslinkki.',
    'Veloita kortti Stripen Dashboardista kun hoitoaika on sovittu.',
    '',
    'Asiakkaan peruutuslinkki: ' + ctx.cancellationUrl,
  ].join('\n');
}
