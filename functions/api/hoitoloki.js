// functions/api/hoitoloki.js — Cloudflare Pages Functions
// Hoitoloki (MicroPen EVO treatment log) admin CRUD + valokuvat.
// Admin-suojattu istuntotokenilla, käyttää Supabase service_role -avainta.

import { createClient } from '@supabase/supabase-js';
import { isAdminAuthorized, jsonResponse } from './_auth.js';

const BUCKET = 'hoitoloki-kuvat';
const SIGNED_URL_TTL_SEC = 60 * 60;          // 1 h
const MAX_PHOTO_BYTES = 10 * 1024 * 1024;    // 10 MB
const ALLOWED_PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const UUID_RE = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

const VISIT_TYPES = ['Aloitushoito', 'Sarjakäynti', 'Ylläpitokäynti'];
const NUMBING_AGENTS = ['Benzokaiini', 'Lidokaiini', 'Tetrakaiini', 'Muu'];

const DEPTH_FIELDS = [
  'depth_forehead', 'depth_nose', 'depth_facial_scars',
  'depth_orbital', 'depth_neck', 'depth_cheek',
  'depth_decollete', 'depth_hand_right', 'depth_hand_left',
];

/* ---------- helpers ---------- */

function err(status, message) {
  const e = new Error(message);
  e.httpStatus = status;
  return e;
}

function isUuid(s) {
  return typeof s === 'string' && UUID_RE.test(s);
}

function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
  );
}

function sanitizeText(value, maxLength) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, maxLength);
}

function toDepth(value) {
  if (value == null || value === '') return null;
  const n = Number(value);
  if (!Number.isFinite(n)) return null;
  if (n < 0 || n > 2.5) return null;
  return Math.round(n * 100) / 100; // 0.01 mm precision
}

function toInt(value, min, max) {
  if (value == null || value === '') return null;
  const n = Number(value);
  if (!Number.isInteger(n)) return null;
  if (n < min || n > max) return null;
  return n;
}

function toBool(value) {
  if (value === true || value === 'true' || value === 1 || value === '1') return true;
  if (value === false || value === 'false' || value === 0 || value === '0') return false;
  return false;
}

function toIsoDate(value) {
  if (typeof value !== 'string') return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const d = new Date(value + 'T00:00:00Z');
  if (Number.isNaN(d.getTime())) return null;
  return value;
}

function sanitizeAdditionalAreas(input) {
  if (input == null) return [];
  if (!Array.isArray(input)) return null;
  if (input.length > 20) return null;
  const out = [];
  for (const item of input) {
    if (!item || typeof item !== 'object') return null;
    const label = sanitizeText(item.label, 100);
    if (!label) return null;
    const depth = toDepth(item.depth);
    out.push({ label, depth });
  }
  return out;
}

