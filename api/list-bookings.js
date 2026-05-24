// api/list-bookings.js — Vercel Serverless Function
//
// Returns the list of active pre-bookings (Stripe Customers with
// metadata.booking_status === 'active' and source === 'ennakkovaraus').
// Used by admin.html to render the management view.
//
// Auth: requires a 2FA-verified session token from /api/verify-totp in
// the 'x-admin-token' header. Password alone is NOT accepted — see
// api/_auth.js for the full model.
//
// Required env vars:
//   STRIPE_SECRET_KEY
//   ADMIN_PASSWORD   (used to derive the session-token HMAC key)
'use strict';

const Stripe = require('stripe');
const { isAdminAuthorized } = require('./_auth');

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
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Stripe's search API supports metadata filtering.
    // Note: search has ~1 minute lag vs the live data — fine for an admin view.
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
          created: c.created, // unix seconds
          hasPaymentMethod: !!(c.invoice_settings && c.invoice_settings.default_payment_method),
          metadata: {
            setup_intent_id: c.metadata && c.metadata.setup_intent_id || '',
          },
        };
      })
      .sort(function (a, b) { return b.created - a.created; }); // newest first

    return res.status(200).json({ bookings: bookings });
  } catch (err) {
    console.error('list-bookings error:', err);
    return res.status(500).json({ error: err.message || 'Varauksien hakeminen epäonnistui' });
  }
};
