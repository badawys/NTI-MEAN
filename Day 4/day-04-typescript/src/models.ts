/**
 * A literal union lists every course level accepted by the project.
 *
 * Unlike a general `string`, this type prevents values such as "easy" or
 * "expert-ish" from silently entering the application.
 */
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

/**
 * CourseStatus describes the course lifecycle used by administrators.
 */
export type CourseStatus = 'draft' | 'published' | 'archived';

/**
 * UserRole limits authorization-related values to the roles supported by the
 * Codes Training Center MVP.
 */
export type UserRole = 'student' | 'admin' | 'manager';

/**
 * EnrollmentStatus represents the review states of a registration request.
 */
export type EnrollmentStatus = 'pending' | 'approved' | 'rejected';

/**
 * Course is the shared contract for course data.
 *
 * Interfaces are a strong choice for domain object shapes because they are
 * easy to extend and are familiar in Angular and Express projects.
 */
export interface Course {
  /**
   * `readonly` prevents application code from replacing the identity after a
   * course has been created.
   */
  readonly id: string;
  title: string;
  description: string;
  level: CourseLevel;
  status: CourseStatus;
  capacity: number;
  approvedEnrollments: number;

  /**
   * The question mark makes the property optional. A course may be planned
   * before an instructor is assigned.
   */
  instructorName?: string;
  tags: string[];

  /**
   * A tuple stores a fixed pair: start date first and duration second.
   */
  schedule: readonly [startDate: string, durationHours: number];
}

/**
 * User models the account information shared by the frontend and backend.
 */
export interface User {
  readonly id: string;
  name: string;
  email: string;
  role: UserRole;
}

/**
 * Enrollment connects one user to one course and records the review state.
 */
export interface Enrollment {
  readonly id: string;
  courseId: Course['id'];
  studentId: User['id'];
  status: EnrollmentStatus;
  requestedAt: Date;
}

/**
 * CourseSummary demonstrates a type alias for a small reusable object shape.
 */
export type CourseSummary = {
  id: Course['id'];
  title: string;
  level: CourseLevel;
  remainingSeats: number;
};
