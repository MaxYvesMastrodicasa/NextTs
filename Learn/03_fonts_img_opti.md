# Optimisation des Polices et Images dans Next.js

## Guide Complet

---

# Optimisation des Polices

## Pourquoi Optimiser ?

- Impact des polices personnalisées sur la performance
- Problème du "Cumulative Layout Shift" (CLS)
- Éviter le changement de mise en page lors du chargement

## Solutions Next.js

- Optimisation automatique avec `next/font`
- Téléchargement des polices au build
- Hébergement avec les autres assets statiques
- Aucune requête réseau supplémentaire

---

# Implémentation des Polices

## Police Principale

```typescript
// /app/ui/fonts.ts
import { Inter } from 'next/font/google';
export const inter = Inter({ subsets: ['latin'] });

// /app/layout.tsx
import { inter } from '@/app/ui/fonts';
<body className={`${inter.className} antialiased`}>
```

## Police Secondaire

- Import de polices additionnelles selon les besoins
- Spécification des poids de police (weights)
- Application à des éléments spécifiques

---

# Optimisation des Images

## Problématiques Courantes

- Gestion de la réactivité
- Adaptation aux différents appareils
- Prévention du layout shift
- Chargement différé (lazy loading)

## Avantages du Composant `next/image`

- Optimisation automatique
- Redimensionnement intelligent
- Chargement différé par défaut
- Support des formats modernes (WebP, AVIF)

---

# Utilisation du Composant Image

## Syntaxe de Base

```jsx
import Image from "next/image";

<Image
  src="/mon-image.png"
  width={1000}
  height={760}
  alt="Description de l'image"
/>;
```

## Bonnes Pratiques

- Définir width et height pour le ratio d'aspect
- Utiliser des classes conditionnelles pour la réactivité
- Fournir des alternatives pour mobile/desktop

---

# Images Réactives

## Gestion Desktop/Mobile

```jsx
{
  /* Image Desktop */
}
<Image
  src="/hero-desktop.png"
  className="hidden md:block"
  width={1000}
  height={760}
  alt="Version desktop"
/>;

{
  /* Image Mobile */
}
<Image
  src="/hero-mobile.png"
  className="block md:hidden"
  width={560}
  height={620}
  alt="Version mobile"
/>;
```

---

# Points Clés à Retenir

## Polices

- Optimisation automatique avec next/font
- Réduction du CLS
- Hébergement optimisé des fichiers de police

## Images

- Composant Image optimisé
- Chargement adaptatif
- Gestion automatique des formats
- Support responsive intégré
