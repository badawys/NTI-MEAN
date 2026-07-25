/**
 * Codes Training Center — Day 2 asynchronous JavaScript workflow.
 *
 * Run from the repository root with:
 * node "Day 2/day-02-advanced-js/02-async-workflow.js"
 *
 * This file deliberately uses in-memory data and short timers. The timers
 * simulate database or API work without adding a server, database, framework,
 * or external package before those topics are introduced in the course.
 */

// Each object represents the small amount of course data needed by this lesson.
const courses = [
  {
    id: 'course-angular',
    title: 'Angular Basics',
    capacity: 30,
    approvedEnrollments: 18,
  },
  {
    id: 'course-node',
    title: 'Node API Fundamentals',
    capacity: 20,
    approvedEnrollments: 20,
  },
];

/**
 * Creates a fresh copy of a course after simulating delayed data access.
 *
 * The function uses the callback pattern because it belongs to the first stage
 * of the callback → Promise → async/await comparison. The first callback
 * parameter contains an Error when lookup fails. The second contains the course
 * when lookup succeeds. This "error-first callback" shape is common in Node.js.
 *
 * @param {string} courseId - Unique identifier of the requested course.
 * @param {(error: Error|null, course?: object) => void} callback - Function that
 * receives either an error or the course after the simulated lookup finishes.
 * @returns {void} The result is delivered to the callback, not returned directly.
 */
function findCourseByIdWithCallback(courseId, callback) {
  setTimeout(() => {
    // Array.find returns the first matching object or undefined.
    const course = courses.find((courseItem) => courseItem.id === courseId);

    if (!course) {
      callback(new Error('Course was not found'));
      return;
    }

    // Spreading creates a shallow copy so lesson code does not mutate source data.
    callback(null, { ...course });
  }, 50);
}

/**
 * Looks up a course and represents the future result with a Promise.
 *
 * Calling resolve settles the Promise successfully. Calling reject settles it
 * with a failure. A settled Promise cannot change its result later.
 *
 * @param {string} courseId - Unique identifier of the requested course.
 * @returns {Promise<object>} Promise that resolves with a course copy or rejects
 * with a meaningful lookup error.
 */
function findCourseById(courseId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!courseId) {
        reject(new Error('Course id is required'));
        return;
      }

      const course = courses.find((courseItem) => courseItem.id === courseId);

      if (!course) {
        reject(new Error('Course was not found'));
        return;
      }

      resolve({ ...course });
    }, 50);
  });
}

/**
 * Calculates seats from capacity and approved enrollments.
 *
 * Only approved enrollments consume a seat in this simplified business rule.
 * Math.max prevents an invalid overbooked record from displaying a negative
 * number of remaining seats.
 *
 * @param {{ capacity: number, approvedEnrollments: number }} course - Course
 * values required by the calculation.
 * @returns {number} Remaining seats, with a minimum displayed value of zero.
 */
function calculateRemainingSeats(course) {
  return Math.max(course.capacity - course.approvedEnrollments, 0);
}

/**
 * Returns safe copies of every course for a terminal or browser interface.
 *
 * Returning copies prevents interface code from changing the lesson's original
 * in-memory records. Later in the course, an API endpoint will provide this
 * boundary between stored data and the user interface.
 *
 * @returns {Array<object>} New array containing a shallow copy of each course.
 */
function getCourses() {
  return courses.map((course) => ({ ...course }));
}

/**
 * Throws when the course cannot accept another approved enrollment.
 *
 * Throwing stops the current success path. The surrounding async function will
 * catch this Error and convert it into useful registration feedback.
 *
 * @param {{ capacity: number, approvedEnrollments: number }} course - Selected
 * course to check.
 * @returns {true} True when at least one seat remains.
 * @throws {Error} When the course has no remaining seat.
 */
function ensureSeatAvailable(course) {
  if (calculateRemainingSeats(course) <= 0) {
    throw new Error('No seats available for this course');
  }

  return true;
}

/**
 * Normalizes and validates the student data used by this Day 2 simulation.
 *
 * The returned object is new, so validation does not mutate the caller's input.
 * The email rule is intentionally small because full production validation is
 * outside this lesson. It is enough to demonstrate a failure path.
 *
 * @param {{ name?: string, email?: string }} student - Untrusted form-like data.
 * @returns {{ name: string, email: string }} Clean student data.
 * @throws {Error} When the name or a simple email shape is missing.
 */
function validateStudent(student) {
  const name = student?.name?.trim() ?? '';
  const email = student?.email?.trim().toLowerCase() ?? '';

  if (!name) {
    throw new Error('Student name is required');
  }

  if (!email.includes('@')) {
    throw new Error('A valid student email is required');
  }

  return { name, email };
}

/**
 * Registers one student using Promise chaining.
 *
 * Every arrow function returns its value so the next `.then` receives it.
 * Returning the entire chain also allows the caller to await completion.
 *
 * @param {string} courseId - Selected course identifier.
 * @param {{ name?: string, email?: string }} student - Registration input.
 * @returns {Promise<object>} Promise resolving to a pending registration.
 */
