# Authentification dans Next.js

## Implémentation avec NextAuth.js

---

# Concepts de Base

## Authentification vs Autorisation

- **Authentification** : Vérification de l'identité
- **Autorisation** : Gestion des droits d'accès
- **2FA** : Double facteur d'authentification
- **Sécurité** : Protection des ressources

## NextAuth.js

- Solution complète d'authentification
- Compatible Next.js 14+
- Gestion automatique des sessions
- Multiple providers

---

# Configuration NextAuth.js

## Installation

```bash
# Installation
pnpm i next-auth@beta

# Génération de la clé secrète
openssl rand -base64 32
```

## Configuration de Base

```typescript
// auth.config.ts
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
} satisfies NextAuthConfig;
```

---

# Protection des Routes

## Middleware

```typescript
// middleware.ts
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/((?!api|_next/static|.*\\.png$).*)"],
};
```

## Callbacks

```typescript
callbacks: {
  authorized({ auth, request }) {
    const isLoggedIn = !!auth?.user;
    const isOnDashboard = request.nextUrl
      .pathname.startsWith('/dashboard');

    if (isOnDashboard) {
      return isLoggedIn;
    }
    return true;
  }
}
```

---

# Authentification par Credentials

## Configuration Provider

```typescript
providers: [
  Credentials({
    async authorize(credentials) {
      const parsedCredentials = z
        .object({
          email: z.string().email(),
          password: z.string().min(6),
        })
        .safeParse(credentials);

      if (parsedCredentials.success) {
        // Vérification utilisateur
      }
      return null;
    },
  }),
];
```

## Sécurité

- Hachage des mots de passe avec bcrypt
- Validation des données avec Zod
- Protection contre les injections SQL

---

# Formulaire de Connexion

## Implémentation

```typescript
"use client";

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(authenticate);

  return <form action={formAction}>{/* Champs du formulaire */}</form>;
}
```

## États et Erreurs

- Gestion des états de chargement
- Messages d'erreur personnalisés
- Redirection après connexion
- Validation des entrées

---

# Déconnexion

## Implémentation

```typescript
<form
  action={async () => {
    "use server";
    await signOut({ redirectTo: "/" });
  }}
>
  <button>Déconnexion</button>
</form>
```

## Caractéristiques

- Action serveur
- Redirection automatique
- Nettoyage de session
- Sécurité intégrée

---

# Bonnes Pratiques

## Sécurité

- Variables d'environnement
- Hachage des mots de passe
- Validation des données
- Protection des routes

## Architecture

- Séparation des responsabilités
- Gestion des erreurs
- États de chargement
- Expérience utilisateur

---

# Points Clés à Retenir

- Configuration NextAuth.js
- Protection des routes avec Middleware
- Validation des credentials
- Gestion des sessions
- Sécurité renforcée
- États de formulaire
- Redirection intelligente
