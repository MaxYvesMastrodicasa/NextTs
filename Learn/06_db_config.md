# Configuration de la Base de Données

## Guide de mise en place avec Next.js

---

# Préparation du Projet

## Configuration GitHub

- Création d'un dépôt GitHub
- Push du projet sur le dépôt
- Options alternatives :
  - GitLab
  - Bitbucket
  - GitHub Desktop pour débutants

## Configuration Vercel

- Création d'un compte sur vercel.com
- Choix du plan "hobby"
- Connexion avec GitHub
- Import automatique du projet

---

# Déploiement Initial

## Étapes de Déploiement

- Sélection du dépôt GitHub
- Attribution d'un nom au projet
- Déploiement automatique

## Avantages

- Déploiement continu sur la branche principale
- Prévisualisations instantanées des PR
- Détection précoce des erreurs
- Facilité de partage pour feedback

---

# Configuration PostgreSQL

## Création de la Base

- Accès au dashboard Vercel
- Sélection de l'onglet "Storage"
- Choix du fournisseur (Neon, Supabase)
- Sélection de la région
- Configuration du plan de stockage

## Configuration Locale

- Copie des secrets de la base
- Création du fichier `.env`
- Protection des secrets dans `.gitignore`
- Configuration des variables d'environnement

---

# Initialisation des Données

## Seeding de la Base

- Définition : Population initiale de la base
- Exécution via API locale
- Création des tables en SQL
- Import des données de test

## Script de Seeding

- Lancement sur `localhost:3000/seed`
- Création automatique des tables
- Import des données initiales
- Message de confirmation

---

# Vérification et Tests

## Exécution de Requêtes

- Création de routes API de test
- Validation des connexions
- Exemple de requête SQL :

```sql
SELECT invoices.amount, customers.name
FROM invoices
JOIN customers ON invoices.customer_id = customers.id
WHERE invoices.amount = 666;
```

---

# Dépannage

## Solutions Communes

- Vérification des secrets de base de données
- Compatibilité bcrypt/bcryptjs
- Réinitialisation des tables avec DROP TABLE
- Validation des variables d'environnement

## Bonnes Pratiques

- Sauvegarder avant modifications
- Tester en environnement local
- Vérifier les logs d'erreur
- Maintenir les secrets sécurisés

---

# Points Clés à Retenir

- Configuration GitHub/Vercel essentielle
- Déploiement continu automatisé
- Sécurisation des secrets de base de données
- Importance du seeding initial
- Tests de connexion
- Gestion des erreurs
