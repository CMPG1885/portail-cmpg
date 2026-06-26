-- ============================================================
-- PORTAIL CLIENT CMPG — Schéma Supabase
-- À coller dans : Supabase > SQL Editor > Run
-- ============================================================

-- Clients (les clients de CMPG qui accèdent au portail)
CREATE TABLE clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  telephone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projets
CREATE TABLE projets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  adresse TEXT,
  client_id UUID REFERENCES clients(id),
  statut TEXT DEFAULT 'actif' CHECK (statut IN ('actif','complété','archivé')),
  budget_min NUMERIC(10,2),
  budget_max NUMERIC(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Catégories de produits (Plomberie, Éclairage, etc.)
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  ordre INTEGER DEFAULT 0,
  icone TEXT DEFAULT 'package'
);

-- Initialiser les catégories par défaut
INSERT INTO categories (nom, ordre, icone) VALUES
  ('Plomberie', 1, 'droplet'),
  ('Éclairage', 2, 'bulb'),
  ('Finis plancher et muraux', 3, 'wall'),
  ('Ébénisterie', 4, 'tools'),
  ('Équipements spécialisés', 5, 'settings'),
  ('Escaliers-Portes-Moulures', 6, 'door'),
  ('Mobilier', 7, 'armchair'),
  ('Revêtements Extérieurs', 8, 'home'),
  ('Peinture', 9, 'brush'),
  ('Vitrerie', 10, 'layout');

-- Banque de produits (bibliothèque partagée entre tous les projets)
CREATE TABLE banque_produits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  categorie_id UUID REFERENCES categories(id),
  url TEXT NOT NULL,
  nom TEXT,
  fabricant TEXT,
  modele TEXT,
  sku TEXT,
  couleur TEXT,
  dimensions TEXT,
  caracteristiques TEXT,
  prix NUMERIC(10,2),
  photo_url TEXT,
  notes_internes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Postes d'un projet (ex: PL-01 Évier cuisine, EC-01 Suspension îlot)
CREATE TABLE postes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  projet_id UUID REFERENCES projets(id) ON DELETE CASCADE,
  categorie_id UUID REFERENCES categories(id),
  reference TEXT NOT NULL,  -- ex: PL-01, EC-02
  piece TEXT,               -- ex: Cuisine, SDB principale
  type_selection TEXT DEFAULT 'unique' CHECK (type_selection IN ('unique','multiple')),
  ordre INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Options produits pour chaque poste (1 à 3 options par poste)
CREATE TABLE options_produits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  poste_id UUID REFERENCES postes(id) ON DELETE CASCADE,
  banque_produit_id UUID REFERENCES banque_produits(id),
  lettre_option TEXT DEFAULT 'A' CHECK (lettre_option IN ('A','B','C')),
  quantite INTEGER DEFAULT 1,
  note_client TEXT,
  statut_client TEXT DEFAULT 'en_attente'
    CHECK (statut_client IN ('en_attente','approuvé','à_revoir')),
  commentaire_client TEXT,
  date_decision TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- VUES UTILES
-- ============================================================

-- Vue complète d'un projet avec ses postes et options
CREATE VIEW vue_projet_complet AS
SELECT
  p.id AS projet_id,
  p.nom AS projet_nom,
  p.statut AS projet_statut,
  c.nom AS client_nom,
  c.email AS client_email,
  cat.nom AS categorie,
  po.reference,
  po.piece,
  po.type_selection,
  op.lettre_option,
  bp.nom AS produit_nom,
  bp.fabricant,
  bp.modele,
  bp.sku,
  bp.couleur,
  bp.dimensions,
  bp.prix,
  bp.photo_url,
  op.quantite,
  op.note_client,
  op.statut_client,
  op.commentaire_client
FROM projets p
LEFT JOIN clients c ON c.id = p.client_id
LEFT JOIN postes po ON po.projet_id = p.id
LEFT JOIN categories cat ON cat.id = po.categorie_id
LEFT JOIN options_produits op ON op.poste_id = po.id
LEFT JOIN banque_produits bp ON bp.id = op.banque_produit_id
ORDER BY cat.ordre, po.ordre, op.lettre_option;

-- Vue résumé progression par projet
CREATE VIEW vue_progression_projets AS
SELECT
  p.id,
  p.nom,
  p.statut,
  c.nom AS client,
  COUNT(op.id) AS total_options,
  COUNT(CASE WHEN op.statut_client = 'approuvé' THEN 1 END) AS approuves,
  COUNT(CASE WHEN op.statut_client = 'à_revoir' THEN 1 END) AS a_revoir,
  COUNT(CASE WHEN op.statut_client = 'en_attente' THEN 1 END) AS en_attente,
  SUM(CASE WHEN op.statut_client = 'approuvé' THEN bp.prix * op.quantite ELSE 0 END) AS budget_confirme
FROM projets p
LEFT JOIN clients c ON c.id = p.client_id
LEFT JOIN postes po ON po.projet_id = p.id
LEFT JOIN options_produits op ON op.poste_id = po.id
LEFT JOIN banque_produits bp ON bp.id = op.banque_produit_id
GROUP BY p.id, p.nom, p.statut, c.nom;

-- ============================================================
-- SÉCURITÉ (Row Level Security)
-- ============================================================
ALTER TABLE projets ENABLE ROW LEVEL SECURITY;
ALTER TABLE postes ENABLE ROW LEVEL SECURITY;
ALTER TABLE options_produits ENABLE ROW LEVEL SECURITY;
ALTER TABLE banque_produits ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Pour l'instant : accès complet pour les users authentifiés (admin CMPG)
-- À affiner quand on ajoute les logins clients
CREATE POLICY "admin_full_access" ON projets FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_full_access" ON postes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_full_access" ON options_produits FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_full_access" ON banque_produits FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_full_access" ON clients FOR ALL USING (auth.role() = 'authenticated');
