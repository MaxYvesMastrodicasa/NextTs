# Le Partial Prerendering dans Next.js

## Une Nouvelle Approche de Rendu

---

# Introduction au PPR

## Définition

- Nouveau modèle de rendu expérimental
- Introduit dans Next.js 14
- Combinaison du rendu statique et dynamique
- Uniquement disponible dans next@canary

## Avantages

- Optimisation des performances
- Flexibilité du rendu
- Meilleure expérience utilisateur
- Chargement hybride

---

# Routes Statiques vs Dynamiques

## Situation Actuelle

- Choix binaire : statique ou dynamique
- Route entière affectée par une fonction dynamique
- Limitation pour les cas mixtes

## Exemple E-commerce

- Informations produit : statiques
- Panier utilisateur : dynamique
- Recommandations : dynamiques
- Navigation : statique

---

# Fonctionnement du PPR

## Processus

- Shell statique généré au build
- "Trous" pour le contenu dynamique
- Chargement asynchrone du contenu dynamique
- Streaming parallèle des données

## Avantages

- Chargement initial rapide
- Optimisation des ressources
- Performance améliorée
- Expérience fluide

---

# Implémentation du PPR

## Configuration

```typescript
// next.config.js
const nextConfig = {
  experimental: {
    ppr: "incremental",
  },
};

// layout.tsx
export const experimental_ppr = true;
```

## Utilisation avec Suspense

- Frontière entre code statique et dynamique
- Pas de modification majeure du code
- Identification automatique des parties dynamiques

---

# Structure d'une Page PPR

## Composants Statiques

- Navigation
- En-têtes
- Éléments UI fixes
- Contenu principal

## Composants Dynamiques

- Données utilisateur
- Contenu personnalisé
- Éléments interactifs
- Données en temps réel

---

# Bonnes Pratiques

## Recommandations

- Identifier les parties statiques/dynamiques
- Utiliser Suspense stratégiquement
- Adopter une approche incrémentale
- Tester en production

## Points d'Attention

- Feature expérimentale
- Compatibilité
- Tests nécessaires
- Evolution possible

---

# Points Clés à Retenir

- Nouveau modèle de rendu hybride
- Optimisation automatique
- Utilisation de Suspense
- Amélioration des performances
- Configuration simple
- Potentiel futur standard
- Approche progressive
