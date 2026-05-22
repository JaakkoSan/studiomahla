// api/setup-intent.js — Vercel Serverless Function
// Creates a Stripe SetupIntent for the pre-booking flow. SetupIntent saves
// the customer's card without charging it — we charge later (off-session)
// when the appointment is confirmed.
//
// Requirements (Vercel project → Environment Variables):
//   STRIPE_SECRET_KEY        (sk_test_... or sk_live_...)
//   STRIPE_PUBLISHABLE_KEY   (pk_test_... or pk_live_...) — returned to the
//                             client so it can initialize Stripe Elements.
//
// Request:   POST /api/setup-intent
// Response:  200 { clientSecret, publishableKey }
//            4xx/5xx { error }
'use strict';

const Stripe = require('stripe');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('STRIPE_SECRET_KEY is not configured');
    return res.status(500).json({ error: 'Maksupalvelua ei ole konfiguroitu' });
  }
  if (!process.env.STRIPE_PUBLISHABLE_KEY) {
    console.error('STRIPE_PUBLISHABLE_KEY is not configured');
    return res.status(500).json({ error: 'Maksupalvelua ei ole konfiguroitu' });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const setupIntent = await stripe.setupIntents.create({
      payment_method_types: ['card'],
      // 'off_session' lets us later charge the saved card without the
      // customer being present (when the studio confirms the appointment).
      usage: 'off_session',
      metadata: {
        source: 'ennakkovaraus',
        product: 'Ennakkovaraus – ensikäynti',
        intended_amount_eur: '190',
      },
    });

    return res.status(200).json({
      clientSecret: setupIntent.client_secret,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  } catch (err) {
    console.error('SetupIntent error:', err);
    const message = (err && err.message) ? err.message : 'Korttitietojen tallennus epäonnistui';
    return res.status(500).json({ error: message });
  }
};
