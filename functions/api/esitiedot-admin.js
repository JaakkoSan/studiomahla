// functions/api/esitiedot-admin.js — Cloudflare Pages Functions version.
// Handles POST actions (admin: list, update, delete, gdpr-check)
// and GET (cron: gdpr-check via Bearer CRON_SECRET).

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { isAdminAuthorized, timingSafeEqualStrings, jsonResponse } from './_auth.js';

const RETENTION_YEARS = 2;

function isPlausibleId(s) {
  return typeof s === 'string' && s.length >= 8 && s.length <= 64 && /^[0-9a-fA-F-]+$/.test(s);
}

function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
  );
}

function err(status, message) {
  const e = new Error(message);
  e.httpStatus = status;
  return e;
}

function fmtFi(iso) {
  if (!iso) return '(ei tiedossa)';
  try {
    return new Date(iso).toLocaleString('fi-FI', { dateStyle: 'short', timeStyle: 'short' });
  } catch (e) { return String(iso); }
}

function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

/* ---------- actions ---------- */

async function listAction(supabase) {
  const { data, error } = await supabase
    .from('esitiedot')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(500);
  if (error) throw err(500, 'Lomakkeiden hakeminen epäonnistui');
  return { esitiedot: data || [] };
}

async function updateAction(supabase, id) {
  if (!isPlausibleId(id)) throw err(400, 'Virheellinen tunniste');
  const nowIso = new Date().toISOString();
  const { data, error } = await supabase
    .from('esitiedot')
    .update({ last_updated: nowIso })
    .eq('id', id)
    .select('id, last_updated');
  if (error) throw err(500, 'Päivitys epäonnistui');
  if (!data || data.length === 0) throw err(404, 'Tietuetta ei löytynyt');
  return { ok: true, id: id, last_updated: data[0].last_updated };
}

async function deleteAction(supabase, id) {
  if (!isPlausibleId(id)) throw err(400, 'Virheellinen tunniste');
  const { data, error } = await supabase
    .from('esitiedot')
    .delete()
    .eq('id', id)
    .select('id');
  if (error) throw err(500, 'Poisto epäonnistui');
  if (!data || data.length === 0) throw err(404, 'Tietuetta ei löytynyt');
  return { ok: true, id: id };
}

async function gdprCheckAction(supabase) {
  const cutoff = new Date();
  cutoff.setFullYear(cutoff.getFullYear() - RETENTION_YEARS);
  const cutoffIso = cutoff.toISOString();

  const { data, error } = await supabase
    .from('esitiedot')
    .select('id, nimi, created_at, last_updated')
    .lt('last_updated', cutoffIso)
    .order('last_updated', { ascending: true });
  if (error) throw err(500, 'GDPR-tarkistus epäonnistui (DB)');

  const rows = data || [];
  if (rows.length === 0) {
    return { ok: true, expiredCount: 0, emailsSent: 0, message: 'Ei vanhentuneita tietueita' };
  }

  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM || !process.env.GDPR_NOTIFY_EMAIL) {
    console.warn('GDPR check: email env vars not configured');
    return { ok: true, expiredCount: rows.length, emailsSent: 0, warning: 'Sähköpostiasetukset puuttuvat' };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  let sent = 0;
  for (const row of rows) {
    try {
      const result = await resend.emails.send({
        from: process.env.EMAIL_FROM,
        to: process.env.GDPR_NOTIFY_EMAIL,
        subject: 'GDPR-muistutus: tarkista asiakastiedot',
        text: gdprText(row),
        html: gdprHtml(row),
      });
      if (result && result.error) {
        console.error('GDPR email failed for', row.id, ':', result.error);
      } else {
        sent++;
      }
    } catch (e) {
      console.error('GDPR email threw for', row.id, ':', e);
    }
  }
  return { ok: true, expiredCount: rows.length, emailsSent: sent };
}

