// api/list-esitiedot.js — Vercel Serverless Function
//
// Returns all pre-treatment form submissions (esitiedot) from Supabase,
// ordered newest first. Used by admin.html on the Esitiedot tab.
//
// Auth: requires a 2FA-verified session token from /api/verify-totp in
// the 'x-admin-token' header. Password alone is NOT accepted — see
// api/_auth.js for the full model.
//
// Required env vars:
//   SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY
//   ADMIN_PASSWORD   (used to derive the session-token HMAC key)
'use strict';

const { isAdminAuthorized } = require('./_auth');

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
  if (!isAdminAuthorized(req)) {
    return res.status(401).json({ error: 'Istunto on vanhentunut' });
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
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500);

    if (error) {
      console.error('Supabase select error:', error);
      return res.status(500).json({ error: 'Lomakkeiden hakeminen epäonnistui' });
    }

    return res.status(200).json({ esitiedot: data || [] });
  } catch (err) {
    console.error('list-esitiedot error:', err);
    return res.status(500).json({ error: err.message || 'Lomakkeiden hakeminen epäonnistui' });
  }
};
