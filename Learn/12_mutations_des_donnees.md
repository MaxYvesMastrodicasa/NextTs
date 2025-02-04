# Mutation des Données dans Next.js

## Server Actions et Formulaires

---

# Server Actions

## Définition

- Code asynchrone exécuté côté serveur
- Alternative aux endpoints API
- Sécurité renforcée
- Integration avec Next.js

## Avantages

- Amélioration progressive
- Validation des entrées
- Protection contre les menaces
- Cache automatique

---

# Formulaires avec Server Actions

## Implémentation de Base

```typescript
"use server";

async function create(formData: FormData) {
  // Logique de mutation...
}

// Dans le composant
<form action={create}>{/* champs du formulaire */}</form>;
```

## Validation des Données

```typescript
const FormSchema = z.object({
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(["pending", "paid"]),
});
```

---

# Création de Données

## Étapes Clés

1. Extraction des données du formulaire
2. Validation avec Zod
3. Préparation des données
4. Insertion en base de données
5. Revalidation du cache
6. Redirection utilisateur

## Exemple

```typescript
export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = validate(formData);
  await sql`INSERT INTO invoices ...`;
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}
```

---

# Mise à Jour des Données

## Routes Dynamiques

- Création de segments `[id]`
- Récupération des paramètres
- Pré-remplissage des formulaires

## Action de Mise à Jour

```typescript
export async function updateInvoice(id: string, formData: FormData) {
  const data = validate(formData);
  await sql`UPDATE invoices ... WHERE id = ${id}`;
  revalidatePath("/dashboard/invoices");
}
```

---

# Suppression des Données

## Implémentation

```typescript
export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath("/dashboard/invoices");
}
```

## Interface Utilisateur

```typescript
<form action={deleteInvoiceWithId}>
  <button type="submit">Supprimer</button>
</form>
```

---

# Revalidation et Cache

## Méthodes Next.js

- `revalidatePath()` : Rafraîchit le cache
- `redirect()` : Redirige l'utilisateur
- Mise à jour automatique de l'UI

## Exemple

```typescript
revalidatePath("/dashboard/invoices");
redirect("/dashboard/invoices");
```

---

# Points Clés à Retenir

- Server Actions pour mutations sécurisées
- Validation des données avec Zod
- Routes dynamiques pour édition
- Revalidation automatique du cache
- Amélioration progressive
- Gestion intégrée des formulaires
- Sécurité renforcée
