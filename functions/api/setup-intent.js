// functions/api/setup-intent.js — Cloudflare Pages Functions version.

import Stripe from 'stripe';
import { jsonResponse } from './_auth.js';

export async function onRequestPost(context) {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('STRIPE_SECRET_KEY not configured');
    return jsonResponse({ error: 'Maksupalvelua ei ole konfiguroitu' }, 500);
  }
  if (!process.env.STRIPE_PUBLISHABLE_KEY) {
    console.error('STRIPE_PUBLISHABLE_KEY not configured');
    return jsonResponse({ error: 'Maksupalvelua ei ole konfiguroitu' }, 500);
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const setupIntent = await stripe.setupIntents.create({
      payment_method_types: ['card'],
      usage: 'off_session',
      metadata: {
        source: 'ennakkovaraus',
        product: 'Ennakkovaraus – ensikäynti',
        intended_amount_eur: '190',
      },
    });
    return jsonResponse({
      clientSecret: setupIntent.client_secret,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    }, 200);
  } catch (err) {
    console.error('SetupIntent error:', err);
    return jsonResponse({ error: (err && err.message) || 'Korttitietojen tallennus epäonnistui' }, 500);
  }
}
