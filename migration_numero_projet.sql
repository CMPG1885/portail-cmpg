-- =====================================================
-- Migration Numéro de projet — Juillet 2026
-- Ajoute la colonne numero_projet sur la table projets,
-- extraite automatiquement du début du nom du projet
-- (ex. "2505 Mercier Thibault" → "2505").
-- =====================================================
-- Exécuter dans Supabase > SQL Editor (une seule fois)
-- =====================================================

-- ─────────────────────────────────────────────────────
-- 1. Ajout de la colonne
-- ─────────────────────────────────────────────────────
ALTER TABLE projets ADD COLUMN IF NOT EXISTS numero_projet TEXT;

-- ─────────────────────────────────────────────────────
-- 2. Backfill : extraire les chiffres en début de nom
--    pour tous les projets existants qui n'ont pas encore
--    de numero_projet
-- ─────────────────────────────────────────────────────
UPDATE projets
SET numero_projet = substring(trim(nom) FROM '^(\d+)')
WHERE numero_projet IS NULL
  AND trim(nom) ~ '^\d+';

-- ─────────────────────────────────────────────────────
-- 3. Vérification — projets et leur numéro extrait
-- ─────────────────────────────────────────────────────
SELECT id, nom, numero_projet
FROM projets
ORDER BY created_at DESC;
-- Résultat attendu : numero_projet rempli pour les projets
-- dont le nom commence par des chiffres (ex. "2505 Mercier Thibault" → 2505).
-- Pour les projets sans numéro au début du nom, numero_projet reste NULL —
-- à corriger manuellement si besoin en modifiant le nom du projet
-- (le numéro sera alors ré-extrait automatiquement à la prochaine sauvegarde).
