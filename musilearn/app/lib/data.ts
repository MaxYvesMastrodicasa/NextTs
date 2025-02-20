'use server';
import postgres from 'postgres';
import {
  Users
} from './definitions';
import { revalidatePath } from "next/cache";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// =======================  CONFIGURATION  =======================
const USER_PER_PAGE = 10;
const COURSES_PER_PAGE = 6;

// =======================  USER MANAGEMENT  =======================

export async function fetchFilteredUser(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * USER_PER_PAGE;

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
      LIMIT ${USER_PER_PAGE} OFFSET ${offset}
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

    const totalPages = Math.ceil(Number(data[0].count) / USER_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of users.');
  }
  }

  export async function createUser({
    name,
    email,
    password,
    role,
    createdAt,
  }: {
    name: string;
    email: string;
    password: string;
    role: string;
    createdAt: string;
  }) {
    try {
      await sql`
        INSERT INTO users (name, email, password, role, createdat)
        VALUES (${name}, ${email}, ${password}, ${role}, ${createdAt})
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
      console.error("DB Error : ", error);
      return { success: false, message: "Failed to update user." };
    }
  }
  
  export async function deleteUser(id: string) {
    try {
      await sql`DELETE FROM users WHERE id = ${id}`;
      return { message: "User deleted successfully." };
    } catch (error) {
      console.error("DB Error : ", error);
      throw new Error("Failed to delete user.");
    }
  }
  
  // =======================  COURSES ALLOCATIONS  =======================

export async function fetchFilteredCourses(query: string = "", page: number = 1) {
  const offset = (page - 1) * COURSES_PER_PAGE;

  try {
    const courses = await sql`
      SELECT
        courses.id,
        courses.title,
        courses.instrument,
        courses.level,
        courses.schedule,
        courses.capacity,
        users.name AS teacher_name
      FROM courses
      LEFT JOIN users ON courses.teacherId = users.id
      WHERE
        courses.title ILIKE ${"%" + query + "%"} OR
        courses.instrument ILIKE ${"%" + query + "%"} OR
        users.name ILIKE ${"%" + query + "%"}
      ORDER BY courses.title ASC
      LIMIT ${COURSES_PER_PAGE} OFFSET ${offset}
    `;

    return courses;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Échec de la récupération des cours.");
  }
}

export async function fetchCoursesPages(query: string = "") {
  try {
    const data = await sql`
      SELECT COUNT(*) AS total FROM courses
      LEFT JOIN users ON Courses.teacherId = Users.id
      WHERE
        courses.title ILIKE ${"%" + query + "%"} OR
        courses.instrument ILIKE ${"%" + query + "%"} OR
        users.name ILIKE ${"%" + query + "%"}
    `;

    const totalPages = Math.ceil(Number(data[0].total) / COURSES_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Échec du calcul du nombre total de pages.");
  }
}

export async function fetchTeachers() {
  try {
    const teachers = await sql`
      SELECT id, name FROM users WHERE role = 'teacher' ORDER BY name ASC
    `;
    return teachers;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Échec de la récupération des enseignants.");
  }
}

export async function createCourse({
  title,
  description,
  instrument,
  teacherId,
  level,
  schedule,
  capacity,
}: {
  title: string;
  description: string;
  instrument: string;
  teacherId: string;
  level: string;
  schedule: string;
  capacity: number;
}) {
  try {
    await sql`
      INSERT INTO Course (title, description, instrument, teacherId, level, schedule, capacity)
      VALUES (${title}, ${description}, ${instrument}, ${teacherId}, ${level}, ${schedule}, ${capacity})
    `;
    revalidatePath("/(dashboard)/admin/courses_allocation");
    return { success: true, message: "Cours créé avec succès !" };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, message: "Échec de la création du cours." };
  }
}

export async function updateCourse(
  id: string,
  {
    title,
    description,
    instrument,
    teacherId,
    level,
    schedule,
    capacity,
  }: {
    title: string;
    description: string;
    instrument: string;
    teacherId: string;
    level: string;
    schedule: string;
    capacity: number;
  }
) {
  try {
    await sql`
      UPDATE Course SET 
        title = ${title},
        description = ${description},
        instrument = ${instrument},
        teacherId = ${teacherId},
        level = ${level},
        schedule = ${schedule},
        capacity = ${capacity}
      WHERE id = ${id}
    `;
    revalidatePath("/(dashboard)/admin/courses_allocation");
    return { success: true, message: "Cours mis à jour avec succès !" };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, message: "Échec de la mise à jour du cours." };
  }
}

export async function deleteCourse(id: string) {
  try {
    await sql`
      DELETE FROM Course WHERE id = ${id}
    `;
    revalidatePath("/(dashboard)/admin/courses_allocation");
    return { success: true, message: "Cours supprimé avec succès !" };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Échec de la suppression du cours.");
  }
}