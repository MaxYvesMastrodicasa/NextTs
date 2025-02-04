# Amélioration de l'Accessibilité dans Next.js

## Bonnes Pratiques et Validation des Formulaires

---

# Fondamentaux de l'Accessibilité

## Définition

- Conception accessible à tous
- Support des technologies d'assistance
- Navigation au clavier
- HTML sémantique

## ESLint et Accessibilité

```json
{
  "scripts": {
    "lint": "next lint"
  }
}
```

- Plugin `eslint-plugin-jsx-a11y`
- Détection précoce des problèmes
- Vérification automatique

---

# Accessibilité des Formulaires

## Bases Essentielles

- HTML sémantique (`<input>`, `<select>`)
- Labels explicites
- Contours de focus
- Messages d'erreur accessibles

## Exemple

```typescript
<div>
  <label htmlFor="amount">Montant</label>
  <input id="amount" name="amount" type="number" className="focus:ring-2" />
</div>
```

---

# Validation des Formulaires

## Validation Côté Client

- Attribut `required`
- Retours immédiats
- Support des technologies d'assistance
- Validation native du navigateur

## Validation Côté Serveur

- Sécurité renforcée
- Format des données validé
- Source unique de vérité
- Protection contre les contournements

---

# Implémentation Server-Side

## Configuration avec Zod

```typescript
const FormSchema = z.object({
  customerId: z.string({
    invalid_type_error: "Sélectionnez un client.",
  }),
  amount: z.coerce.number().gt(0, {
    message: "Montant supérieur à 0 requis.",
  }),
  status: z.enum(["pending", "paid"]),
});
```

## Gestion des Erreurs

```typescript
if (!validatedFields.success) {
  return {
    errors: validatedFields.error.flatten().fieldErrors,
    message: "Champs manquants.",
  };
}
```

---

# ARIA et Messages d'Erreur

## Attributs ARIA

- `aria-describedby`
- `aria-live`
- `aria-atomic`
- Labels explicites

## Exemple

```typescript
<div>
  <select
    aria-describedby="customer-error"
    // ...
  >
    {/* options */}
  </select>
  <div id="customer-error" aria-live="polite" aria-atomic="true">
    {/* messages d'erreur */}
  </div>
</div>
```

---

# Bonnes Pratiques

## Recommandations

- Validation progressive
- Messages d'erreur clairs
- Support du clavier
- Tests d'accessibilité
- Documentation des composants

## Points d'Attention

- Navigation logique
- Contrastes suffisants
- Textes alternatifs
- États des composants
- Retours utilisateur

---

# Points Clés à Retenir

- Importance de l'accessibilité
- Validation hybride client/serveur
- Utilisation des attributs ARIA
- Messages d'erreur accessibles
- Support des technologies d'assistance
- Validation avec Zod
- Tests automatisés
