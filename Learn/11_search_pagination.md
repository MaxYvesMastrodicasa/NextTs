# Recherche et Pagination dans Next.js

## Implémentation avec les URL Params

---

# Les API Next.js Utilisées

## Hooks Principaux

- `useSearchParams` : Accès aux paramètres URL
- `usePathname` : Lecture du chemin URL actuel
- `useRouter` : Navigation programmatique

## Avantages des URL Params

- URLs partageables et bookmarkables
- Rendu côté serveur
- Facilité de tracking analytique

---

# Implémentation de la Recherche

## Capture de la Saisie

```typescript
function handleSearch(term: string) {
  const params = new URLSearchParams(searchParams);
  if (term) {
    params.set("query", term);
  } else {
    params.delete("query");
  }
}
```

## Mise à Jour de l'URL

```typescript
replace(`${pathname}?${params.toString()}`);
```

---

# Optimisation avec Debouncing

## Problématique

- Requêtes à chaque frappe
- Surcharge serveur
- Performance impactée

## Solution

```typescript
const handleSearch = useDebouncedCallback((term) => {
  const params = new URLSearchParams(searchParams);
  // ... logique de recherche
}, 300);
```

---

# Implémentation de la Pagination

## Configuration

```typescript
// Page Component
const totalPages = await fetchInvoicesPages(query);
const currentPage = Number(searchParams?.page) || 1;
```

## Création des URLs

```typescript
const createPageURL = (pageNumber: number) => {
  const params = new URLSearchParams(searchParams);
  params.set("page", pageNumber.toString());
  return `${pathname}?${params.toString()}`;
};
```

---

# Synchronisation UI/URL

## Pour la Recherche

```typescript
<input
  defaultValue={searchParams.get("query")?.toString()}
  onChange={(e) => handleSearch(e.target.value)}
/>
```

## Pour la Pagination

```typescript
<Pagination totalPages={totalPages} currentPage={currentPage} />
```

---

# Bonnes Pratiques

## Optimisation

- Utilisation du debouncing
- Réinitialisation page sur recherche
- Gestion des états de chargement

## Architecture

- Séparation client/serveur
- Utilisation des Server Components
- Gestion efficace des états

---

# Points Clés à Retenir

- Gestion via URL params
- Debouncing pour performance
- Synchronisation UI/URL
- Pagination côté serveur
- Architecture hybride
- Optimisation des requêtes
- Expérience utilisateur fluide
