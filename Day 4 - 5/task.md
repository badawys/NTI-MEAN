Here is a simple in-session task based on the same ideas:

## Task: Add a Course Availability Report

Create a new file:

```text
src/course-availability.ts
```

Implement a function that reports whether a course can accept students.

### Requirements

1. Import `Course` from `models/course.types.ts`.
2. Import the generic `ApiResult<T>`.
3. Create this union type:

```ts
type Availability = 'open' | 'full' | 'unavailable';
```

4. Create this interface:

```ts
interface CourseAvailability {
  courseId: string;
  remainingSeats: number;
  availability: Availability;
}
```

5. Implement:

```ts
function getCourseAvailability(
  course: Course,
): ApiResult<CourseAvailability>
```

Rules:

- A `draft` or `archived` course returns a failure result.
- A published course with no remaining seats returns a failure result.
- A published course with available seats returns a success result.
- Remaining seats must never be negative.

6. Update `src/index.ts` to test:

- Angular Basics: published with available seats
- A full published course
- A draft course

7. Use `if (result.success)` to safely access either `data` or `error`.