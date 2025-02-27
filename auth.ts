import PostgresAdapter from '@auth/pg-adapter';
import { Pool } from '@neondatabase/serverless';
import NextAuth from 'next-auth';
import Resend from 'next-auth/providers/resend';
import { User } from "@/app/lib/definitions";

import { neon } from '@neondatabase/serverless';
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not defined in environment variables.');
const sql = neon(process.env.DATABASE_URL);

export const { handlers, auth, signIn, signOut } = NextAuth(() => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  return {
    adapter: PostgresAdapter(pool),
    providers: [Resend({ from: 'Student Evals Sign In <noreply@busik.org>' })],
  }
})

export async function sessionUser () {
  const session = await auth();
  if (session && typeof session.user?.email === 'string') {
    const user = await sql`
      SELECT * FROM users
      WHERE email = ${session.user.email}
    `;
    if (user.length === 0) {
      return null;
    }
    return user[0] as User;
  }
  return null;
}

export async function authUser (): Promise<User> {
  const session = await auth();
  if (session && typeof session.user?.email === 'string') {
    const user = await sql`
      SELECT * FROM users
      WHERE email = ${session.user.email}
    `;
    if (user.length === 0) {
      throw new Error('User not found');
    }
    return user[0] as User;
  }
  throw new Error('Not authenticated or email is missing');
}