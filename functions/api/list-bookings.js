// functions/api/list-bookings.js — Cloudflare Pages Functions version.

import Stripe from 'stripe';
import { isAdminAuthorized, jsonResponse } from './_auth.js';

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
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const result = await stripe.customers.search({
      query: "metadata['source']:'ennakkovaraus' AND metadata['booking_status']:'active'",
      limit: 100,
    });

    const bookings = (result.data || [])
      .map(function (c) {
        return {
          id: c.id,
          name: c.name || '',
          email: c.email || '',
          phone: c.phone || '',
          created: c.created,
          hasPaymentMethod: !!(c.invoice_settings && c.invoice_settings.default_payment_method),
          metadata: {
            setup_intent_id: (c.metadata && c.metadata.setup_intent_id) || '',
          },
        };
      })
      .sort(function (a, b) { return b.created - a.created; });

    return jsonResponse({ bookings: bookings }, 200);
  } catch (err) {
    console.error('list-bookings error:', err);
    return jsonResponse({ error: err.message || 'Varauksien hakeminen epäonnistui' }, 500);
  }
}
