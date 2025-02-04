# Gestion des Métadonnées dans Next.js

## Optimisation SEO et Partage Social

---

# Introduction aux Métadonnées

## Définition

- Informations sur la page web
- Invisibles pour l'utilisateur
- Intégrées dans le `<head>`
- Cruciales pour le référencement

## Importance

- Amélioration du SEO
- Optimisation des partages sociaux
- Indexation efficace
- Expérience utilisateur améliorée

---

# Types de Métadonnées

## Basiques

```html
<!-- Titre -->
<title>Titre de la Page</title>

<!-- Description -->
<meta name="description" content="Description..." />

<!-- Mots-clés -->
<meta name="keywords" content="mot1, mot2" />
```

## Open Graph

```html
<meta property="og:title" content="Titre" />
<meta property="og:description" content="Description" />
<meta property="og:image" content="image.jpg" />
```

---

# API Métadonnées Next.js

## Approches

1. **Configuration**
   - Objet metadata statique
   - Fonction generateMetadata dynamique
2. **Fichiers Spéciaux**
   - `favicon.ico`
   - `opengraph-image.jpg`
   - `robots.txt`
   - `sitemap.xml`

---

# Implémentation Basique

## Configuration Root Layout

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    template: "%s | Mon App",
    default: "Mon App",
  },
  description: "Description de mon application.",
};
```

## Pages Spécifiques

```typescript
// app/page.tsx
export const metadata: Metadata = {
  title: "Accueil",
};
```

---

# Images et Favicons

## Configuration

- Placement dans `/app`
- Détection automatique
- Nommage spécifique

## Fichiers Supportés

- `favicon.ico`
- `opengraph-image.jpg`
- `twitter-image.jpg`
- `icon.jpg`

---

# Bonnes Pratiques

## Organisation

- Métadonnées héritées
- Templates de titres
- Descriptions uniques
- Images optimisées

## Recommandations

- Titres descriptifs
- Descriptions pertinentes
- Images adaptées
- URL de base configurée

---

# Points Clés à Retenir

- API Métadonnées intégrée
- Double approche (config/fichiers)
- Héritage des métadonnées
- Templates personnalisables
- Optimisation SEO
- Support Open Graph
- Gestion des favicons
