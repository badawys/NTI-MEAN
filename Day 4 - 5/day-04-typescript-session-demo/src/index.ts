import type { Course } from './models/course.types.js';
import type { User } from './models/user.types.js';
import { createEnrollment } from './services/enrollment.service.js';

/**
 * This course object is checked against the Course interface. TypeScript will
 * report a compile-time error if a required property is missing or a literal
 * union value such as `status` is invalid.
 */
const course: Course = {
  id: 'course-angular',
  title: 'Angular Basics',
  capacity: 30,
  approvedEnrollments: 18,
  status: 'published',
};

/**
 * This user is intentionally a student so the enrollment can pass the first
 * business rule in the service.
 */
const student: User = {
  id: 'user-student',
  name: 'Mona Ali',
  email: 'mona@example.com',
  role: 'student',
};

/** Call the domain operation with two strongly typed values. */
const result = createEnrollment(course, student);

/**
 * `success` narrows ApiResult<Enrollment>. Inside this branch `data` is safe;
 * inside the other branch only `error` is available.
 */
if (result.success) {
  console.log('Enrollment created:');
  console.log(result.data);
} else {
  console.error(result.error);
}
