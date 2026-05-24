// api/delete-esitietue.js — Vercel Serverless Function
//
// Deletes a single esitiedot row from Supabase by id (UUID).
// Used by admin.html on the Esitiedot tab.
//
// Auth: shared secret in env var ADMIN_PASSWORD, supplied by the client in
// the 'x-admin-password' header (or 'authorization: Bearer <password>').
// Constant-time comparison to prevent timing attacks.
//
// Request body: { id: '<uuid>' }
//
// Required env vars:
//   SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY
//   ADMIN_PASSWORD
'use strict';

const crypto = require('crypto');

function timingSafeEqualStrings(a, b) {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
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

// Very loose UUID check; Supabase ids are uuid v4. We do not parse strictly
// because Postgres will reject anything malformed anyway.
function isPlausibleId(s) {
  return typeof s === 'string' && s.length >= 8 && s.length <= 64 && /^[0-9a-fA-F-]+$/.test(s);
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Supabase env vars not configured');
    return res.status(500).json({ error: 'Tietokantapalvelua ei ole konfiguroitu' });
  }
  if (!process.env.ADMIN_PASSWORD) {
    console.error('ADMIN_PASSWORD not configured');
    return res.status(500).json({ error: 'Adminia ei ole konfiguroitu' });
  }
  if (!isAuthorized(req)) {
    return res.status(401).json({ error: 'Väärä salasana' });
  }

  const body = (req.body && typeof req.body === 'object') ? req.body : {};
  const id = typeof body.id === 'string' ? body.id.trim() : '';
  if (!isPlausibleId(id)) {
    return res.status(400).json({ error: 'Virheellinen tunniste' });
  }

  let createClient;
  try {
    createClient = require('@supabase/supabase-js').createClient;
  } catch (e) {
    console.error('@supabase/supabase-js not installed:', e);
    return res.status(500).json({ error: 'Tietokantariippuvuus puuttuu' });
  }

  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { persistSession: false } }
    );

    const { data, error } = await supabase
      .from('esitiedot')
      .delete()
      .eq('id', id)
      .select('id');

    if (error) {
      console.error('Supabase delete error:', error);
      return res.status(500).json({ error: 'Poisto epäonnistui' });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Tietuetta ei löytynyt' });
    }

    return res.status(200).json({ ok: true, id: id });
  } catch (err) {
    console.error('delete-esitietue error:', err);
    return res.status(500).json({ error: err.message || 'Poisto epäonnistui' });
  }
};
