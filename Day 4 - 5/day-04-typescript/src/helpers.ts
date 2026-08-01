import type {
  Course,
  CourseLevel,
  CourseSummary,
  Enrollment,
  EnrollmentStatus,
} from './models.js';

/**
 * Pick creates a smaller input contract containing only the fields required by
 * the calculation. This keeps the function reusable and documents its needs.
 */
type CapacityInput = Pick<Course, 'capacity' | 'approvedEnrollments'>;

/**
 * Calculates the number of seats that have not been taken by approved
 * enrollments.
 *
 * Math.max prevents invalid negative UI values if external data temporarily
 * reports more approved enrollments than the configured capacity.
 */
export function calculateRemainingSeats(course: CapacityInput): number {
  return Math.max(0, course.capacity - course.approvedEnrollments);
}

/**
 * Returns true only when a published course still has an available seat.
 */
export function canAcceptRegistration(course: Course): boolean {
  return (
    course.status === 'published' &&
    calculateRemainingSeats(course) > 0
  );
}

/**
 * Converts a complete Course into a small summary suitable for lists.
 */
export function createCourseSummary(course: Course): CourseSummary {
  return {
    id: course.id,
    title: course.title,
    level: course.level,
    remainingSeats: calculateRemainingSeats(course),
  };
}

/**
 * Type narrowing lets TypeScript learn more about an unknown runtime value.
 *
 * `unknown` is safer than `any`: the value cannot be used until checks prove
 * what it contains.
 */
export function formatUnknownError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'An unexpected error occurred.';
}

/**
 * A type predicate narrows `unknown` to a record after a runtime object check.
 */
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

/**
 * Reads a course ID from untrusted data.
 *
 * TypeScript types disappear after compilation, so API, form, and database
 * values still need runtime validation like this.
 */
export function readCourseId(value: unknown): string {
  if (!isRecord(value) || typeof value['courseId'] !== 'string') {
    throw new Error('A valid courseId is required.');
  }

  return value['courseId'];
}

/**
 * Demonstrates a typed function with an optional parameter and a default value.
 */
export function describeCourseLevel(
  level: CourseLevel,
  prefix = 'Level',
): string {
  return `${prefix}: ${level}`;
}

/**
 * Updates the status of an enrollment without changing its readonly identity.
 *
 * The spread operator creates a new object, a pattern used often in Angular
 * state updates.
 */
export function updateEnrollmentStatus(
  enrollment: Enrollment,
  status: EnrollmentStatus,
): Enrollment {
  return { ...enrollment, status };
}

/**
 * A `never` return type documents that this function cannot finish normally.
 */
export function fail(message: string): never {
  throw new Error(message);
}

/**
 * `void` documents that the function performs an action but returns no useful
 * value.
 */
export function logLessonMessage(message: string): void {
  console.log(`[Day 4] ${message}`);
}
