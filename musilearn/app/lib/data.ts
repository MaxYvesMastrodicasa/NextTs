'use server';
import postgres from 'postgres';
import {
  Users
} from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
const ITEMS_PER_PAGE = 10;

export async function fetchFilteredUser(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const filteredUsers = await sql<Users[]>`
      SELECT
        users.id,
        users.name,
        users.role,
        users.email,
        users.createdat
      FROM users
      WHERE
        users.name ILIKE ${`%${query}%`} OR
        users.email ILIKE ${`%${query}%`} OR
        users.role ILIKE ${`%${query}%`}
      ORDER BY users.createdat DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return filteredUsers;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch filtered users.');
  }
}

export async function fetchUsersPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM users
      WHERE
        name ILIKE ${`%${query}%`} OR
        email ILIKE ${`%${query}%`} OR
        createdAt::text ILIKE ${`%${query}%`} OR
        role ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of users.');
  }
  }

  export async function createUser(name: string, email: string, role: string) {
    console.log("Creating user:", { name, email, role });

    try {
      await sql`
        INSERT INTO users (name, email, role, createdat)
        VALUES (${name}, ${email}, ${role}, NOW())
      `;
  
      return { success: true, message: "User created successfully!" };
    } catch (error) {
      console.error("Database Error:", error);
      return { success: false, message: "Failed to create user." };
    }
  }

  export async function updateUser(id: string, name: string, email: string, role: string) {
    try {
      await sql`
        UPDATE users
        SET name = ${name}, email = ${email}, role = ${role}
        WHERE id = ${id}
      `;
      return { success: true, message: "User updated successfully!" };
    } catch (error) {
      console.error("Database Error:", error);
      return { success: false, message: "Failed to update user." };
    }
  }
  
  export async function deleteUser(id: string) {
    try {
      await sql`
        DELETE FROM users WHERE id = ${id}
      `;
  
      return { message: "User deleted successfully." };
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to delete user.");
    }
  }
  