function buildVisitFromBody(body, { isUpdate }) {
  const payload = {};

  if (body.visit_date !== undefined) {
    const d = toIsoDate(body.visit_date);
    if (!d) throw err(400, 'Virheellinen käyntipäivä');
    payload.visit_date = d;
  } else if (!isUpdate) {
    throw err(400, 'Käyntipäivä puuttuu');
  }

  if (body.visit_type !== undefined) {
    if (body.visit_type === null || body.visit_type === '') {
      payload.visit_type = null;
    } else if (VISIT_TYPES.includes(body.visit_type)) {
      payload.visit_type = body.visit_type;
    } else {
      throw err(400, 'Virheellinen käyntityyppi');
    }
  }

  if (body.visit_number !== undefined) {
    if (body.visit_number === null || body.visit_number === '') {
      payload.visit_number = null;
    } else {
      const n = toInt(body.visit_number, 1, 999);
      if (n === null) throw err(400, 'Virheellinen käyntinumero');
      payload.visit_number = n;
    }
  }

  if (body.provider_name !== undefined) {
    payload.provider_name = sanitizeText(body.provider_name, 200);
  }

  if (body.consent_signed !== undefined) {
    payload.consent_signed = toBool(body.consent_signed);
  }
  if (body.before_picture_taken !== undefined) {
    payload.before_picture_taken = toBool(body.before_picture_taken);
  }

  if (body.numbing_agent !== undefined) {
    if (body.numbing_agent === null || body.numbing_agent === '') {
      payload.numbing_agent = null;
    } else if (NUMBING_AGENTS.includes(body.numbing_agent)) {
      payload.numbing_agent = body.numbing_agent;
    } else {
      throw err(400, 'Virheellinen puuduteaine');
    }
  }
  if (body.numbing_agent_other !== undefined) {
    payload.numbing_agent_other = sanitizeText(body.numbing_agent_other, 200);
  }

  if (body.passes !== undefined) {
    if (body.passes === null || body.passes === '') {
      payload.passes = null;
    } else {
      const n = toInt(body.passes, 0, 99);
      if (n === null) throw err(400, 'Virheellinen pistokertojen määrä');
      payload.passes = n;
    }
  }

  for (const field of DEPTH_FIELDS) {
    if (body[field] !== undefined) {
      if (body[field] === null || body[field] === '') {
        payload[field] = null;
      } else {
        const d = toDepth(body[field]);
        if (d === null) throw err(400, 'Virheellinen syvyysarvo: ' + field);
        payload[field] = d;
      }
    }
  }

  if (body.additional_areas !== undefined) {
    const arr = sanitizeAdditionalAreas(body.additional_areas);
    if (arr === null) throw err(400, 'Virheellinen lisäalueiden lista');
    payload.additional_areas = arr;
  }

  if (body.notes !== undefined) {
    payload.notes = sanitizeText(body.notes, 4000);
  }

  return payload;
}

async function signPhotoUrl(supabase, path) {
  if (!path) return null;
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .createSignedUrl(path, SIGNED_URL_TTL_SEC);
    if (error) {
      console.warn('signPhotoUrl error:', error);
      return null;
    }
    return data && data.signedUrl ? data.signedUrl : null;
  } catch (e) {
    console.warn('signPhotoUrl threw:', e);
    return null;
  }
}

async function attachSignedPhotoUrls(supabase, rows) {
  const list = Array.isArray(rows) ? rows : [rows];
  for (const row of list) {
    if (!row) continue;
    row.before_photo_signed_url = await signPhotoUrl(supabase, row.before_photo_url);
    row.after_photo_signed_url  = await signPhotoUrl(supabase, row.after_photo_url);
  }
}

/* ---------- actions ---------- */

async function listAction(supabase, esitiedotId) {
  if (!isUuid(esitiedotId)) throw err(400, 'Virheellinen asiakas-ID');
  const { data, error } = await supabase
    .from('hoitoloki')
    .select('*')
    .eq('esitiedot_id', esitiedotId)
    .order('visit_date', { ascending: true })
    .order('created_at', { ascending: true });
  if (error) throw err(500, 'Hakeminen epäonnistui');
  await attachSignedPhotoUrls(supabase, data || []);
  return { visits: data || [] };
}

async function getAction(supabase, id) {
  if (!isUuid(id)) throw err(400, 'Virheellinen tunniste');
  const { data, error } = await supabase
    .from('hoitoloki')
    .select('*')
    .eq('id', id)
    .single();
  if (error || !data) throw err(404, 'Tietuetta ei löytynyt');
  await attachSignedPhotoUrls(supabase, data);
  return { visit: data };
}

