# 01 — JavaScript Execution Model

These notes use the Codes Training Center course-registration workflow so the
concepts connect directly to later Express and Angular code.

## 1. Execution context

An execution context is the environment JavaScript creates to evaluate code.

- The **global execution context** is created before the file begins running.
- Every function call creates a new **function execution context**.
- A function context contains its parameters, local variables, and `this` value.
- When the function returns, its context is removed from the call stack.

```js
const course = { title: 'Angular Basics', capacity: 30, registered: 18 };

function calculateRemainingSeats(courseItem) {
  const remaining = courseItem.capacity - courseItem.registered;
  return remaining;
}

const seats = calculateRemainingSeats(course);
console.log(seats); // 12
```

In this example:

- `course`, `calculateRemainingSeats`, and `seats` belong to the global context;
- `courseItem` and `remaining` belong to the function context; and
- the number returned by the function can be stored after the function finishes.

## 2. Scope and lexical environment

Scope controls where a variable can be accessed. **Lexical scope** means access
depends on where the code was written, not where the function was called.

```js
const MAX_CAPACITY = 50;

function canCreateCourse(courseItem) {
  const hasTitle = courseItem.title.trim().length > 0;
  const hasValidCapacity =
    courseItem.capacity > 0 && courseItem.capacity <= MAX_CAPACITY;

  return hasTitle && hasValidCapacity;
}
```

- `MAX_CAPACITY` is shared configuration in the outer scope.
- `hasTitle` and `hasValidCapacity` are temporary local values.
- Code outside the function cannot accidentally overwrite those local values.
- The function exposes only the Boolean answer its caller needs.

Prefer the smallest useful scope. Local data is easier to reason about and less
likely to be changed accidentally.

## 3. Closures

A closure is created when an inner function keeps access to variables from the
scope in which it was created, even after the outer function returns.

```js
function createRegistrationCounter() {
  let count = 0;

  return function registerStudent() {
    count += 1;
    return count;
  };
}

const addRegistration = createRegistrationCounter();
console.log(addRegistration()); // 1
console.log(addRegistration()); // 2
```

The returned `registerStudent` function remembers `count`. The value is private
to that counter rather than being a global variable. Closures are useful for
controlled state and function factories, but ordinary parameters are clearer
when remembered state is not needed.

## 4. Call stack

The call stack records the active chain of function calls. JavaScript executes
the function at the top of the stack.

```js
function isValidEmail(email) {
  return email.includes('@');
}

function validateStudent(student) {
  return Boolean(student.name) && isValidEmail(student.email);
}

function submitRegistration(student) {
  if (!validateStudent(student)) {
    return 'Invalid student data';
  }

  return 'Registration accepted for review';
}
```

For `submitRegistration(student)`, the simplified call order is:

1. `submitRegistration` enters the stack.
2. It calls `validateStudent`, which enters above it.
3. `validateStudent` calls `isValidEmail`, which enters at the top.
4. Each helper returns and leaves the stack in reverse order.

An error stack trace shows a similar call chain. Begin with the first meaningful
error, then find the first file and line that belong to your own code.

## 5. Event loop

JavaScript runs synchronous code on one call stack. Browser or Node.js APIs can
handle timers and other asynchronous operations outside that stack. When the
stack is free, the event loop schedules ready work.

```js
console.log('Start registration');

setTimeout(() => {
  console.log('Send reminder later');
}, 0);

Promise.resolve().then(() => {
  console.log('Validate registration promise');
});

console.log('Show form ready');
```

Expected order:

1. `Start registration`
2. `Show form ready`
3. `Validate registration promise`
4. `Send reminder later`

The two direct `console.log` calls are synchronous. The Promise reaction is a
microtask, which runs after the current stack finishes and before the timer
callback. A delay of `0` does not mean “run immediately”; it means “be eligible
after the current work and earlier queued microtasks finish.”

## Connection to the final project

- Angular component methods run in their own function contexts.
- Component and service variables follow lexical scope rules.
- Event handlers and reusable factories can form closures.
- Express stack traces reveal which controller and helper produced an error.
- HTTP requests complete asynchronously, so the UI must wait for success or
  failure instead of showing success immediately.

## Check your understanding

Before running the event-loop example, write down the expected output. Then
answer:

1. Which values exist only inside a function context?
2. Why can the registration counter still access `count`?
3. Which function appears at the top of the stack during email validation?
4. Why does the Promise message appear before the timer message?
