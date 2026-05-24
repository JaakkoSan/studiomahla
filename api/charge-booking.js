// api/charge-booking.js — Vercel Serverless Function
//
// Charges 190 € off-session against the customer's saved default payment method.
// Used by admin.html when the studio confirms an appointment and wants to bill.
//
// Request:  POST /api/charge-booking  { customerId }
//           header 'x-admin-token: <session token from /api/verify-totp>'
// Response: 200 { ok: true, paymentIntentId, status }                       — charged
//           200 { ok: false, paymentIntentId, status, error, needsAction }  — SCA required / declined
//           4xx/5xx { error }
//
// On success the Customer metadata is updated:
//   booking_status: 'active' -> 'charged'
//   charged_at:     ISO timestamp
//   payment_intent_id: 'pi_...'
//
// Auth: requires a 2FA-verified session token. Password alone is NOT
// accepted — see api/_auth.js for the full model.
//
// Required env vars:
//   STRIPE_SECRET_KEY
//   ADMIN_PASSWORD   (used to derive the session-token HMAC key)
'use strict';

const Stripe = require('stripe');
const { isAdminAuthorized } = require('./_auth');

const AMOUNT_EUR_CENTS = 19000; // 190.00 EUR
const CURRENCY         = 'eur';
const DESCRIPTION      = 'Ennakkovaraus – ensikäynti';

function sanitize(value, maxLength) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
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
    console.error('ADMIN_PASSWORD not configured');
    return res.status(500).json({ error: 'Adminia ei ole konfiguroitu' });
  }
  if (!isAdminAuthorized(req)) {
    return res.status(401).json({ error: 'Istunto on vanhentunut' });
  }

  try {
    const body = (req.body && typeof req.body === 'object') ? req.body : {};
    const customerId = sanitize(body.customerId, 100);

    if (!customerId.startsWith('cus_')) {
      return res.status(400).json({ error: 'Virheellinen asiakas-tunniste' });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // 1. Retrieve customer + verify booking is still active.
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

    const meta = customer.metadata || {};
    if (meta.booking_status === 'cancelled') {
      return res.status(409).json({ error: 'Varaus on jo peruttu' });
    }
    if (meta.booking_status === 'charged') {
      return res.status(409).json({ error: 'Varaus on jo veloitettu' });
    }
    if (meta.source !== 'ennakkovaraus') {
      return res.status(400).json({ error: 'Asiakas ei ole ennakkovaraus-asiakas' });
    }

    // 2. Get the default payment method.
    const pmRef = customer.invoice_settings && customer.invoice_settings.default_payment_method;
    if (!pmRef) {
      return res.status(409).json({ error: 'Asiakkaalle ei ole tallennettu maksukorttia' });
    }
    const paymentMethodId = typeof pmRef === 'string' ? pmRef : pmRef.id;

    // 3. Create + confirm the PaymentIntent off-session.
    let paymentIntent;
    try {
      paymentIntent = await stripe.paymentIntents.create({
        amount: AMOUNT_EUR_CENTS,
        currency: CURRENCY,
        customer: customerId,
        payment_method: paymentMethodId,
        off_session: true,
        confirm: true,
        description: DESCRIPTION,
        receipt_email: customer.email || undefined,
        metadata: {
          source: 'ennakkovaraus',
          product: 'Ennakkovaraus – ensikäynti',
          customer_id: customerId,
        },
      });
    } catch (err) {
      // Stripe throws CardError for declines/SCA-required scenarios when
      // off_session+confirm is used. The error.payment_intent has details.
      console.error('PaymentIntent error:', err);
      const pi = err && err.payment_intent;
      const needsAction = pi && pi.status === 'requires_action';
      return res.status(200).json({
        ok: false,
        paymentIntentId: pi && pi.id || null,
        status: pi && pi.status || 'failed',
        needsAction: !!needsAction,
        error: (err && err.message) || 'Veloitus epäonnistui',
        decline_code: err && err.decline_code || undefined,
        code: err && err.code || undefined,
      });
    }

    // 4. On success: mark booking as charged.
    if (paymentIntent.status === 'succeeded') {
      const now = new Date().toISOString();
      try {
        await stripe.customers.update(customerId, {
          metadata: Object.assign({}, meta, {
            booking_status: 'charged',
            charged_at: now,
            payment_intent_id: paymentIntent.id,
          }),
        });
      } catch (e) {
        console.error('Customer metadata update failed (non-fatal):', e);
      }
      return res.status(200).json({
        ok: true,
        paymentIntentId: paymentIntent.id,
        status: paymentIntent.status,
      });
    }

    // 5. Otherwise (requires_action / processing / etc.) — report status to admin.
    return res.status(200).json({
      ok: false,
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
      needsAction: paymentIntent.status === 'requires_action',
      error: 'Maksu ei mennyt heti läpi (status: ' + paymentIntent.status + ')',
    });
  } catch (err) {
    console.error('charge-booking error:', err);
    return res.status(500).json({ error: err.message || 'Veloituksen luonti epäonnistui' });
  }
};
