# Récupération des Données dans Next.js

## Méthodes et Bonnes Pratiques

---

# Approches de Récupération des Données

## Couche API

- Utilisation avec services tiers
- Sécurisation des secrets côté serveur
- Création avec Route Handlers

## Requêtes Base de Données

- Utilisation directe de SQL
- Utilisation d'un ORM
- Interaction directe via Server Components

---

# Server Components

## Avantages

- Support natif des Promesses JavaScript
- Syntaxe async/await native
- Exécution côté serveur
- Pas besoin de useEffect ou useState
- Accès direct à la base de données

## Utilisation

```typescript
// Composant Server par défaut
export default async function Page() {
  const data = await fetchData();
  return <Component data={data} />;
}
```

---

# Utilisation de SQL

## Pourquoi SQL ?

- Standard industriel
- Compréhension fondamentale
- Versatilité des requêtes
- Protection contre les injections

## Exemple avec postgres.js

```typescript
const sql = postgres(process.env.DATABASE_URL);

const data = await sql`
  SELECT * FROM table
  WHERE condition = ${value}
`;
```

---

# Implémentation Pratique

## Structure Dashboard

- Composants de données multiples
- Récupération asynchrone
- Organisation modulaire

## Exemple de Code

```typescript
export default async function Dashboard() {
  const revenue = await fetchRevenue();
  const invoices = await fetchLatestInvoices();
  return (
    <main>
      <RevenueChart data={revenue} />
      <LatestInvoices data={invoices} />
    </main>
  );
}
```

---

# Optimisation des Requêtes

## Effet Cascade (Waterfall)

- Requêtes séquentielles
- Impact sur la performance
- Dépendances entre requêtes

## Récupération Parallèle

```typescript
const [revenue, invoices] = await Promise.all([
  fetchRevenue(),
  fetchLatestInvoices(),
]);
```

---

# Meilleures Pratiques

## Requêtes Optimisées

- Sélection précise des données
- Utilisation de LIMIT et ORDER
- Jointures SQL efficaces

## Organisation du Code

- Séparation des requêtes
- Réutilisation des fonctions
- Gestion des erreurs

---

# Points Clés à Retenir

- Choix entre API et requêtes directes
- Avantages des Server Components
- Optimisation avec SQL
- Gestion des cascades de requêtes
- Récupération parallèle
- Performance et sécurité
