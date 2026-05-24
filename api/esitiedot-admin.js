// api/esitiedot-admin.js — combined esitiedot management endpoint.
//
// Replaces the old api/delete-esitietue.js and adds two new operations:
// update (mark visit happened today) and gdpr-check (find rows older
// than 2 years and email a reminder). All three are merged here to stay
// under the Vercel Hobby plan's 12-function limit.
//
// POST (admin-triggered, requires 'x-admin-token'):
//   { action: 'update', id }       — set last_updated = now() for one row
//   { action: 'delete', id }       — delete one row
//   { action: 'gdpr-check' }       — manual run of the retention scan
//
// GET (cron-triggered, requires 'Authorization: Bearer <CRON_SECRET>'):
//   /api/esitiedot-admin           — runs the retention scan
//
// GDPR retention scan:
//   - Reads every esitiedot row where last_updated is older than 2 years
//   - For each, sends a reminder email to GDPR_NOTIFY_EMAIL via Resend
//     (Subject "GDPR-muistutus: tarkista asiakastiedot")
//   - Returns counts; sends NO email if no rows are expired
//
// Required env vars:
//   SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY
//   ADMIN_PASSWORD          (used to derive session-token HMAC key)
//   RESEND_API_KEY          (only needed for GDPR-check email delivery)
//   EMAIL_FROM              (only needed for GDPR-check email delivery)
//   GDPR_NOTIFY_EMAIL       (only needed for GDPR-check email delivery)
//   CRON_SECRET             (only needed for cron GET requests)
'use strict';

const { isAdminAuthorized, timingSafeEqualStrings } = require('./_auth');

const RETENTION_YEARS = 2;

function isPlausibleId(s) {
  return typeof s === 'string' && s.length >= 8 && s.length <= 64 && /^[0-9a-fA-F-]+$/.test(s);
}

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
    console.warn('GDPR check: email env vars not configured — found ' + rows.length + ' expired rows but cannot notify');
    return {
      ok: true,
      expiredCount: rows.length,
      emailsSent: 0,
      warning: 'Sähköpostiasetukset puuttuvat — ei voitu lähettää muistutuksia',
    };
  }

  let Resend;
  try {
    Resend = require('resend').Resend;
  } catch (e) {
    console.error('resend not installed:', e);
    return {
      ok: true,
      expiredCount: rows.length,
      emailsSent: 0,
      warning: 'Resend-kirjasto puuttuu',
    };
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
            '<div style="font-family:Georgia,\'Times New Roman\',serif;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#b85a3a;margin-bottom:8px;">GDPR-muistutus</div>',
            '<h1 style="font-family:Georgia,\'Times New Roman\',serif;font-weight:400;font-size:22px;color:#2a3830;margin:0 0 16px;">Tarkista asiakastiedot</h1>',
            '<p style="font-size:15px;line-height:1.7;color:#2a3830;margin:0 0 12px;">',
              'Asiakkaan <strong>' + name + '</strong> esitiedot on tallennettu <strong>' + created + '</strong> ja viimeksi päivitetty <strong>' + updated + '</strong>.',
            '</p>',
            '<p style="font-size:15px;line-height:1.7;color:#2a3830;margin:0 0 16px;">',
              'Tarkista onko asiakkuus edelleen voimassa ja päivitä tai poista tiedot admin-näkymässä.',
            '</p>',
          '</td></tr>',
        '</table>',
      '</td></tr>',
    '</table>',
    '</body></html>',
  ].join('');
}

/* ---------- auth helpers ---------- */

function cronAuthorized(req) {
  const expected = process.env.CRON_SECRET;
  if (!expected) return false;
  const auth = req.headers['authorization'];
  if (typeof auth !== 'string' || !auth.toLowerCase().startsWith('bearer ')) return false;
  const token = auth.slice(7);
  return timingSafeEqualStrings(expected, token);
}

/* ---------- handler ---------- */

module.exports = async function handler(req, res) {
  // Common env checks
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(500).json({ error: 'Tietokantapalvelua ei ole konfiguroitu' });
  }
  if (!process.env.ADMIN_PASSWORD) {
    return res.status(500).json({ error: 'Adminia ei ole konfiguroitu' });
  }
  const supabase = getSupabase();
  if (!supabase) {
    return res.status(500).json({ error: 'Tietokantariippuvuus puuttuu' });
  }

  // GET — cron-triggered GDPR check.
  if (req.method === 'GET') {
    if (!cronAuthorized(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
      const r = await gdprCheckAction(supabase);
      console.log('GDPR cron run:', JSON.stringify(r));
      return res.status(200).json(r);
    } catch (e) {
      const status = e && e.httpStatus ? e.httpStatus : 500;
      console.error('GDPR cron error:', e);
      return res.status(status).json({ error: e.message || 'GDPR-tarkistus epäonnistui' });
    }
  }

  // POST — admin actions
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!isAdminAuthorized(req)) {
    return res.status(401).json({ error: 'Istunto on vanhentunut' });
  }

  const body = (req.body && typeof req.body === 'object') ? req.body : {};
  const action = typeof body.action === 'string' ? body.action : '';
  const id = typeof body.id === 'string' ? body.id.trim() : '';

  try {
    if (action === 'update')      return res.status(200).json(await updateAction(supabase, id));
    if (action === 'delete')      return res.status(200).json(await deleteAction(supabase, id));
    if (action === 'gdpr-check')  return res.status(200).json(await gdprCheckAction(supabase));
    return res.status(400).json({ error: 'Tuntematon toiminto' });
  } catch (e) {
    const status = e && e.httpStatus ? e.httpStatus : 500;
    console.error('esitiedot-admin (' + action + ') error:', e);
    return res.status(status).json({ error: e.message || 'Toiminto epäonnistui' });
  }
};
