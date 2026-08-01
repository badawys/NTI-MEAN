import type { Course } from '../models/course.types.js';
import type { Enrollment } from '../models/enrollment.types.js';
import type { User } from '../models/user.types.js';
import type { ApiResult } from '../utils/api-result.types.js';

/**
 * Calculates seats that are still available for approval.
 *
 * `Math.max(..., 0)` protects the UI and callers from displaying a negative
 * number if bad or outdated data says approved enrollments exceed capacity.
 */
function calculateRemainingSeats(course: Course): number {
  return Math.max(course.capacity - course.approvedEnrollments, 0);
}

/**
 * Attempts to create a pending enrollment request.
 *
 * The function returns a typed failure for expected business-rule problems:
 * the caller is not a student, the course is not published, or no seats are
 * available. This keeps validation close to the domain operation and avoids
 * using exceptions for normal user feedback.
 */
export function createEnrollment(
  course: Course,
  student: User,
): ApiResult<Enrollment> {
  /** Only student accounts may submit a course registration. */
  if (student.role !== 'student') {
    return {
      success: false,
      error: 'Only students can register for courses',
    };
  }

  /** Draft and archived courses are not open for registration. */
  if (course.status !== 'published') {
    return {
      success: false,
      error: 'Course is not available for registration',
    };
  }

  /** A full course cannot accept another request. */
  if (calculateRemainingSeats(course) <= 0) {
    return {
      success: false,
      error: 'No seats available for this course',
    };
  }

  /**
   * A successful request starts as pending. Approval is a later workflow step
   * and is intentionally not performed by this function.
   */
  return {
    success: true,
    data: {
      id: `enrollment-${course.id}-${student.id}`,
      studentId: student.id,
      courseId: course.id,
      status: 'pending',
    },
  };
}
