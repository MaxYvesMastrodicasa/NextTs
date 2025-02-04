export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'student' | 'professor' | 'admin';
  createdAt: Date;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  instrument: string;
  teacherId: string;
  level: string;
  schedule: string;
  capacity: number;
};

export type Enrollment = {
  id: string;
  studentId: string;
  courseId: string;
  enrollmentDate: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
};

export type Progress = {
  id: string;
  studentId: string;
  courseId: string;
  date: Date;
  evaluation: string;
  comments: string;
};