// api/test-charge.js — Vercel Serverless Function (TEST UTILITY)
//
// Charges a small custom amount (1–500 cents, i.e. 0,01–5,00 €) from an
// existing Stripe Customer's saved card. Used only for manual testing of the
// off-session charge flow. Does NOT modify the customer's booking_status, so
// the same customer can still receive a real 190 € charge later via
// api/charge-booking.js.
//
// Request:  POST /api/test-charge  { customerId, amountCents? }
//           header 'x-admin-password: <ADMIN_PASSWORD>'
//           amountCents defaults to 100 (= 1,00 €)
// Response: 200 { ok: true,  paymentIntentId, status, amountCents }
//           200 { ok: false, paymentIntentId, status, error, needsAction }
//           4xx/5xx { error }
//
// Required env vars:
//   STRIPE_SECRET_KEY
//   ADMIN_PASSWORD
'use strict';

const Stripe = require('stripe');
const crypto = require('crypto');

const MIN_CENTS = 1;
const MAX_CENTS = 500;
const DEFAULT_CENTS = 100;
const CURRENCY = 'eur';

function timingSafeEqualStrings(a, b) {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}
function sanitize(value, maxLength) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}
function getProvidedPassword(req) {
  const header = req.headers['x-admin-password'];
  if (typeof header === 'string' && header) return header;
  const auth = req.headers['authorization'];
  if (typeof auth === 'string' && auth.toLowerCase().startsWith('bearer ')) {
    return auth.slice(7);
  }
  return '';
}
function isAuthorized(req) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const provided = getProvidedPassword(req);
  if (!provided) return false;
  return timingSafeEqualStrings(expected, provided);
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'Maksupalvelua ei ole konfiguroitu' });
  }
  if (!process.env.ADMIN_PASSWORD) {
    return res.status(500).json({ error: 'Adminia ei ole konfiguroitu' });
  }
  if (!isAuthorized(req)) {
    return res.status(401).json({ error: 'Väärä salasana' });
  }

  try {
    const body = (req.body && typeof req.body === 'object') ? req.body : {};
    const customerId = sanitize(body.customerId, 100);
    let amountCents = parseInt(body.amountCents, 10);
    if (!Number.isInteger(amountCents)) amountCents = DEFAULT_CENTS;
    if (amountCents < MIN_CENTS || amountCents > MAX_CENTS) {
      return res.status(400).json({
        error: 'Testiveloituksen summa on rajattu välille ' + MIN_CENTS + '–' + MAX_CENTS + ' senttiä',
      });
    }
    if (!customerId.startsWith('cus_')) {
      return res.status(400).json({ error: 'Virheellinen asiakas-tunniste' });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Retrieve customer + verify saved card exists.
    let customer;
    try {
      customer = await stripe.customers.retrieve(customerId);
    } catch (err) {
      if (err && err.statusCode === 404) {
        return res.status(404).json({ error: 'Asiakasta ei löytynyt' });
      }
      throw err;
    }
    if (customer.deleted) {
      return res.status(404).json({ error: 'Asiakas on poistettu' });
    }

    const pmRef = customer.invoice_settings && customer.invoice_settings.default_payment_method;
    if (!pmRef) {
      return res.status(409).json({ error: 'Asiakkaalle ei ole tallennettu maksukorttia' });
    }
    const paymentMethodId = typeof pmRef === 'string' ? pmRef : pmRef.id;

    // Charge off-session. NOTE: booking_status is intentionally not modified —
    // this is a test charge only.
    let paymentIntent;
    try {
      paymentIntent = await stripe.paymentIntents.create({
        amount: amountCents,
        currency: CURRENCY,
        customer: customerId,
        payment_method: paymentMethodId,
        off_session: true,
        confirm: true,
        description: 'TEST CHARGE (admin)',
        receipt_email: customer.email || undefined,
        metadata: {
          source: 'admin_test_charge',
          customer_id: customerId,
          tested_at: new Date().toISOString(),
        },
      });
    } catch (err) {
      console.error('Test PaymentIntent error:', err);
      const pi = err && err.payment_intent;
      return res.status(200).json({
        ok: false,
        paymentIntentId: pi && pi.id || null,
        status: pi && pi.status || 'failed',
        needsAction: pi && pi.status === 'requires_action',
        error: (err && err.message) || 'Veloitus epäonnistui',
        decline_code: err && err.decline_code || undefined,
        code: err && err.code || undefined,
      });
    }

    return res.status(200).json({
      ok: paymentIntent.status === 'succeeded',
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
      amountCents: amountCents,
    });
  } catch (err) {
    console.error('test-charge error:', err);
    return res.status(500).json({ error: err.message || 'Testiveloitus epäonnistui' });
  }
};
