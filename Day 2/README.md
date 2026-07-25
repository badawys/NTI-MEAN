# Day 2 — Advanced JavaScript & Productivity

Day 2 uses the **Codes Training Center** registration workflow to explain how
JavaScript runs, how asynchronous work is organized, how bugs are investigated,
and how AI-assisted changes are verified responsibly.

The examples are intentionally written in plain JavaScript. They do not use a
framework, database, web server, or external package. The same ideas will later
appear in Express controllers and Angular services.

## Learning outcomes

After completing this folder, you should be able to:

- explain execution context, scope, closures, the call stack, and the event loop;
- convert a callback-style workflow to Promises and `async`/`await`;
- represent useful success and failure results in a registration workflow;
- investigate a bug by documenting its symptom, root cause, fix, and regression
  checks; and
- record an AI-assisted improvement without treating AI output as automatically
  correct.

## Folder contents

| File | Purpose |
|---|---|
| [`day-02-advanced-js/01-execution-model.md`](day-02-advanced-js/01-execution-model.md) | Execution context, scope, closures, call stack, and event loop notes |
| [`day-02-advanced-js/02-async-workflow.js`](day-02-advanced-js/02-async-workflow.js) | Runnable callback, Promise, and `async`/`await` registration examples |
| [`day-02-advanced-js/index.html`](day-02-advanced-js/index.html) | Interactive browser interface using the same JavaScript functions |
| [`day-02-advanced-js/ui.js`](day-02-advanced-js/ui.js) | DOM events, UI state, and calls to the shared workflow |
| [`day-02-advanced-js/styles.css`](day-02-advanced-js/styles.css) | Responsive visual design and interface motion |
| [`day-02-advanced-js/03-debugging-notes.md`](day-02-advanced-js/03-debugging-notes.md) | Root-cause analysis for the two bugs from the presentation |
| [`day-02-advanced-js/04-ai-verification-log.md`](day-02-advanced-js/04-ai-verification-log.md) | Worked verification record and a reusable student template |

## Requirements

Install a current Node.js LTS release. No `npm install` command is needed because
the example has no third-party dependencies.

Confirm that Node.js is available:

```bash
node --version
```

## Run the example

From the repository root:

```bash
node "Day 2/day-02-advanced-js/02-async-workflow.js"
```

The script demonstrates:

1. a callback-based course lookup;
2. the same idea expressed as a Promise;
3. a successful `async`/`await` registration;
4. rejection of an invalid email;
5. rejection of a full course; and
6. rejection of a missing course.

The asynchronous messages can appear after some synchronous messages. This is
expected and is part of the event-loop lesson.

## Run the browser interface

Open
`Day 2/day-02-advanced-js/index.html`
directly in a modern browser. No server or installation is required.

The interface uses the exact functions from `02-async-workflow.js`. Try:

- registering for **Angular Basics** to see the success path;
- registering for **Node API Fundamentals** to see the full-course error;
- entering an invalid email to see validation error handling;
- comparing callback and Promise course lookups in the async activity log.

## Manual verification checklist

- The callback example prints the Angular course title.
- The Promise example reports 12 remaining seats.
- The successful registration has the status `pending_review`.
- The invalid-email scenario reports `A valid student email is required`.
- The full-course scenario reports `No seats available for this course`.
- The missing-course scenario reports `Course was not found`.
- The HTML interface works at desktop and mobile widths.
- The browser registration results match the terminal workflow results.
- You can explain why the code uses `return` when creating or forwarding a
  Promise.
- You have read and understood the debugging notes.
- You have replaced the sample AI record with your own evidence before
  submitting your work.

## Day 2 submission checklist

- Keep the four required files in `day-02-advanced-js/`.
- Explain the five execution-model concepts using Codes Training Center
  examples.
- Run the async registration simulation locally.
- Test the happy path and at least two failure paths.
- Document the root cause and regression checks for both provided bugs.
- Use AI for one small improvement, then review, test, and document the result.
- Commit the work with a clear message and push the repository to GitHub.
- Submit the repository link requested for the course.

## Important submission rule

Code must run locally, documentation must match the real files, and every
AI-assisted change must be understood and verified before submission.
