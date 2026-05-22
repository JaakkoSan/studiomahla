// api/checkout.js — Vercel Serverless Function
// Creates a Stripe Checkout Session for the cart posted from kauppa.html.
//
// Requirements:
//   - Vercel environment variable: STRIPE_SECRET_KEY
//   - package.json with the "stripe" dependency
//
// Request:  POST /api/checkout  { items: [{ priceId, quantity }] }
// Response: 200 { url }   →  client redirects window.location.href to this URL
//           4xx/5xx { error }
'use strict';

const Stripe = require('stripe');

// Whitelist of allowed Stripe price IDs. Validating against this list prevents
// the client from injecting an arbitrary price ID (e.g. one for a different
// product or a cheaper test price).
const ALLOWED_PRICE_IDS = new Set([
  'price_1TZrioR3dxhmwLS5A05ubVMo', // Puhdistusvaahto
  'price_1TZrj8R3dxhmwLS5zlYO0qRg', // Kasvovesi
  'price_1TZrjPR3dxhmwLS59RTWHmZ6', // Silmänympärysvoide
  'price_1TZrjdR3dxhmwLS5cGchLi1e', // Kosteusvoide
  'price_1TZrjqR3dxhmwLS59TnpwNsL', // Ihonhoitopaketti
]);

const MAX_QUANTITY_PER_ITEM = 10;
const MAX_ITEMS_IN_CART = 20;

module.exports = async function handler(req, res) {
  // Only POST is allowed.
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('STRIPE_SECRET_KEY is not configured');
    return res.status(500).json({ error: 'Maksupalvelua ei ole konfiguroitu' });
  }

  try {
    // Vercel parses JSON bodies automatically when Content-Type is application/json.
    const body = (req.body && typeof req.body === 'object') ? req.body : {};
    const items = Array.isArray(body.items) ? body.items : [];

    if (items.length === 0) {
      return res.status(400).json({ error: 'Ostoskori on tyhjä' });
    }
    if (items.length > MAX_ITEMS_IN_CART) {
      return res.status(400).json({ error: 'Ostoskorissa on liikaa tuotteita' });
    }

    // Validate every line item BEFORE talking to Stripe.
    const lineItems = items.map(function (item, index) {
      const priceId = item && item.priceId;
      const rawQty  = item && item.quantity;

      if (typeof priceId !== 'string' || !ALLOWED_PRICE_IDS.has(priceId)) {
        throw new Error('Tuntematon tuote rivillä ' + (index + 1));
      }
      const qty = parseInt(rawQty, 10);
      if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QUANTITY_PER_ITEM) {
        throw new Error('Virheellinen kappalemäärä rivillä ' + (index + 1));
      }
      return { price: priceId, quantity: qty };
    });

    // Build the absolute URL back to kauppa.html. Works on preview deploys too,
    // because Vercel sets x-forwarded-host/proto for each environment.
    const proto = req.headers['x-forwarded-proto'] || 'https';
    const host  = req.headers['x-forwarded-host']  || req.headers.host;
    const baseUrl = proto + '://' + host;

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      locale: 'fi',
      line_items: lineItems,
      shipping_address_collection: { allowed_countries: ['FI'] },
      success_url: baseUrl + '/kauppa.html?status=success&session_id={CHECKOUT_SESSION_ID}',
      cancel_url:  baseUrl + '/kauppa.html?status=cancelled',
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Checkout error:', err);
    const message = (err && err.message) ? err.message : 'Tilauksen luonti epäonnistui';
    return res.status(500).json({ error: message });
  }
};
