import { failure, success, type ApiResult } from './api-result.js';
import { canAcceptRegistration } from './helpers.js';
import type { Course, Enrollment, User } from './models.js';
import type { Repository } from './repository.js';

/**
 * CourseRegistrationService demonstrates composition.
 *
 * Instead of inheriting database behavior, the service receives repository
 * objects that already know how to load and save data. This keeps each class
 * focused on one responsibility.
 */
export class CourseRegistrationService {
  /**
   * Parameter properties declare and initialize private fields in one place.
   */
  constructor(
    private readonly courseRepository: Repository<Course>,
    private readonly enrollmentRepository: Repository<Enrollment>,
  ) {}

  /**
   * Finds a course and returns an explicit success or failure result.
   */
  getCourse(courseId: string): ApiResult<Course> {
    const course = this.courseRepository.findById(courseId);

    if (!course) {
      return failure('Course was not found.', 404);
    }

    return success(course);
  }

  /**
   * Creates a pending request only when the course can accept registration.
   *
   * The method accepts a User rather than separate name and email strings so
   * the contract remains consistent across callers.
   */
  requestEnrollment(
    courseId: string,
    student: User,
  ): ApiResult<Enrollment> {
    const course = this.courseRepository.findById(courseId);

    if (!course) {
      return failure('Course was not found.', 404);
    }

    if (!canAcceptRegistration(course)) {
      return failure('This course is not accepting registrations.', 409);
    }

    const enrollment: Enrollment = {
      id: `enrollment-${course.id}-${student.id}`,
      courseId: course.id,
      studentId: student.id,
      status: 'pending',
      requestedAt: new Date(),
    };

    this.enrollmentRepository.save(enrollment);
    return success(enrollment, 201);
  }
}
