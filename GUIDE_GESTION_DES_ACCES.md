# Guide — Gérer les accès au portail CMPG

Comment ajouter une employée à l'administration, et un client à l'espace client.

## Les liens

| Portail | Adresse | Pour qui |
|---|---|---|
| Accueil | https://portail.conceptionmpg.com | Tout le monde |
| Administration | https://portail.conceptionmpg.com/admin.html | Équipe CMPG |
| Espace client | https://portail.conceptionmpg.com/client.html | Clients |

---

## Le principe à retenir

Dans les deux cas, un accès se compose de **deux morceaux** qui se créent à des
endroits différents. C'est la source de presque tous les problèmes d'accès.

| | Morceau 1 — le compte | Morceau 2 — la permission |
|---|---|---|
| **Employée** | Compte Supabase (courriel + mot de passe) | Rôle `admin` dans ses métadonnées |
| **Client** | Compte Supabase (courriel + mot de passe) | Fiche dans **Clients** avec le **même courriel** |

Un compte sans sa permission donne une connexion refusée. Une permission sans
compte donne un client qui ne peut pas se connecter du tout.

---

# A. Ajouter une employée à l'administration

## 1. Créer son compte

Supabase → **Authentication** → **Users** → **Add user** → **Create new user**

- **Email** : son courriel professionnel
- **Password** : un mot de passe solide, que vous lui transmettez
- **Auto Confirm User** : ✅ **à cocher** — sinon elle devra confirmer par courriel

Puis **Create user**.

## 2. Lui donner le rôle admin

Sans cette étape, le portail affiche « Accès refusé. Ce portail est réservé à
l'équipe CMPG. »

Supabase → **SQL Editor** → **New query**. Remplacez le courriel, puis **Run** :

```sql
UPDATE auth.users
SET raw_app_meta_data =
      COALESCE(raw_app_meta_data, '{}'::jsonb) || '{"role": "admin"}'::jsonb
WHERE email = 'prenom.nom@conceptionmpg.ca';

SELECT email, raw_app_meta_data->>'role' AS role
FROM auth.users
ORDER BY email;
```

La requête **fusionne** les métadonnées — elle n'écrase rien d'existant.
La vérification doit montrer `admin` à côté de son courriel.

## 3. Lui transmettre

Le lien **admin.html**, son courriel, son mot de passe. Transmettez le mot de
passe par un canal différent du courriel (texto, en personne), et invitez-la à
le changer à sa première connexion.

---

# B. Ajouter un client à l'espace client

## 1. Créer sa fiche dans le portail

Portail admin → **Clients** → **Nouveau client**

- **Nom** : son nom complet, tel qu'il apparaîtra dans le portail
- **Courriel** : ⚠️ **notez-le exactement** — il devra être identique à l'étape 2
- **Téléphone** : facultatif

## 2. Créer son compte de connexion

**C'est l'étape qu'on oublie.** Le bouton « Nouveau client » ne crée que la fiche
dans la base : il ne crée aucun compte de connexion.

Supabase → **Authentication** → **Users** → **Add user** → **Create new user**

- **Email** : ⚠️ **exactement le même** qu'à l'étape 1 — c'est lui qui relie le
  compte à la fiche client. Une majuscule ou un espace de différence et le client
  se connectera sans voir aucun projet.
- **Password** : un mot de passe que vous lui transmettez
- **Auto Confirm User** : ✅ à cocher

**Aucun rôle à ajouter** — un client n'a pas besoin de `app_metadata`. Ne lui
donnez surtout pas le rôle `admin`, ça lui ouvrirait toute l'administration.

## 3. Rattacher un projet

Le client ne verra rien tant qu'un projet ne lui est pas associé.
Portail admin → **Projets** → le projet → sélectionner ce client.

## 4. Lui transmettre

Le lien **client.html**, son courriel, son mot de passe. Dans une fiche client,
le bouton de copie du lien met l'adresse du portail dans le presse-papier.

---

# Problèmes courants

| Symptôme | Cause | Solution |
|---|---|---|
| « Accès refusé. Ce portail est réservé à l'équipe CMPG. » | Le rôle `admin` manque | Refaire l'étape A.2 |
| L'employée a le rôle mais reste bloquée | Le rôle est inscrit dans le jeton de session | Se **déconnecter puis reconnecter** |
| Le client se connecte mais ne voit aucun projet | Courriel différent entre la fiche et le compte, ou aucun projet rattaché | Comparer les deux courriels caractère par caractère ; vérifier le projet |
| « Invalid login credentials » | Mot de passe erroné, ou compte jamais créé | Vérifier dans Authentication → Users |
| Le compte existe mais la connexion échoue | « Auto Confirm User » non coché à la création | Supabase → Users → ouvrir le compte → confirmer |

## Vérifier l'état d'un accès

```sql
-- Qui a le rôle admin ?
SELECT email, raw_app_meta_data->>'role' AS role, created_at
FROM auth.users
ORDER BY email;

-- Fiches clients sans compte de connexion (ne pourront pas se connecter)
SELECT c.nom, c.email
FROM clients c
LEFT JOIN auth.users u ON lower(u.email) = lower(c.email)
WHERE u.id IS NULL;

-- Comptes sans fiche client et sans rôle admin (ne verront rien)
SELECT u.email
FROM auth.users u
LEFT JOIN clients c ON lower(c.email) = lower(u.email)
WHERE c.id IS NULL
  AND COALESCE(u.raw_app_meta_data->>'role', '') <> 'admin';
```

Les deux dernières requêtes sont utiles en ménage périodique : elles révèlent les
accès à moitié créés.

---

# Retirer un accès

**Une employée qui quitte** — retirer le rôle suffit à lui fermer
l'administration, tout en gardant l'historique de son compte :

```sql
UPDATE auth.users
SET raw_app_meta_data = raw_app_meta_data - 'role'
WHERE email = 'prenom.nom@conceptionmpg.ca';
```

Pour supprimer complètement : Supabase → **Authentication** → **Users** →
les trois points à droite du compte → **Delete user**.

**Un projet terminé** — inutile de supprimer le client. Il conserve l'accès à
l'historique de son projet, ce qui est généralement souhaitable. Pour lui fermer
l'accès, supprimez son compte dans Authentication ; sa fiche et son projet
restent intacts dans le portail.

---

*Dernière mise à jour : 11 septembre 2026*
