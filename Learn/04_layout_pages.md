# Création de Layouts et Pages dans Next.js

## Guide Complet

---

# Routage Imbriqué

## Système de Fichiers

- Next.js utilise le routage basé sur les dossiers
- Chaque dossier représente un segment de route
- Les segments correspondent aux URL

## Fichiers Spéciaux

- `page.tsx` : Composant React obligatoire pour la route
- `layout.tsx` : Interface partagée entre plusieurs pages

---

# Création des Pages

## Structure de Base

```typescript
// /app/dashboard/page.tsx
export default function Page() {
  return <p>Page Dashboard</p>;
}
```

## Organisation des Routes

- `/app/page.tsx` → route `/`
- `/app/dashboard/page.tsx` → route `/dashboard`
- `/app/dashboard/customers/page.tsx` → route `/dashboard/customers`
- `/app/dashboard/invoices/page.tsx` → route `/dashboard/invoices`

---

# Colocation des Fichiers

## Avantages

- Organisation des composants UI
- Fichiers de test
- Code associé aux routes
- Seul le contenu de `page.tsx` est public

## Structure Recommandée

```plaintext
/app
  /ui
  /lib
  /dashboard
    /page.tsx
    /layout.tsx
```

---

# Création d'un Layout Dashboard

## Implementation

```typescript
// /app/dashboard/layout.tsx
import SideNav from "@/app/ui/dashboard/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6">{children}</div>
    </div>
  );
}
```

---

# Avantages des Layouts

## Rendu Partiel

- Seuls les composants page sont mis à jour lors de la navigation
- Le layout ne se re-rend pas
- Préservation de l'état React côté client
- Performance optimisée

## Structure Hiérarchique

- Layout racine obligatoire
- Layouts imbriqués possibles
- UI partagée entre pages multiples

---

# Layout Racine

## Caractéristiques

```typescript
// /app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
```

## Utilisation

- Requis dans chaque application Next.js
- Modification des balises `<html>` et `<body>`
- Ajout de métadonnées
- UI partagée dans toute l'application

---

# Points Clés à Retenir

- Routage basé sur les dossiers
- Pages créées avec `page.tsx`
- Layouts pour UI partagée
- Rendu partiel pour performance
- Layout racine obligatoire
- Organisation flexible des fichiers