function registerStudentWithPromises(courseId, student) {
  return findCourseById(courseId).then((course) => {
    const validStudent = validateStudent(student);
    ensureSeatAvailable(course);

    return {
      id: `registration-${course.id}`,
      status: 'pending_review',
      student: validStudent,
      courseId: course.id,
      remainingSeatsBeforeApproval: calculateRemainingSeats(course),
    };
  });
}

/**
 * Registers one student using async/await and returns UI-friendly feedback.
 *
 * `await` pauses only this async function while the Promise settles; it does not
 * block the JavaScript runtime. The catch block handles lookup, validation, and
 * seat-rule errors in one place.
 *
 * @param {string} courseId - Selected course identifier.
 * @param {{ name?: string, email?: string }} student - Registration input.
 * @returns {Promise<object>} Success or failure feedback suitable for a UI.
 */
async function registerStudent(courseId, student) {
  try {
    const course = await findCourseById(courseId);
    const validStudent = validateStudent(student);
    ensureSeatAvailable(course);

    return {
      status: 'success',
      message: 'Registration received. Admin will review it.',
      registration: {
        id: `registration-${course.id}`,
        status: 'pending_review',
        student: validStudent,
        courseId: course.id,
      },
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message,
    };
  }
}

/**
 * Prints one labeled scenario in a predictable, readable format.
 *
 * @param {string} label - Human-readable scenario name.
 * @param {unknown} result - Value returned by the scenario.
 * @returns {void}
 */
function printScenario(label, result) {
  console.log(`\n${label}`);
  console.log(JSON.stringify(result, null, 2));
}

/**
 * Runs the Day 2 demonstrations in sequence.
 *
 * Keeping orchestration in one async function makes the order explicit and
 * gives one final catch handler a place to report an unexpected programming
 * error. Expected business failures remain ordinary result objects.
 *
 * @returns {Promise<void>} Promise that settles after every example finishes.
 */
async function runDemonstration() {
  console.log('Codes Training Center — Day 2 async workflow');

  // This message prints after the callback's timer completes.
  findCourseByIdWithCallback('course-angular', (error, course) => {
    if (error) {
      console.error('Callback lookup failed:', error.message);
      return;
    }

    console.log(`Callback lookup: ${course.title}`);
  });

  // This chain demonstrates why returning a Promise is important to the caller.
  await findCourseById('course-angular')
    .then((course) => {
      const remainingSeats = calculateRemainingSeats(course);
      console.log(`Promise lookup: ${remainingSeats} remaining seats`);
    })
    .catch((error) => {
      console.error('Promise lookup failed:', error.message);
    });

  const promiseRegistration = await registerStudentWithPromises(
    'course-angular',
    { name: 'Mona Ali', email: 'MONA@EXAMPLE.COM' },
  );
  printScenario('Promise registration succeeds', promiseRegistration);

  const successfulResult = await registerStudent('course-angular', {
    name: '  Omar Hassan  ',
    email: '  OMAR@EXAMPLE.COM  ',
  });
  printScenario('async/await registration succeeds', successfulResult);

  const invalidEmailResult = await registerStudent('course-angular', {
    name: 'Salma',
    email: 'invalid-email',
  });
  printScenario('Invalid email is rejected', invalidEmailResult);

  const fullCourseResult = await registerStudent('course-node', {
    name: 'Youssef',
    email: 'youssef@example.com',
  });
  printScenario('Full course is rejected', fullCourseResult);

  const missingCourseResult = await registerStudent('course-missing', {
    name: 'Nour',
    email: 'nour@example.com',
  });
  printScenario('Missing course is rejected', missingCourseResult);
}

/**
 * One public object exposes the same lesson functions to both environments:
 *
 * - Node.js receives the object through `module.exports`.
 * - The browser receives it through `window.CodesDay2`.
 *
 * This avoids copying business rules into the HTML interface. The terminal and
 * browser examples therefore run the same lookup, validation, seat calculation,
 * Promise, and async/await functions.
 */
const CodesDay2 = Object.freeze({
  calculateRemainingSeats,
  ensureSeatAvailable,
  findCourseById,
  findCourseByIdWithCallback,
  getCourses,
  registerStudent,
  registerStudentWithPromises,
  runDemonstration,
  validateStudent,
});

// CommonJS exists when this file runs in Node.js. Exporting the object also makes
// the functions available to future automated tests without running the demo.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CodesDay2;

  // `require.main === module` is true only when the student runs this file
  // directly. It is false when another Node.js file imports the functions.
  if (require.main === module) {
    runDemonstration().catch((error) => {
      console.error('Unexpected demonstration failure:', error);
      process.exitCode = 1;
    });
  }
}

// `window` exists in a browser. The UI script reads this one global namespace
// instead of depending on many unrelated global variables.
if (typeof window !== 'undefined') {
  window.CodesDay2 = CodesDay2;
}
