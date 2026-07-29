import { describeResult } from './api-result.js';
import { CourseCapacityRecord } from './class-examples.js';
import { CourseRegistrationService } from './course-service.js';
import { toCourseResponseDto } from './dtos.js';
import { courses, sampleEnrollment, sampleStudent } from './fixtures.js';
import {
  createCourseSummary,
  describeCourseLevel,
  formatUnknownError,
  logLessonMessage,
  readCourseId,
  updateEnrollmentStatus,
} from './helpers.js';
import type { Course, Enrollment } from './models.js';
import { InMemoryRepository } from './repository.js';
import {
  buildCourseLabel,
  courseTopics,
  describeUnknownValue,
  trainingCenterName,
} from './type-basics.js';

/**
 * This terminal program connects the isolated TypeScript concepts into one
 * small Codes Training Center workflow.
 */
function runDemo(): void {
  logLessonMessage('Starting the typed course workflow.');
  console.log(`${trainingCenterName}: ${courseTopics.length} sample topics`);
  console.log(buildCourseLabel('Angular Foundations', 'beginner'));
  console.log(describeUnknownValue(18));

  const capacityRecord = new CourseCapacityRecord(
    'course-angular',
    new Date('2026-07-29T00:00:00Z'),
    30,
    18,
  );
  console.log(
    `Class example: ${capacityRecord.remainingSeats} seats remaining`,
  );

  const courseRepository = new InMemoryRepository<Course>(courses);
  const enrollmentRepository = new InMemoryRepository<Enrollment>([
    sampleEnrollment,
  ]);
  const service = new CourseRegistrationService(
    courseRepository,
    enrollmentRepository,
  );

  /**
   * Array.map keeps the input and output types connected automatically.
   */
  const summaries = courseRepository.findAll().map(createCourseSummary);
  console.table(summaries);

  const selectedCourse = service.getCourse('course-angular');
  console.log(
    describeResult(selectedCourse, (course) =>
      JSON.stringify(toCourseResponseDto(course), null, 2),
    ),
  );

  const registration = service.requestEnrollment(
    'course-angular',
    sampleStudent,
  );
  console.log(
    describeResult(
      registration,
      (enrollment) => `Created request: ${enrollment.id}`,
    ),
  );

  const updatedEnrollment = updateEnrollmentStatus(
    sampleEnrollment,
    'approved',
  );
  console.log(`Enrollment status: ${updatedEnrollment.status}`);
  console.log(describeCourseLevel('beginner', 'Course level'));

  /**
   * Values from forms or APIs begin as unknown until runtime checks prove their
   * structure. The try/catch example also shows safe error narrowing.
   */
  try {
    const courseId = readCourseId({ courseId: 'course-angular' });
    console.log(`Validated external course ID: ${courseId}`);
  } catch (error: unknown) {
    console.error(formatUnknownError(error));
  }
}

runDemo();
