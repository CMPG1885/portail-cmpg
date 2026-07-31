-- =====================================================
-- Migration Rapatriement automatique des photos produits — Juillet 2026
-- Corrige le problème des photos qui ne s'intègrent pas dans les PDF
-- (CORS bloqué sur les sites externes des fournisseurs).
--
-- À chaque ajout ou modification de photo_url sur banque_produits,
-- un trigger appelle automatiquement l'Edge Function "rehoster-photo"
-- qui télécharge l'image côté serveur (pas de restriction CORS
-- côté serveur) et la sauvegarde dans le bucket Storage
-- "photos-produits". photo_url est ensuite mis à jour pour pointer
-- vers cette copie hébergée chez nous.
--
-- Prérequis : l'Edge Function "rehoster-photo" doit être déployée
-- (supabase/functions/rehoster-photo/index.ts) avant d'exécuter
-- cette migration.
-- =====================================================
-- Exécuter dans Supabase > SQL Editor (une seule fois)
-- =====================================================

-- ─────────────────────────────────────────────────────
-- 1. Colonnes de traçabilité
--    photo_url_source : URL externe d'origine (référence)
--    photo_url_erreur : dernière erreur de rapatriement, si échec
-- ─────────────────────────────────────────────────────
ALTER TABLE banque_produits ADD COLUMN IF NOT EXISTS photo_url_source TEXT;
ALTER TABLE banque_produits ADD COLUMN IF NOT EXISTS photo_url_erreur TEXT;

-- ─────────────────────────────────────────────────────
-- 2. HTTP asynchrone depuis Postgres (pour appeler l'Edge Function)
-- ─────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS pg_net;

-- ─────────────────────────────────────────────────────
-- 3. Fonction trigger
--    ⚠️ Remplacer la clé "anon" ci-dessous si elle est régénérée
--    un jour (Supabase > Settings > API). C'est la clé publique,
--    pas la clé service_role — sans risque de sécurité additionnel.
-- ─────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION fn_heberger_photo_produit()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM net.http_post(
    url := 'https://wncnagrotxkelnyeftxz.supabase.co/functions/v1/rehoster-photo',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InduY25hZ3JvdHhrZWxueWVmdHh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0NTAzMTcsImV4cCI6MjA5ODAyNjMxN30.nVNMztoxAoKRtplqlYwJcXCRxxXEivdd6MsQLY55A6c'
    ),
    body := jsonb_build_object('id', NEW.id, 'photo_url', NEW.photo_url)
  );
  RETURN NEW;
END;
$$;

-- ─────────────────────────────────────────────────────
-- 4. Triggers (INSERT et UPDATE séparés — Postgres n'autorise pas
--    de référencer OLD dans un trigger INSERT)
-- ─────────────────────────────────────────────────────
DROP TRIGGER IF EXISTS trg_heberger_photo_produit_insert ON banque_produits;
DROP TRIGGER IF EXISTS trg_heberger_photo_produit_update ON banque_produits;

CREATE TRIGGER trg_heberger_photo_produit_insert
AFTER INSERT ON banque_produits
FOR EACH ROW
WHEN (
  NEW.photo_url IS NOT NULL
  AND NEW.photo_url NOT LIKE '%/storage/v1/object/public/photos-produits/%'
)
EXECUTE FUNCTION fn_heberger_photo_produit();

CREATE TRIGGER trg_heberger_photo_produit_update
AFTER UPDATE OF photo_url ON banque_produits
FOR EACH ROW
WHEN (
  NEW.photo_url IS NOT NULL
  AND NEW.photo_url NOT LIKE '%/storage/v1/object/public/photos-produits/%'
  AND NEW.photo_url IS DISTINCT FROM OLD.photo_url
)
EXECUTE FUNCTION fn_heberger_photo_produit();

-- ─────────────────────────────────────────────────────
-- 5. Rattrapage ponctuel des produits déjà existants
--    (à exécuter une fois après la mise en place ci-dessus)
-- ─────────────────────────────────────────────────────
-- SELECT net.http_post(
--   url := 'https://wncnagrotxkelnyeftxz.supabase.co/functions/v1/rehoster-photo',
--   headers := jsonb_build_object(
--     'Content-Type', 'application/json',
--     'Authorization', 'Bearer <clé anon>'
--   ),
--   body := jsonb_build_object('id', id, 'photo_url', photo_url)
-- )
-- FROM banque_produits
-- WHERE photo_url IS NOT NULL
--   AND photo_url NOT LIKE '%supabase.co/storage%';

-- ─────────────────────────────────────────────────────
-- 6. Vérification
-- ─────────────────────────────────────────────────────
SELECT
  count(*) AS total_produits,
  count(*) FILTER (WHERE photo_url LIKE '%supabase.co/storage%') AS photos_hebergees,
  count(*) FILTER (WHERE photo_url_erreur IS NOT NULL) AS photos_en_erreur
FROM banque_produits;
-- Note : certains sites fournisseurs bloquent carrément les requêtes
-- serveur (protection anti-vol d'image plus stricte, ex. Poliform,
-- Espace Plomberium) — ceux-là resteront en erreur et devront être
-- téléversés manuellement une fois via le bouton ↑ Téléverser.
