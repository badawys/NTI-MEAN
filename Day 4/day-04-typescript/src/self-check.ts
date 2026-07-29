import { CourseRegistrationService } from './course-service.js';
import { courses, sampleStudent } from './fixtures.js';
import {
  calculateRemainingSeats,
  canAcceptRegistration,
  readCourseId,
} from './helpers.js';
import type { Course, Enrollment } from './models.js';
import { InMemoryRepository } from './repository.js';

/**
 * A tiny assertion helper avoids adding a testing framework to this beginner
 * example. It throws immediately when a required behavior is incorrect.
 */
function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(`Self-check failed: ${message}`);
  }
}

/**
 * Runs deterministic checks for the most important domain rules.
 */
function runSelfChecks(): void {
  const angularCourse = courses[0];
  const fullCourse = courses[1];

  assert(angularCourse !== undefined, 'Angular fixture must exist.');
  assert(fullCourse !== undefined, 'Full-course fixture must exist.');
  assert(
    calculateRemainingSeats(angularCourse) === 12,
    'remaining seats must use approved enrollments',
  );
  assert(
    canAcceptRegistration(angularCourse),
    'a published course with seats must accept registration',
  );
  assert(
    !canAcceptRegistration(fullCourse),
    'a full course must reject registration',
  );
  assert(
    readCourseId({ courseId: angularCourse.id }) === angularCourse.id,
    'runtime course ID validation must preserve a valid ID',
  );

  const courseRepository = new InMemoryRepository<Course>(courses);
  const enrollmentRepository = new InMemoryRepository<Enrollment>();
  const service = new CourseRegistrationService(
    courseRepository,
    enrollmentRepository,
  );

  const result = service.requestEnrollment(angularCourse.id, sampleStudent);
  assert(result.ok, 'registration should return a successful ApiResult');

  if (result.ok) {
    assert(
      result.data.status === 'pending',
      'new registration requests must start as pending',
    );
  }

  console.log('Day 4 self-checks passed.');
}

runSelfChecks();
