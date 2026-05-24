// api/backup-codes.js — manage TOTP backup recovery codes.
//
// Two actions, dispatched by body.action:
//
//   { action: 'status' }
//     -> { total, unused, hasAny } — counts only, no codes returned.
//
//   { action: 'generate' }
//     -> { codes: ['XXXXX-XXXXX', ...] }
//        Generates 10 fresh codes; FIRST deletes all old rows so the
//        previous set is invalidated. Returns the plaintext codes ONCE;
//        the server never stores or returns them again — only HMAC
//        hashes are persisted. The admin must save these somewhere safe
//        (password manager, printed copy in a sealed envelope).
//
// Auth: requires a 2FA-verified session token in 'x-admin-token' header.
// Same model as the other admin endpoints.
//
// Required env vars:
//   SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY
//   ADMIN_PASSWORD   (used to derive the session-token HMAC key + the
//                     backup-code HMAC key)
'use strict';

const { isAdminAuthorized, hashBackupCode, generateBackupCode } = require('./_auth');

const NUM_CODES = 10;

function getSupabase() {
  let createClient;
  try {
    createClient = require('@supabase/supabase-js').createClient;
  } catch (e) {
    console.error('@supabase/supabase-js not installed:', e);
    return null;
  }
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
  );
}

async function statusAction(supabase) {
  const { data, error } = await supabase
    .from('backup_codes')
    .select('id, used_at');
  if (error) throw error;
  const rows = data || [];
  const total = rows.length;
  const unused = rows.filter(function (r) { return !r.used_at; }).length;
  return { total: total, unused: unused, hasAny: total > 0 };
}

async function generateAction(supabase) {
  // 1. Wipe old codes (regenerate invalidates everything).
  //    Supabase requires a filter for delete; use a tautology.
  const { error: deleteErr } = await supabase
    .from('backup_codes')
    .delete()
    .not('id', 'is', null);
  if (deleteErr) throw deleteErr;

  // 2. Generate N fresh codes; hash before insert.
  const plaintexts = [];
  const rows = [];
  for (let i = 0; i < NUM_CODES; i++) {
    const c = generateBackupCode();
    plaintexts.push(c);
    rows.push({ code_hash: hashBackupCode(c) });
  }

  const { error: insertErr } = await supabase
    .from('backup_codes')
    .insert(rows);
  if (insertErr) throw insertErr;

  return { codes: plaintexts };
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
  if (!isAdminAuthorized(req)) {
    return res.status(401).json({ error: 'Istunto on vanhentunut' });
  }

  const body = (req.body && typeof req.body === 'object') ? req.body : {};
  const action = typeof body.action === 'string' ? body.action : '';

  const supabase = getSupabase();
  if (!supabase) {
    return res.status(500).json({ error: 'Tietokantariippuvuus puuttuu' });
  }

  try {
    if (action === 'status') {
      const r = await statusAction(supabase);
      return res.status(200).json(r);
    }
    if (action === 'generate') {
      const r = await generateAction(supabase);
      return res.status(200).json(r);
    }
    return res.status(400).json({ error: 'Tuntematon toiminto' });
  } catch (err) {
    console.error('backup-codes (' + action + ') error:', err);
    return res.status(500).json({ error: 'Toiminto epäonnistui' });
  }
};
