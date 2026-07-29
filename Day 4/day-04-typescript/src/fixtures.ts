import type { Course, Enrollment, User } from './models.js';

/**
 * `satisfies` checks that every object follows Course without changing the
 * useful inferred type of the array.
 */
export const courses = [
  {
    id: 'course-angular',
    title: 'Angular Foundations',
    description: 'Build accessible component-based interfaces with Angular.',
    level: 'beginner',
    status: 'published',
    capacity: 30,
    approvedEnrollments: 18,
    instructorName: 'Mariam Hassan',
    tags: ['angular', 'frontend', 'typescript'],
    schedule: ['2026-08-10', 18],
  },
  {
    id: 'course-node',
    title: 'Node API Fundamentals',
    description: 'Create a small REST API with Node.js and Express.',
    level: 'intermediate',
    status: 'published',
    capacity: 20,
    approvedEnrollments: 20,
    instructorName: 'Omar Adel',
    tags: ['node', 'express', 'backend'],
    schedule: ['2026-08-17', 16],
  },
  {
    id: 'course-mongo',
    title: 'MongoDB Basics',
    description: 'Model and query document data for a training application.',
    level: 'beginner',
    status: 'draft',
    capacity: 24,
    approvedEnrollments: 7,
    tags: ['mongodb', 'database'],
    schedule: ['2026-08-24', 12],
  },
] satisfies Course[];

/**
 * The explicit User annotation is useful here because this object is reused
 * as a general User rather than as a one-off literal.
 */
export const sampleStudent: User = {
  id: 'user-student-1',
  name: 'Mona Ali',
  email: 'mona@example.com',
  role: 'student',
};

/**
 * Date is a runtime object. TypeScript verifies the property type, while the
 * JavaScript Date constructor creates the actual value.
 */
export const sampleEnrollment: Enrollment = {
  id: 'enrollment-1',
  courseId: 'course-angular',
  studentId: sampleStudent.id,
  status: 'approved',
  requestedAt: new Date('2026-07-29T08:00:00Z'),
};
