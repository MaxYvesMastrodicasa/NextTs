# Gestion des Erreurs dans Next.js

## Approches et Meilleures Pratiques

---

# Try/Catch dans les Server Actions

## Implémentation

```typescript
export async function createInvoice(formData: FormData) {
  try {
    // Validation et insertion des données
    await sql`INSERT INTO invoices ...`;
    revalidatePath("/dashboard/invoices");
  } catch (error) {
    return { message: "Erreur de création" };
  }
  redirect("/dashboard/invoices");
}
```

## Points Clés

- Gestion gracieuse des erreurs
- Messages d'erreur personnalisés
- Redirection après succès
- Revalidation du cache

---

# Fichier error.tsx

## Caractéristiques

- Composant Client obligatoire
- Capture les erreurs non gérées
- Interface utilisateur de secours
- Limite de l'erreur par segment de route

## Exemple d'Implémentation

```typescript
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main>
      <h2>Une erreur est survenue !</h2>
      <button onClick={reset}>Réessayer</button>
    </main>
  );
}
```

---

# Gestion des 404

## Function notFound()

- Gestion des ressources inexistantes
- Priorité sur error.tsx
- Déclenchement conditionnel

## Exemple

```typescript
if (!invoice) {
  notFound();
}
```

---

# Fichier not-found.tsx

## Configuration

```typescript
export default function NotFound() {
  return (
    <main>
      <h2>404 Non Trouvé</h2>
      <p>La ressource demandée n'existe pas.</p>
      <Link href="/dashboard">Retour</Link>
    </main>
  );
}
```

## Utilisation

- Interface utilisateur 404 personnalisée
- Navigation alternative
- Messages explicatifs

---

# Hiérarchie des Erreurs

## Ordre de Priorité

1. notFound() et not-found.tsx
2. error.tsx
3. Erreurs par défaut

## Considérations

- Spécificité des erreurs
- Portée des gestionnaires
- Organisation des fichiers
- Expérience utilisateur

---

# Bonnes Pratiques

## Recommandations

- Gestion granulaire des erreurs
- Messages utilisateur clairs
- Options de récupération
- Journalisation des erreurs
- Interface utilisateur adaptée

## Points d'Attention

- Erreurs de validation
- Erreurs réseau
- Erreurs base de données
- États d'erreur temporaires

---

# Points Clés à Retenir

- Try/catch pour Server Actions
- error.tsx pour erreurs globales
- notFound pour ressources manquantes
- Hiérarchie des gestionnaires
- Messages utilisateur appropriés
- Options de récupération
- Gestion gracieuse
