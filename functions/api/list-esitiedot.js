// functions/api/list-esitiedot.js — Cloudflare Pages Functions
// Thin admin-protected endpoint that returns all esitiedot rows.
// Mirrors esitiedot-admin "list" action; kept separate because admin.html
// historically calls this URL directly with an empty body.

import { createClient } from '@supabase/supabase-js';
import { isAdminAuthorized, jsonResponse } from './_auth.js';

function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
  );
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

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('esitiedot')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500);
    if (error) {
      console.error('list-esitiedot error:', error);
      return jsonResponse({ error: 'Lomakkeiden hakeminen epäonnistui' }, 500);
    }
    return jsonResponse({ esitiedot: data || [] }, 200);
  } catch (e) {
    console.error('list-esitiedot threw:', e);
    return jsonResponse({ error: (e && e.message) || 'Lomakkeiden hakeminen epäonnistui' }, 500);
  }
}
