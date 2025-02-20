'use server';
 
import { signIn, auth } from '@/auth';
import { AuthError } from 'next-auth';
import { getSession, SessionContext, signOut } from "next-auth/react";
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
 
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
 
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({invalid_type_error: 'Please select a customer.',}),
  amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'],{invalid_type_error: 'Please select an invoice status.',}),
  date: z.string(),
});

  export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function getUserName() {
  const session = await auth();

  if (!session?.user?.name) {
    return null;
  }

  return session.user.name; 
}

export async function getUserRole() {
  const session = await auth();

  if (!session?.user?.role) {
    return "";
  }

  return session.user.role; 
}

