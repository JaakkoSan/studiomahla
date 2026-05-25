// functions/api/charge-booking.js — Cloudflare Pages Functions version.

import Stripe from 'stripe';
import { isAdminAuthorized, jsonResponse } from './_auth.js';

const AMOUNT_EUR_CENTS = 19000;
const CURRENCY         = 'eur';
const DESCRIPTION      = 'Ennakkovaraus – ensikäynti';

function sanitize(value, maxLength) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

export async function onRequestPost(context) {
  const { request } = context;

  if (!process.env.STRIPE_SECRET_KEY) {
    return jsonResponse({ error: 'Maksupalvelua ei ole konfiguroitu' }, 500);
  }
  if (!process.env.ADMIN_PASSWORD) {
    return jsonResponse({ error: 'Adminia ei ole konfiguroitu' }, 500);
  }
  if (!isAdminAuthorized(request)) {
    return jsonResponse({ error: 'Istunto on vanhentunut' }, 401);
  }

  try {
    let body;
    try { body = await request.json(); } catch (e) { body = {}; }
    const customerId = sanitize(body.customerId, 100);

    if (!customerId.startsWith('cus_')) {
      return jsonResponse({ error: 'Virheellinen asiakas-tunniste' }, 400);
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    let customer;
    try {
      customer = await stripe.customers.retrieve(customerId);
    } catch (err) {
      if (err && err.statusCode === 404) {
        return jsonResponse({ error: 'Asiakasta ei löytynyt' }, 404);
      }
      throw err;
    }
    if (customer.deleted) {
      return jsonResponse({ error: 'Asiakas on poistettu' }, 404);
    }

    const meta = customer.metadata || {};
    if (meta.booking_status === 'cancelled') {
      return jsonResponse({ error: 'Varaus on jo peruttu' }, 409);
    }
    if (meta.booking_status === 'charged') {
      return jsonResponse({ error: 'Varaus on jo veloitettu' }, 409);
    }
    if (meta.source !== 'ennakkovaraus') {
      return jsonResponse({ error: 'Asiakas ei ole ennakkovaraus-asiakas' }, 400);
    }

    const pmRef = customer.invoice_settings && customer.invoice_settings.default_payment_method;
    if (!pmRef) {
      return jsonResponse({ error: 'Asiakkaalle ei ole tallennettu maksukorttia' }, 409);
    }
    const paymentMethodId = typeof pmRef === 'string' ? pmRef : pmRef.id;

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
      console.error('PaymentIntent error:', err);
      const pi = err && err.payment_intent;
      const needsAction = pi && pi.status === 'requires_action';
      return jsonResponse({
        ok: false,
        paymentIntentId: (pi && pi.id) || null,
        status: (pi && pi.status) || 'failed',
        needsAction: !!needsAction,
        error: (err && err.message) || 'Veloitus epäonnistui',
        decline_code: err && err.decline_code,
        code: err && err.code,
      }, 200);
    }

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
      return jsonResponse({
        ok: true,
        paymentIntentId: paymentIntent.id,
        status: paymentIntent.status,
      }, 200);
    }

    return jsonResponse({
      ok: false,
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
      needsAction: paymentIntent.status === 'requires_action',
      error: 'Maksu ei mennyt heti läpi (status: ' + paymentIntent.status + ')',
    }, 200);
  } catch (err) {
    console.error('charge-booking error:', err);
    return jsonResponse({ error: (err && err.message) || 'Veloituksen luonti epäonnistui' }, 500);
  }
}
