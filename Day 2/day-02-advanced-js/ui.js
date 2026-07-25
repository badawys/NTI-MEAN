/**
 * Codes Training Center — Day 2 browser interface.
 *
 * This file contains only browser responsibilities: reading form fields,
 * changing UI state, and rendering results. All registration business logic
 * comes from `02-async-workflow.js` through the shared `window.CodesDay2`
 * object.
 */

// Keep the shared functions under one namespace. Besides showing clearly where
// business logic comes from, this avoids declaring browser-global function names
// that already exist in the shared classic script.
const day2Workflow = window.CodesDay2;

// Cache DOM references once so every event handler can reuse the same elements.
const registrationForm = document.querySelector('#registrationForm');
const courseSelect = document.querySelector('#course');
const nameInput = document.querySelector('#studentName');
const emailInput = document.querySelector('#studentEmail');
const capacityValue = document.querySelector('#capacityValue');
const remainingValue = document.querySelector('#remainingValue');
const submitButton = document.querySelector('#submitButton');
const registrationResult = document.querySelector('#registrationResult');
const comparisonButton = document.querySelector('#runComparisonButton');
const activityLog = document.querySelector('#activityLog');

/**
 * Populates the course select from the shared in-memory course collection.
 *
 * @returns {void}
 */
function renderCourseOptions() {
  courseSelect.replaceChildren();

  day2Workflow.getCourses().forEach((course) => {
    const option = document.createElement('option');
    option.value = course.id;
    option.textContent = course.title;
    courseSelect.append(option);
  });
}

/**
 * Displays full capacity and remaining seats for the selected course.
 *
 * The calculation is imported from the terminal example, so the browser does
 * not contain a second copy of the seat business rule.
 *
 * @returns {void}
 */
function renderSelectedCourseFacts() {
  const selectedCourse = day2Workflow.getCourses().find(
    (course) => course.id === courseSelect.value,
  );

  capacityValue.textContent = selectedCourse?.capacity ?? '—';
  remainingValue.textContent = selectedCourse
    ? day2Workflow.calculateRemainingSeats(selectedCourse)
    : '—';
}

/**
 * Replaces the registration feedback content and its visual state.
 *
 * @param {'idle'|'loading'|'success'|'error'} state - Result presentation state.
 * @param {string} title - Short result heading.
 * @param {string} message - Helpful result explanation.
 * @returns {void}
 */
function renderResult(state, title, message) {
  // Replacing the class triggers the small state transition defined in CSS.
  registrationResult.className = `result result-${state}`;

  // Rebuild the fixed result structure, then write all variable values with
  // textContent so form or error values are never interpreted as HTML.
  registrationResult.innerHTML = `
    <span class="result-dot" aria-hidden="true"></span>
    <div>
      <strong></strong>
      <p></p>
    </div>
  `;
  registrationResult.querySelector('strong').textContent = title;
  registrationResult.querySelector('p').textContent = message;
}

/**
 * Handles the registration form with the shared async/await workflow.
 *
 * @param {SubmitEvent} event - Browser form submission event.
 * @returns {Promise<void>} Settles after the registration result is rendered.
 */
async function handleRegistrationSubmit(event) {
  event.preventDefault();
  submitButton.disabled = true;
  renderResult(
    'loading',
    'Submitting your registration…',
    'The Promise is waiting for the simulated course lookup.',
  );

  const result = await day2Workflow.registerStudent(courseSelect.value, {
    name: nameInput.value,
    email: emailInput.value,
  });

  if (result.status === 'success') {
    renderResult(
      'success',
      'Registration received',
      result.message,
    );
    registrationForm.reset();
    renderSelectedCourseFacts();
  } else {
    renderResult(
      'error',
      'Registration not completed',
      result.message,
    );
  }

  submitButton.disabled = false;
}

/**
 * Adds one numbered entry to the asynchronous activity log.
 *
 * @param {string} message - Activity description to display.
 * @returns {void}
 */
function appendActivity(message) {
  const item = document.createElement('li');
  item.dataset.index = String(activityLog.children.length + 1).padStart(2, '0');
  item.textContent = message;
  activityLog.append(item);
}

/**
 * Runs callback and Promise lookups against the same selected course.
 *
 * Both shared functions use a timer. Their completion messages arrive later,
 * making the difference between starting async work and receiving its result
 * visible without adding a server.
 *
 * @returns {void}
 */
function handleComparisonRun() {
  comparisonButton.disabled = true;
  activityLog.replaceChildren();
  appendActivity('Both delayed lookups started');

  day2Workflow.findCourseByIdWithCallback(courseSelect.value, (error, course) => {
    const message = error
      ? error.message
      : `Callback completed: ${course.title}`;
    appendActivity(message);
  });

  day2Workflow.findCourseById(courseSelect.value)
    .then((course) => {
      const remainingSeats = day2Workflow.calculateRemainingSeats(course);
      appendActivity(`Promise completed: ${remainingSeats} remaining seats`);
    })
    .catch((error) => {
      appendActivity(error.message);
    })
    .finally(() => {
      comparisonButton.disabled = false;
    });
}

// Register browser events after all referenced elements and functions exist.
courseSelect.addEventListener('change', renderSelectedCourseFacts);
registrationForm.addEventListener('submit', handleRegistrationSubmit);
comparisonButton.addEventListener('click', handleComparisonRun);

// Render initial course data once when the deferred scripts finish loading.
renderCourseOptions();
renderSelectedCourseFacts();
