// functions/api/backup-codes.js — Cloudflare Pages Functions version.

import { createClient } from '@supabase/supabase-js';
import { isAdminAuthorized, hashBackupCode, generateBackupCode, jsonResponse } from './_auth.js';

const NUM_CODES = 10;

function getSupabase() {
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
  const { error: deleteErr } = await supabase
    .from('backup_codes')
    .delete()
    .not('id', 'is', null);
  if (deleteErr) throw deleteErr;

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

export async function onRequestPost(context) {
  const { request } = context;

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return jsonResponse({ error: 'Tietokantapalvelua ei ole konfiguroitu' }, 500);
  }
  if (!process.env.ADMIN_PASSWORD) {
    return jsonResponse({ error: 'Adminia ei ole konfiguroitu' }, 500);
  }
  if (!isAdminAuthorized(request)) {
    return jsonResponse({ error: 'Istunto on vanhentunut' }, 401);
  }

  let body;
  try { body = await request.json(); } catch (e) { body = {}; }
  const action = typeof body.action === 'string' ? body.action : '';

  const supabase = getSupabase();

  try {
    if (action === 'status') {
      return jsonResponse(await statusAction(supabase), 200);
    }
    if (action === 'generate') {
      return jsonResponse(await generateAction(supabase), 200);
    }
    return jsonResponse({ error: 'Tuntematon toiminto' }, 400);
  } catch (err) {
    console.error('backup-codes (' + action + ') error:', err);
    return jsonResponse({ error: 'Toiminto epäonnistui' }, 500);
  }
}
