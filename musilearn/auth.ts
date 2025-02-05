import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import bcrypt from "bcrypt";
import postgres from "postgres";
import type { User } from "@/app/lib/definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return user[0];
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    return undefined;
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Identifiants manquants");
          return null;
        }

        console.log("Tentative de connexion avec :", credentials.email);

        const user = await getUser(credentials.email);
        if (!user) {
          console.log("Utilisateur non trouvé :", credentials.email);
          return null;
        }

        const passwordsMatch = await bcrypt.compare(credentials.password, user.password);
        if (!passwordsMatch) {
          console.log("Mot de passe incorrect pour :", credentials.email);
          return null;
        }

        console.log("Connexion réussie pour :", user.email);
        return { id: user.id, email: user.email, name: user.name, role: user.role };
      },
    }),
  ],
});
