# CSS dans Next.js

## Guide Complet

---

# Styles Globaux

- Situés dans `/app/ui/global.css`
- Appliqués à toutes les routes de l'application
- Bonne pratique : Import dans le layout racine (`/app/layout.tsx`)
- Utilisés pour :
  - Règles de réinitialisation CSS
  - Styles à l'échelle du site
  - Valeurs par défaut des éléments HTML

---

# Intégration de Tailwind CSS

- Framework CSS pour une approche utilitaire
- Accélère le processus de développement
- Style des éléments via des noms de classes
  - Exemple : `text-blue-500` pour un texte bleu
- Avantages :
  - Styles appliqués individuellement aux éléments
  - Pas de maintenance de feuilles de style séparées
  - Évite les conflits de style
  - Taille du bundle CSS optimisée

---

# Modules CSS

- Alternative à Tailwind CSS
- Avantages :
  - CSS scopé aux composants
  - Noms de classes uniques automatiques
  - Prévention des conflits de style
  - Séparation des préoccupations

## Exemple d'utilisation :

```css
/* home.module.css */
.forme {
  height: 0;
  width: 0;
  border-bottom: 30px solid black;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}
```

---

# Utilisation de la bibliothèque clsx

- Objectif : Basculer les noms de classes conditionnellement
- Cas d'utilisation : style basée sur l'état
- Exemple d'implémentation :

```jsx
className={clsx(
  'classes-de-base',
  {
    'classe-conditionnelle-1': condition1,
    'classe-conditionnelle-2': condition2
  }
)}
```

---

# Autres Solutions de style

- Sass (fichiers .scss et .css)
- Bibliothèques CSS-in-JS :
  - styled-jsx
  - styled-components
  - emotion
- Compatibilité totale avec Next.js

---

# Bonnes Pratiques

- Maintenir les styles globaux dans le layout racine
- Utiliser Tailwind pour un développement rapide
- Modules CSS pour les styles spécifiques aux composants
- clsx pour la style conditionnelle
- Choisir l'approche selon les besoins du projet

---

# Points Clés à Retenir

- Plusieurs approches de style disponibles
- Tailwind et Modules CSS sont les plus courants
- Possibilité de mixer différentes solutions de style
- Support natif pour diverses options CSS
- style conditionnel avec clsx
- Approches évolutives et maintenables
