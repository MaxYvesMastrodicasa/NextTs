import { NextResponse } from 'next/server';
import { users, courses, enrollments, progress } from '../lib/placeholder-data';
import bcrypt from 'bcrypt';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Insert Users
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await sql`
        INSERT INTO users (id, name, email, password, role, createdAt)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.role}, NOW())
        ON CONFLICT (id) DO NOTHING;
      `;
    }

    // Insert Courses
    for (const course of courses) {
      await sql`
        INSERT INTO courses (id, title, description, instrument, teacherId, level, schedule, capacity)
        VALUES (${course.id}, ${course.title}, ${course.description}, ${course.instrument}, ${course.teacherId}, ${course.level}, ${course.schedule}, ${course.capacity})
        ON CONFLICT (id) DO NOTHING;
      `;
    }

    // Insert Enrollments
    for (const enrollment of enrollments) {
      await sql`
        INSERT INTO enrollments (id, studentId, courseId, enrollmentDate, status)
        VALUES (${enrollment.id}, ${enrollment.studentId}, ${enrollment.courseId}, NOW(), ${enrollment.status})
        ON CONFLICT (id) DO NOTHING;
      `;
    }

    // Insert Progress
    for (const progressRecord of progress) {
      await sql`
        INSERT INTO progress (id, studentId, courseId, date, evaluation, comments)
        VALUES (${progressRecord.id}, ${progressRecord.studentId}, ${progressRecord.courseId}, NOW(), ${progressRecord.evaluation}, ${progressRecord.comments})
        ON CONFLICT (id) DO NOTHING;
      `;
    }

    return NextResponse.json({ message: 'Data inserted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to insert data' }, { status: 500 });
  }
}
