import bcrypt from 'bcrypt';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442c',
    email: 'student@nextmail.com',
    password: '123456',
    name: 'Student One',
    role: 'student',
    createdAt: new Date()
  },
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    email: 'admin@nextmail.com',
    password: '123456',
    name: 'Admin',
    role: 'admin',
    createdAt: new Date()
  },
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442b',
    email: 'professor@nextmail.com',
    password: '123456',
    name: 'Professor Dupond',
    role: 'professor',
    createdAt: new Date()
  },
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442d',
    email: 'student2@nextmail.com',
    password: '123456',
    name: 'Student Two',
    role: 'student',
    createdAt: new Date()
  }
];

const courses = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    title: 'Guitar for Beginners',
    description: 'An introduction to basic guitar techniques.',
    instrument: 'Guitar',
    teacherId: '410544b2-4001-4271-9855-fec4b6a6442b',
    level: 'Beginner',
    schedule: 'Monday 10:00-12:00',
    capacity: 10
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    title: 'Advanced Piano',
    description: 'A course for advanced piano students.',
    instrument: 'Piano',
    teacherId: '410544b2-4001-4271-9855-fec4b6a6442b',
    level: 'Advanced',
    schedule: 'Wednesday 14:00-16:00',
    capacity: 8
  }
];

const enrollments = [
  {
    id: '660e8400-e29b-41d4-a716-446655440010',
    studentId: '410544b2-4001-4271-9855-fec4b6a6442c',
    courseId: '550e8400-e29b-41d4-a716-446655440000',
    enrollmentDate: new Date(),
    status: 'confirmed'
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440011',
    studentId: '410544b2-4001-4271-9855-fec4b6a6442d',
    courseId: '550e8400-e29b-41d4-a716-446655440001',
    enrollmentDate: new Date(),
    status: 'pending'
  }
];

const progress = [
  {
    id: '770e8400-e29b-41d4-a716-446655440020',
    studentId: '410544b2-4001-4271-9855-fec4b6a6442c',
    courseId: '550e8400-e29b-41d4-a716-446655440000',
    date: new Date(),
    evaluation: 'Good progress',
    comments: 'Student is improving steadily.'
  },
  {
    id: '770e8400-e29b-41d4-a716-446655440021',
    studentId: '410544b2-4001-4271-9855-fec4b6a6442d',
    courseId: '550e8400-e29b-41d4-a716-446655440001',
    date: new Date(),
    evaluation: 'Needs improvement',
    comments: 'Student should practice more on technique.'
  }
];

export { users, courses, enrollments, progress };
