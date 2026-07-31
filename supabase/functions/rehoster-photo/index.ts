import { createClient } from "jsr:@supabase/supabase-js@2";

// Rapatrie une photo produit hebergee sur un site externe vers
// le bucket Storage "photos-produits", pour que le CORS ne
// bloque plus son integration dans les PDF (ni son chargement
// en general). Appelee automatiquement par un trigger sur
// banque_produits (INSERT/UPDATE de photo_url), et aussi
// utilisable manuellement pour le rattrapage des produits
// existants.

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const BUCKET = "photos-produits";

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return jsonResponse({ ok: false, error: "POST requis" }, 405);
  }

  let id: string, photo_url: string;
  try {
    const body = await req.json();
    id = body.id;
    photo_url = body.photo_url;
  } catch {
    return jsonResponse({ ok: false, error: "JSON invalide" }, 400);
  }

  if (!id || !photo_url) {
    return jsonResponse({ ok: false, error: "id et photo_url requis" }, 400);
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  // Ne pas re-traiter une image deja hebergee chez nous (evite les boucles)
  if (photo_url.includes(`/storage/v1/object/public/${BUCKET}/`)) {
    return jsonResponse({ ok: true, skipped: "deja_heberge" });
  }

  let origin = "";
  try { origin = new URL(photo_url).origin; } catch { /* ignore */ }

  try {
    const resp = await fetch(photo_url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
        "Accept-Language": "fr-CA,fr;q=0.9,en;q=0.8",
        ...(origin ? { "Referer": origin + "/" } : {}),
      },
      signal: AbortSignal.timeout(15000),
    });

    if (!resp.ok) {
      await supabase.from("banque_produits")
        .update({ photo_url_erreur: `HTTP ${resp.status}` })
        .eq("id", id);
      return jsonResponse({ ok: false, error: `Telechargement echoue (${resp.status})` });
    }

    let contentType = (resp.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();
    let ext = ALLOWED_TYPES[contentType];
    if (!ext) {
      const m = photo_url.match(/\.(jpe?g|png|webp|gif)(\?|$)/i);
      if (m) {
        ext = m[1].toLowerCase().replace("jpeg", "jpg");
        contentType = `image/${ext === "jpg" ? "jpeg" : ext}`;
      }
    }
    if (!ext) {
      await supabase.from("banque_produits")
        .update({ photo_url_erreur: "Type d'image non reconnu" })
        .eq("id", id);
      return jsonResponse({ ok: false, error: "Type d'image non reconnu" });
    }

    const buf = await resp.arrayBuffer();
    if (buf.byteLength > 8 * 1024 * 1024) {
      await supabase.from("banque_produits")
        .update({ photo_url_erreur: "Image trop grosse (>8 Mo)" })
        .eq("id", id);
      return jsonResponse({ ok: false, error: "Image trop grosse (>8 Mo)" });
    }

    const path = `banque_produits/${id}.${ext}`;
    const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, new Uint8Array(buf), {
      contentType,
      upsert: true,
    });
    if (upErr) {
      await supabase.from("banque_produits")
        .update({ photo_url_erreur: upErr.message })
        .eq("id", id);
      return jsonResponse({ ok: false, error: upErr.message });
    }

    const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);
    const newUrl = pub.publicUrl;

    const { error: updErr } = await supabase
      .from("banque_produits")
      .update({ photo_url: newUrl, photo_url_source: photo_url, photo_url_erreur: null })
      .eq("id", id);
    if (updErr) {
      return jsonResponse({ ok: false, error: updErr.message });
    }

    return jsonResponse({ ok: true, url: newUrl });
  } catch (e) {
    await supabase.from("banque_produits")
      .update({ photo_url_erreur: String(e).slice(0, 200) })
      .eq("id", id);
    return jsonResponse({ ok: false, error: String(e) });
  }
});