async function createAction(supabase, body) {
  const esitiedotId = body && body.esitiedot_id;
  if (!isUuid(esitiedotId)) throw err(400, 'Virheellinen asiakas-ID');

  // Varmista että esitiedot-rivi on olemassa.
  const { data: cust, error: custErr } = await supabase
    .from('esitiedot')
    .select('id')
    .eq('id', esitiedotId)
    .single();
  if (custErr || !cust) throw err(404, 'Asiakasta ei löytynyt');

  const payload = buildVisitFromBody(body, { isUpdate: false });
  payload.esitiedot_id = esitiedotId;

  const { data, error } = await supabase
    .from('hoitoloki')
    .insert(payload)
    .select('*')
    .single();
  if (error) {
    console.error('hoitoloki create error:', error);
    throw err(500, 'Tallennus epäonnistui');
  }
  await attachSignedPhotoUrls(supabase, data);
  return { ok: true, visit: data };
}

async function updateAction(supabase, id, body) {
  if (!isUuid(id)) throw err(400, 'Virheellinen tunniste');
  const payload = buildVisitFromBody(body, { isUpdate: true });
  if (Object.keys(payload).length === 0) {
    throw err(400, 'Ei muutoksia tallennettavaksi');
  }

  const { data, error } = await supabase
    .from('hoitoloki')
    .update(payload)
    .eq('id', id)
    .select('*')
    .single();
  if (error) {
    console.error('hoitoloki update error:', error);
    throw err(500, 'Päivitys epäonnistui');
  }
  if (!data) throw err(404, 'Tietuetta ei löytynyt');
  await attachSignedPhotoUrls(supabase, data);
  return { ok: true, visit: data };
}

async function deleteAction(supabase, id) {
  if (!isUuid(id)) throw err(400, 'Virheellinen tunniste');

  // Haetaan ensin tietue, jotta tiedetään mitkä kuvat poistetaan storagesta.
  const { data: row, error: getErr } = await supabase
    .from('hoitoloki')
    .select('id, before_photo_url, after_photo_url')
    .eq('id', id)
    .single();
  if (getErr || !row) throw err(404, 'Tietuetta ei löytynyt');

  const paths = [row.before_photo_url, row.after_photo_url].filter(Boolean);
  if (paths.length > 0) {
    const { error: rmErr } = await supabase.storage.from(BUCKET).remove(paths);
    if (rmErr) console.warn('hoitoloki photo remove warning:', rmErr);
  }

  const { error: delErr } = await supabase
    .from('hoitoloki')
    .delete()
    .eq('id', id);
  if (delErr) throw err(500, 'Poisto epäonnistui');

  return { ok: true, id };
}

async function deletePhotoAction(supabase, id, photoType) {
  if (!isUuid(id)) throw err(400, 'Virheellinen tunniste');
  if (photoType !== 'before' && photoType !== 'after') {
    throw err(400, 'Virheellinen kuvatyyppi');
  }

  const column = photoType === 'before' ? 'before_photo_url' : 'after_photo_url';

  const { data: row, error: getErr } = await supabase
    .from('hoitoloki')
    .select('id, ' + column)
    .eq('id', id)
    .single();
  if (getErr || !row) throw err(404, 'Tietuetta ei löytynyt');

  const path = row[column];
  if (path) {
    const { error: rmErr } = await supabase.storage.from(BUCKET).remove([path]);
    if (rmErr) console.warn('hoitoloki photo remove warning:', rmErr);
  }

  const updatePayload = {};
  updatePayload[column] = null;
  const { error: updErr } = await supabase
    .from('hoitoloki')
    .update(updatePayload)
    .eq('id', id);
  if (updErr) throw err(500, 'Päivitys epäonnistui');

  return { ok: true };
}

/* ---------- photo upload (multipart) ---------- */

function extForType(type) {
  if (type === 'image/jpeg') return 'jpg';
  if (type === 'image/png')  return 'png';
  if (type === 'image/webp') return 'webp';
  return 'bin';
}

