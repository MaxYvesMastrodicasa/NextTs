# Navigation Entre Pages dans Next.js

## Guide Complet

---

# Optimisation de la Navigation

## Problématique

- Navigation traditionnelle avec `<a>` : rechargement complet
- Impact sur l'expérience utilisateur
- Besoin d'une solution plus fluide

## Solution Next.js

- Composant `<Link>`
- Navigation côté client avec JavaScript
- Pas de rechargement complet de la page

---

# Le Composant Link

## Implémentation

```typescript
import Link from "next/link";

export default function NavLinks() {
  return (
    <Link href="/dashboard" className="flex items-center gap-2 rounded-md p-3">
      <Icon className="w-6" />
      <span>Dashboard</span>
    </Link>
  );
}
```

## Caractéristiques

- Remplacement des balises `<a>`
- Navigation fluide côté client
- Similaire à l'utilisation des balises `<a>`
- Optimisations automatiques

---

# Optimisations Automatiques

## Fractionnement du Code

- Séparation automatique par segments de route
- Isolation des pages
- Chargement optimisé du code
- Meilleure gestion des erreurs

## Préchargement

- Préchargement automatique des routes liées
- Activation en production uniquement
- Déclenchement lors de l'apparition dans le viewport
- Navigation quasi instantanée

---

# Liens Actifs

## Implémentation

```typescript
"use client";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <Link
      href={link.href}
      className={clsx("base-styles", {
        "active-styles": pathname === link.href,
      })}
    >
      {/* Contenu du lien */}
    </Link>
  );
}
```

## Caractéristiques

- Utilisation du hook `usePathname()`
- Composant Client nécessaire
- Style conditionnel avec `clsx`
- Indication visuelle de la page active

---

# Bonnes Pratiques

## Navigation

- Utiliser `<Link>` plutôt que `<a>`
- Profiter du préchargement automatique
- Implémenter des indicateurs visuels

## Performance

- Tirer parti du fractionnement de code
- Utiliser les composants Client judicieusement
- Optimiser les styles conditionnels

---

# Points Clés à Retenir

- Navigation optimisée avec `<Link>`
- Préchargement automatique des routes
- Fractionnement intelligent du code
- Gestion des liens actifs avec `usePathname()`
- Performance améliorée
- Expérience utilisateur fluide
