// querySelector connects JavaScript variables to elements already in the HTML.
const form = document.querySelector('#registrationForm');
const nameInput = document.querySelector('#studentName');
const emailInput = document.querySelector('#email');
const courseInput = document.querySelector('#course');
const message = document.querySelector('#message');
const preview = document.querySelector('#preview');

/**
 * Reads current inputs and creates one plain object.
 * Later in the course, Angular will create typed data and send it to Express.
 */
function createEnrollmentFromForm() {
  return {
    studentName: nameInput.value.trim(),
    email: emailInput.value.trim().toLowerCase(),
    course: courseInput.value,
    status: 'pending',
  };
}

/** Uses built-in browser rules and returns one clear true/false result. */
function isFormValid() {
  return form.checkValidity();
}

/**
 * Handles submit without reloading the page. It validates, creates the object,
 * then uses textContent so student-entered values are never treated as HTML.
 */
function handleRegistrationSubmit(event) {
  event.preventDefault();

  if (!isFormValid()) {
    message.textContent = 'Please complete every field with valid data.';
    form.reportValidity();
    return;
  }

  const enrollment = createEnrollmentFromForm();
  message.textContent = 'Registration saved locally for the Day 1 demo.';
  preview.textContent = JSON.stringify(enrollment, null, 2);
}

// An event listener runs the named function only when the user submits.
form.addEventListener('submit', handleRegistrationSubmit);