async function handlePhotoUpload(request, supabase) {
  let form;
  try { form = await request.formData(); } catch (e) {
    throw err(400, 'Virheellinen lomake');
  }

  const hoitolokiId = String(form.get('id') || '').trim();
  const photoType   = String(form.get('photoType') || '').trim();
  const file        = form.get('file');

  if (!isUuid(hoitolokiId)) throw err(400, 'Virheellinen tunniste');
  if (photoType !== 'before' && photoType !== 'after') {
    throw err(400, 'Virheellinen kuvatyyppi');
  }
  if (!file || typeof file === 'string') throw err(400, 'Kuvatiedosto puuttuu');

  if (!ALLOWED_PHOTO_TYPES.includes(file.type)) {
    throw err(400, 'Kuvatyyppiä ei tueta (käytä JPEG, PNG tai WebP)');
  }
  if (file.size > MAX_PHOTO_BYTES) {
    throw err(400, 'Tiedosto on liian suuri (max 10 MB)');
  }

  // Tarkista että hoitoloki-rivi on olemassa ja hae mahdollinen vanha kuva.
  const column = photoType === 'before' ? 'before_photo_url' : 'after_photo_url';
  const { data: row, error: getErr } = await supabase
    .from('hoitoloki')
    .select('id, ' + column)
    .eq('id', hoitolokiId)
    .single();
  if (getErr || !row) throw err(404, 'Tietuetta ei löytynyt');

  const ext = extForType(file.type);
  const path = hoitolokiId + '/' + photoType + '-' + Date.now() + '.' + ext;

  const bytes = await file.arrayBuffer();

  const { error: upErr } = await supabase.storage
    .from(BUCKET)
    .upload(path, bytes, {
      contentType: file.type,
      upsert: false,
    });
  if (upErr) {
    console.error('hoitoloki upload error:', upErr);
    throw err(500, 'Kuvan tallennus epäonnistui');
  }

  // Poista mahdollinen vanha kuva.
  const oldPath = row[column];
  if (oldPath && oldPath !== path) {
    const { error: rmErr } = await supabase.storage.from(BUCKET).remove([oldPath]);
    if (rmErr) console.warn('hoitoloki old photo remove warning:', rmErr);
  }

  // Päivitä rivi.
  const updatePayload = {};
  updatePayload[column] = path;
  const { error: updErr } = await supabase
    .from('hoitoloki')
    .update(updatePayload)
    .eq('id', hoitolokiId);
  if (updErr) throw err(500, 'Päivitys epäonnistui');

  const signedUrl = await signPhotoUrl(supabase, path);
  return { ok: true, path, signedUrl };
}

/* ---------- handler ---------- */

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

  const supabase = getSupabase();
  const contentType = (request.headers.get('content-type') || '').toLowerCase();

  try {
    if (contentType.includes('multipart/form-data')) {
      const result = await handlePhotoUpload(request, supabase);
      return jsonResponse(result, 200);
    }

    let body;
    try { body = await request.json(); } catch (e) { body = {}; }
    const action = typeof body.action === 'string' ? body.action : '';
    const id     = typeof body.id === 'string' ? body.id.trim() : '';

    if (action === 'list') {
      const esitiedotId = typeof body.esitiedotId === 'string' ? body.esitiedotId.trim() : '';
      return jsonResponse(await listAction(supabase, esitiedotId), 200);
    }
    if (action === 'get') {
      return jsonResponse(await getAction(supabase, id), 200);
    }
    if (action === 'create') {
      return jsonResponse(await createAction(supabase, body), 200);
    }
    if (action === 'update') {
      return jsonResponse(await updateAction(supabase, id, body), 200);
    }
    if (action === 'delete') {
      return jsonResponse(await deleteAction(supabase, id), 200);
    }
    if (action === 'delete-photo') {
      const photoType = typeof body.photoType === 'string' ? body.photoType.trim() : '';
      return jsonResponse(await deletePhotoAction(supabase, id, photoType), 200);
    }

    return jsonResponse({ error: 'Tuntematon toiminto' }, 400);
  } catch (e) {
    const status = (e && e.httpStatus) ? e.httpStatus : 500;
    console.error('hoitoloki error:', e);
    return jsonResponse({ error: (e && e.message) || 'Toiminto epäonnistui' }, status);
  }
}