function gdprText(row) {
  return 'Asiakkaan ' + (row.nimi || '(nimetön)') +
    ' esitiedot on tallennettu ' + fmtFi(row.created_at) +
    ' ja viimeksi päivitetty ' + fmtFi(row.last_updated) +
    '. Tarkista onko asiakkuus edelleen voimassa ja päivitä tai poista tiedot admin-näkymässä.';
}

function gdprHtml(row) {
  const name = escapeHtml(row.nimi || '(nimetön)');
  const created = escapeHtml(fmtFi(row.created_at));
  const updated = escapeHtml(fmtFi(row.last_updated));
  return [
    '<!DOCTYPE html><html lang="fi"><head><meta charset="utf-8"></head>',
    '<body style="margin:0;padding:0;background:#f5f0e8;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;color:#2a3830;">',
    '<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f5f0e8;padding:32px 16px;">',
      '<tr><td align="center">',
        '<table role="presentation" cellpadding="0" cellspacing="0" width="560" style="max-width:560px;background:#faf8f4;border-radius:4px;border-left:4px solid #b85a3a;">',
          '<tr><td style="padding:32px;">',
            '<div style="font-family:Georgia,serif;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#b85a3a;margin-bottom:8px;">GDPR-muistutus</div>',
            '<h1 style="font-family:Georgia,serif;font-weight:400;font-size:22px;color:#2a3830;margin:0 0 16px;">Tarkista asiakastiedot</h1>',
            '<p style="font-size:15px;line-height:1.7;color:#2a3830;margin:0 0 12px;">Asiakkaan <strong>' + name + '</strong> esitiedot on tallennettu <strong>' + created + '</strong> ja viimeksi päivitetty <strong>' + updated + '</strong>.</p>',
            '<p style="font-size:15px;line-height:1.7;color:#2a3830;margin:0 0 16px;">Tarkista onko asiakkuus edelleen voimassa ja päivitä tai poista tiedot admin-näkymässä.</p>',
          '</td></tr>',
        '</table>',
      '</td></tr>',
    '</table>',
    '</body></html>',
  ].join('');
}

function cronAuthorized(request) {
  const expected = process.env.CRON_SECRET;
  if (!expected) return false;
  const auth = request.headers.get('authorization');
  if (typeof auth !== 'string' || !auth.toLowerCase().startsWith('bearer ')) return false;
  const token = auth.slice(7);
  return timingSafeEqualStrings(expected, token);
}

/* ---------- handlers ---------- */

export async function onRequestGet(context) {
  const { request } = context;
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return jsonResponse({ error: 'Tietokantapalvelua ei ole konfiguroitu' }, 500);
  }
  if (!cronAuthorized(request)) {
    return jsonResponse({ error: 'Unauthorized' }, 401);
  }
  try {
    const supabase = getSupabase();
    const r = await gdprCheckAction(supabase);
    console.log('GDPR cron run:', JSON.stringify(r));
    return jsonResponse(r, 200);
  } catch (e) {
    const status = (e && e.httpStatus) ? e.httpStatus : 500;
    console.error('GDPR cron error:', e);
    return jsonResponse({ error: e.message || 'GDPR-tarkistus epäonnistui' }, status);
  }
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
  const id = typeof body.id === 'string' ? body.id.trim() : '';

  const supabase = getSupabase();
  try {
    if (action === 'list')        return jsonResponse(await listAction(supabase), 200);
    if (action === 'update')      return jsonResponse(await updateAction(supabase, id), 200);
    if (action === 'delete')      return jsonResponse(await deleteAction(supabase, id), 200);
    if (action === 'gdpr-check')  return jsonResponse(await gdprCheckAction(supabase), 200);
    return jsonResponse({ error: 'Tuntematon toiminto' }, 400);
  } catch (e) {
    const status = (e && e.httpStatus) ? e.httpStatus : 500;
    console.error('esitiedot-admin (' + action + ') error:', e);
    return jsonResponse({ error: e.message || 'Toiminto epäonnistui' }, status);
  }
}
