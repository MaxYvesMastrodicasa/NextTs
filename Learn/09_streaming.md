# Le Streaming dans Next.js

## Optimisation des Chargements

---

# Introduction au Streaming

## Définition

- Technique de transfert de données par "chunks"
- Transmission progressive serveur-client
- Affichage au fur et à mesure du chargement

## Avantages

- Pas de blocage de la page entière
- Interaction utilisateur plus rapide
- Chargement progressif du contenu
- Amélioration de l'expérience utilisateur

---

# Méthodes d'Implémentation

## Niveau Page

- Utilisation de `loading.tsx`
- Création automatique de Suspense
- Chargement global de la page

## Niveau Composant

- Utilisation de `<Suspense>`
- Contrôle granulaire du chargement
- Chargement indépendant des composants

---

# Loading.tsx et Skeletons

## Configuration

```typescript
// /app/dashboard/loading.tsx
import DashboardSkeleton from "@/app/ui/skeletons";

export default function Loading() {
  return <DashboardSkeleton />;
}
```

## Avantages des Skeletons

- UI simplifiée pendant le chargement
- Indication visuelle pour l'utilisateur
- Intégration dans le fichier statique
- Amélioration de l'UX

---

# Groupes de Routes

## Utilisation

- Création de dossiers avec parenthèses
- Organisation logique des fichiers
- Sans impact sur l'URL
- Exemple : `(overview)`

## Avantages

- Isolation des états de chargement
- Organisation du code
- Séparation des sections
- Gestion par équipe

---

# Streaming des Composants

## Avec Suspense

```typescript
<Suspense fallback={<ChartSkeleton />}>
  <RevenueChart />
</Suspense>
```

## Caractéristiques

- Chargement différé des composants
- Fallback pendant le chargement
- Indépendance des données
- Optimisation par composant

---

# Stratégies de Placement

## Considérations

- Expérience utilisateur souhaitée
- Priorisation du contenu
- Dépendances aux données
- Impact visuel

## Approches

- Streaming de page complète
- Streaming par composant
- Streaming par section
- Effet échelonné

---

# Bonnes Pratiques

## Recommandations

- Déplacer les requêtes vers les composants
- Utiliser Suspense judicieusement
- Grouper les composants liés
- Équilibrer granularité et UX

## Points d'Attention

- Effet de "popping"
- Temps de chargement total
- Cohérence visuelle
- Expérience utilisateur globale

---

# Points Clés à Retenir

- Streaming pour optimisation progressive
- Flexibilité d'implémentation
- Loading skeletons pour UX
- Organisation avec groupes de routes
- Suspense pour contrôle granulaire
- Importance du placement stratégique
