// api/save-booking.js — Vercel Serverless Function
// After the customer has successfully entered their card in Stripe Elements
// (confirmSetup succeeded on the client), the client calls this endpoint with
// the customer's contact info and the SetupIntent id.
//
// This endpoint:
//   1. Retrieves the SetupIntent from Stripe and verifies it succeeded
//   2. Creates a Stripe Customer with name/email/phone
//   3. Attaches the saved PaymentMethod to that Customer + makes it default
//   4. Updates the SetupIntent metadata so the studio can see all the booking
//      details directly in the Stripe Dashboard
//
// Later, when the studio confirms the appointment, they can use the Customer
// id (saved in SetupIntent metadata as customer_id) to create a PaymentIntent
// that charges the saved card off-session.
//
// Required env var:
//   STRIPE_SECRET_KEY
//
// Request:   POST /api/save-booking
//            { setupIntentId, name, email, phone? }
// Response:  200 { ok: true, customerId }
//            4xx/5xx { error }
'use strict';

const Stripe = require('stripe');

function sanitize(value, maxLength) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}
function isValidEmail(value) {
  // Lightweight check — Stripe will reject malformed addresses anyway.
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
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
    const name  = sanitize(body.name,  200);
    const email = sanitize(body.email, 200);
    const phone = sanitize(body.phone, 50);

    if (!setupIntentId.startsWith('seti_')) {
      return res.status(400).json({ error: 'Virheellinen varauksen tunniste' });
    }
    if (!name) {
      return res.status(400).json({ error: 'Nimi puuttuu' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Virheellinen sähköpostiosoite' });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // 1. Verify the SetupIntent succeeded — the client claims it did, but
    //    we trust only what Stripe says.
    const setupIntent = await stripe.setupIntents.retrieve(setupIntentId);
    if (setupIntent.status !== 'succeeded') {
      return res.status(400).json({
        error: 'Korttitietojen tallennus ei ole valmis (status: ' + setupIntent.status + ')',
      });
    }
    if (!setupIntent.payment_method) {
      return res.status(400).json({ error: 'Maksutapaa ei löydy varauksesta' });
    }

    // 2. Create a Customer with the contact info.
    const customer = await stripe.customers.create({
      name: name,
      email: email,
      phone: phone || undefined,
      metadata: {
        source: 'ennakkovaraus',
        product: 'Ennakkovaraus – ensikäynti',
        intended_amount_eur: '190',
        setup_intent_id: setupIntentId,
      },
    });

    // 3. Attach the saved PaymentMethod to the Customer and set as default.
    const paymentMethodId = typeof setupIntent.payment_method === 'string'
      ? setupIntent.payment_method
      : setupIntent.payment_method.id;

    await stripe.paymentMethods.attach(paymentMethodId, { customer: customer.id });
    await stripe.customers.update(customer.id, {
      invoice_settings: { default_payment_method: paymentMethodId },
    });

    // 4. Update SetupIntent metadata so the dashboard view is informative.
    await stripe.setupIntents.update(setupIntentId, {
      metadata: {
        source: 'ennakkovaraus',
        product: 'Ennakkovaraus – ensikäynti',
        intended_amount_eur: '190',
        customer_id: customer.id,
        customer_name: name,
        customer_email: email,
        customer_phone: phone || '',
      },
    });

    return res.status(200).json({ ok: true, customerId: customer.id });
  } catch (err) {
    console.error('save-booking error:', err);
    const message = (err && err.message) ? err.message : 'Varauksen tallennus epäonnistui';
    return res.status(500).json({ error: message });
  }
};
