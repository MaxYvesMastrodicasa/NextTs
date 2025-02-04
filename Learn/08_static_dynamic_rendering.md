# Rendu Statique et Dynamique dans Next.js

## Comprendre les Différentes Approches

---

# Rendu Statique (Static Rendering)

## Principe

- Génération du contenu lors du build
- Mise en cache du résultat
- Contenu servi depuis le cache

## Avantages

- Sites plus rapides
- Distribution globale du cache
- Charge serveur réduite
- Optimisation SEO

## Cas d'Utilisation

- Contenu partagé entre utilisateurs
- Pages de blog
- Pages produits statiques

---

# Limitations du Rendu Statique

## Cas Non Adaptés

- Tableaux de bord personnalisés
- Données fréquemment mises à jour
- Contenu spécifique à l'utilisateur

## Problématiques

- Pas de mise à jour en temps réel
- Contenu potentiellement obsolète
- Manque de personnalisation

---

# Rendu Dynamique (Dynamic Rendering)

## Principe

- Génération du contenu à la demande
- Rendu côté serveur pour chaque requête
- Actualisation en temps réel

## Avantages

- Données en temps réel
- Contenu personnalisé
- Accès aux informations de requête

## Cas d'Utilisation

- Tableaux de bord
- Profils utilisateurs
- Données fréquemment actualisées

---

# Informations de Requête

## Données Disponibles

- Cookies
- Paramètres d'URL
- Headers de requête
- Contexte utilisateur

## Utilisation

```typescript
// Exemple d'accès aux paramètres
export default function Page({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  // Utilisation des paramètres
}
```

---

# Défis de Performance

## Problématique des Requêtes Lentes

- Impact sur le temps de chargement
- Blocage du rendu de la page
- Dépendance à la requête la plus lente

## Exemple

```typescript
// Simulation d'une requête lente
async function fetchData() {
  console.log("Chargement...");
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return data;
}
```

---

# Bonnes Pratiques

## Choix du Type de Rendu

- Analyser les besoins de l'application
- Identifier la nature des données
- Évaluer la fréquence des mises à jour

## Optimisation

- Utilisation appropriée du cache
- Gestion des états de chargement
- Stratégies de revalidation

---

# Points Clés à Retenir

- Rendu statique pour contenu stable
- Rendu dynamique pour données actualisées
- Impact sur la performance
- Importance du choix selon le cas d'usage
- Gestion des temps de chargement
- Optimisation adaptée aux besoins
