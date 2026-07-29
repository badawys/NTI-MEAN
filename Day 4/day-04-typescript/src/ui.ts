import { CourseRegistrationService } from './course-service.js';
import { toCourseResponseDto } from './dtos.js';
import { courses, sampleStudent } from './fixtures.js';
import {
  calculateRemainingSeats,
  canAcceptRegistration,
  formatUnknownError,
} from './helpers.js';
import type { Course, Enrollment } from './models.js';
import { InMemoryRepository } from './repository.js';

/**
 * queryRequired centralizes DOM lookup and fails with a clear message if the
 * HTML and TypeScript become inconsistent.
 */
function queryRequired<T extends Element>(
  selector: string,
  elementType: { new (): T },
): T {
  const element = document.querySelector(selector);

  if (!(element instanceof elementType)) {
    throw new Error(`Required element was not found: ${selector}`);
  }

  return element;
}

const courseRepository = new InMemoryRepository<Course>(courses);
const enrollmentRepository = new InMemoryRepository<Enrollment>();
const registrationService = new CourseRegistrationService(
  courseRepository,
  enrollmentRepository,
);

const courseSelect = queryRequired('#courseSelect', HTMLSelectElement);
const capacityValue = queryRequired('#capacityValue', HTMLElement);
const approvedValue = queryRequired('#approvedValue', HTMLElement);
const remainingValue = queryRequired('#remainingValue', HTMLElement);
const availabilityValue = queryRequired('#availabilityValue', HTMLElement);
const contractOutput = queryRequired('#contractOutput', HTMLElement);
const registrationForm = queryRequired(
  '#registrationForm',
  HTMLFormElement,
);
const submitButton = queryRequired('#submitButton', HTMLButtonElement);
const resultBox = queryRequired('#resultBox', HTMLElement);

/**
 * Populates the native select from the same typed Course array used by the
 * terminal example.
 */
function renderCourseOptions(): void {
  for (const course of courseRepository.findAll()) {
    const option = document.createElement('option');
    option.value = course.id;
    option.textContent = course.title;
    courseSelect.append(option);
  }
}

/**
 * Returns the currently selected course or throws when the selection is stale.
 */
function getSelectedCourse(): Course {
  const course = courseRepository.findById(courseSelect.value);

  if (!course) {
    throw new Error('Please select an available course.');
  }

  return course;
}

/**
 * Updates all visible facts and the DTO preview whenever the selection changes.
 */
function renderSelectedCourse(): void {
  const course = getSelectedCourse();
  const remainingSeats = calculateRemainingSeats(course);
  const isAvailable = canAcceptRegistration(course);

  capacityValue.textContent = String(course.capacity);
  approvedValue.textContent = String(course.approvedEnrollments);
  remainingValue.textContent = String(remainingSeats);
  availabilityValue.textContent = isAvailable
    ? 'Registration open'
    : course.status === 'published'
      ? 'Course full'
      : 'Not published';

  availabilityValue.dataset['state'] = isAvailable ? 'open' : 'closed';
  submitButton.disabled = !isAvailable;
  submitButton.textContent = isAvailable
    ? 'Request registration'
    : 'Registration unavailable';

  /**
   * textContent safely displays JSON as text instead of interpreting it as HTML.
   */
  contractOutput.textContent = JSON.stringify(
    toCourseResponseDto(course),
    null,
    2,
  );
}

/**
 * Renders an accessible result message after the typed service finishes.
 */
function showResult(kind: 'success' | 'error', title: string, message: string): void {
  resultBox.dataset['state'] = kind;
  resultBox.replaceChildren();

  const heading = document.createElement('strong');
  heading.textContent = title;

  const paragraph = document.createElement('p');
  paragraph.textContent = message;

  resultBox.append(heading, paragraph);
  resultBox.focus();
}

/**
 * Restores the neutral message when the student chooses another course.
 */
function resetResult(): void {
  resultBox.dataset['state'] = 'idle';
  resultBox.replaceChildren();

  const heading = document.createElement('strong');
  heading.textContent = 'Ready to test';

  const paragraph = document.createElement('p');
  paragraph.className = 'mt-1 mb-0 text-sm leading-6 text-ink/65';
  paragraph.textContent = 'Choose a published course with remaining seats.';

  resultBox.append(heading, paragraph);
}

/**
 * Re-renders the selected contract and clears feedback from the previous
 * course, preventing an old success message from describing a new selection.
 */
function handleCourseChange(): void {
  renderSelectedCourse();
  resetResult();
}

/**
 * Handles the browser form while keeping business rules inside the shared
 * CourseRegistrationService.
 */
function handleRegistration(event: SubmitEvent): void {
  event.preventDefault();

  try {
    const course = getSelectedCourse();
    const result = registrationService.requestEnrollment(
      course.id,
      sampleStudent,
    );

    if (!result.ok) {
      showResult('error', 'Request not created', result.error);
      return;
    }

    showResult(
      'success',
      'Pending review',
      `Request ${result.data.id} was created for ${sampleStudent.name}.`,
    );
    submitButton.disabled = true;
    submitButton.textContent = 'Request submitted';
  } catch (error: unknown) {
    showResult('error', 'Unable to continue', formatUnknownError(error));
  }
}

renderCourseOptions();
renderSelectedCourse();
courseSelect.addEventListener('change', handleCourseChange);
registrationForm.addEventListener('submit', handleRegistration);
