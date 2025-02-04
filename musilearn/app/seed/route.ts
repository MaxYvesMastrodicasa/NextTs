import bcrypt from 'bcrypt';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedDatabase() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  
  // Création de la table Users
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      name VARCHAR(255) NOT NULL,
      role VARCHAR(255) NOT NULL,
      createdAt TIMESTAMP DEFAULT NOW()
    );
  `;

  // Création de la table Courses
  await sql`
    CREATE TABLE IF NOT EXISTS courses (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      instrument VARCHAR(255) NOT NULL,
      teacherId UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      level VARCHAR(255) NOT NULL,
      schedule VARCHAR(255) NOT NULL,
      capacity INT NOT NULL CHECK (capacity > 0)
    );
  `;

  // Création de la table Enrollment
  await sql`
    CREATE TABLE IF NOT EXISTS enrollments (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      studentId UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      courseId UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
      enrollmentDate TIMESTAMP DEFAULT NOW(),
      status VARCHAR(255) NOT NULL
    );
  `;

  // Création de la table Progress
  await sql`
    CREATE TABLE IF NOT EXISTS progress (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      studentId UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      courseId UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
      date TIMESTAMP DEFAULT NOW(),
      evaluation TEXT NOT NULL,
      comments TEXT
    );
  `;

  console.log("Tables créées avec succès !");
}

seedDatabase().catch(console.error).finally(() => sql.end());