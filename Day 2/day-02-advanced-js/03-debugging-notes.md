# 03 — Debugging Notes

Professional debugging is a repeatable process:

1. reproduce the problem;
2. read the complete error or incorrect output;
3. identify the smallest input and code path that reproduce it;
4. compare expected and actual values;
5. change one thing;
6. verify the happy path and edge cases; and
7. record the root cause and regression checks.

## Bug 1 — Available seats calculation

### Provided code

```js
const course = { capacity: 30, registered: 18 };

function hasAvailableSeats(courseItem) {
  return courseItem.registered - courseItem.capacity > 0;
}
```

### Root-cause record

| Question | Finding |
|---|---|
| Symptom | A course with 12 remaining seats is reported as full. |
| Expected result | `hasAvailableSeats({ capacity: 30, registered: 18 })` should return `true`. |
| Actual result | `18 - 30` is `-12`, and `-12 > 0` is `false`. |
| Root cause | The subtraction order is reversed. |
| Impact | Students can be prevented from registering for an available course. |
| Smallest safe fix | Calculate `capacity - registered` and check whether the result is greater than zero. |

### Corrected code

```js
function hasAvailableSeats(courseItem) {
  const remainingSeats = courseItem.capacity - courseItem.registered;
  return remainingSeats > 0;
}
```

### Regression checks

| Input | Expected |
|---|---|
| `{ capacity: 30, registered: 18 }` | `true` |
| `{ capacity: 30, registered: 30 }` | `false` |
| `{ capacity: 30, registered: 31 }` | `false` |

The overbooked check matters even if the application should prevent
overbooking. Existing or imported data can still be invalid, and the function
must not report that another seat is available.

## Bug 2 — Missing return in a Promise chain

### Provided code

```js
function validateAndSave(student) {
  validateStudentAsync(student)
    .then(() => saveRegistration(student))
    .then((result) => console.log('Saved:', result.id))
    .catch((error) => console.error(error.message));
}

const result = validateAndSave({
  name: 'Mona',
  email: 'mona@example.com',
});

console.log(result); // undefined
```

### Root-cause record

| Question | Finding |
|---|---|
| Symptom | The caller receives `undefined` and cannot wait for saving to finish. |
| Expected result | The caller should receive a Promise representing validation and saving. |
| Actual result | The function reaches its end without returning a value. |
| Root cause | The Promise chain is created but not returned. |
| Impact | Calling code may show success too early and cannot handle rejection reliably. |
| Smallest safe fix | Add `return` before `validateStudentAsync(student)`. |

### Corrected Promise-chain version

```js
function validateAndSave(student) {
  return validateStudentAsync(student)
    .then(() => saveRegistration(student))
    .then((result) => {
      console.log('Saved:', result.id);
      return result;
    });
}
```

The last callback also returns `result`. Without that second return, the chain
would settle successfully with `undefined`, even though the outer Promise itself
is now returned.

### Clear `async`/`await` version

```js
async function validateAndSave(student) {
  await validateStudentAsync(student);
  const result = await saveRegistration(student);
  console.log('Saved:', result.id);
  return result;
}
```

### Regression checks

- Valid data resolves with the saved registration object.
- Invalid data rejects with the validation error.
- A save failure rejects and can be handled by the caller.
- No success message appears before saving finishes.

## Solution comparison

The one-line `return` fix is the smallest safe correction. The `async`/`await`
version can be easier for a beginner to read, but changing syntax is not required
to fix the root cause. Prefer the smallest change that solves the bug cleanly,
then refactor only when the refactor improves understanding or maintenance.

## Debugging worksheet

Use this table for a new issue:

| Field | Your evidence |
|---|---|
| Triggering action | |
| Smallest reproducing input | |
| Expected output | |
| Actual output/error | |
| Relevant file and line | |
| Root cause | |
| Smallest safe fix | |
| Happy-path check | |
| Error-path check 1 | |
| Error-path check 2 | |
