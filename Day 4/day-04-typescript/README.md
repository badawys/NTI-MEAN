# Day 4 — Advanced TypeScript Techniques

This project turns the Codes Training Center entities into strict TypeScript
models, helpers, DTOs, services, and generic data-access contracts. It includes
a terminal demonstration and a browser interface powered by the same compiled
TypeScript code.

For a compact, file-by-file version of the same concepts, open the sibling
[complete session demo](../day-04-typescript-session-demo/README.md). It keeps
the domain models, derived DTOs, generic result, service rules, and entry point
in separate folders so the complete workflow can be read in one sitting.

## Learning outcomes

After completing this project, you should be able to:

- explain the difference between compile-time checking and runtime validation;
- use primitive types, arrays, tuples, objects, inference, `unknown`, `void`,
  and `never`;
- write typed parameters, return values, optional parameters, and default
  parameters;
- create literal unions, type aliases, interfaces, optional properties, and
  readonly properties;
- model Course, User, and Enrollment data;
- use classes, access modifiers, and composition;
- write generics such as `ApiResult<T>` and `Repository<T>`;
- derive useful contracts with `Pick`, `Omit`, and `Partial`;
- organize TypeScript with ES modules and strict compiler settings;
- read TypeScript errors instead of hiding them with `any`; and
- describe how typed contracts support Angular, Express, and Mongoose.

## Folder map

```text
day-04-typescript/
├── index.html
├── package.json
├── tsconfig.json
└── src/
    ├── api-result.ts
    ├── class-examples.ts
    ├── course-service.ts
    ├── dtos.ts
    ├── fixtures.ts
    ├── helpers.ts
    ├── main.ts
    ├── models.ts
    ├── repository.ts
    ├── self-check.ts
    ├── type-basics.ts
    └── ui.ts
```

## What each source file teaches

| File | Main concepts |
|---|---|
| `type-basics.ts` | Primitives, arrays, tuples, objects, inference, `any`, `unknown`, enums, and typed functions |
| `models.ts` | Literal unions, aliases, interfaces, indexed types, optional and readonly properties, and tuples |
| `fixtures.ts` | Object types, arrays, inference, `satisfies`, and runtime `Date` values |
| `helpers.ts` | Typed functions, `Pick`, narrowing, predicates, `unknown`, `void`, and `never` |
| `api-result.ts` | Generics and discriminated unions |
| `repository.ts` | Generic constraints, classes, interfaces, and private state |
| `class-examples.ts` | Public, protected, and private members, inheritance, getters, and controlled state changes |
| `course-service.ts` | Composition, access modifiers, domain rules, and typed results |
| `dtos.ts` | API contracts, `Pick`, `Omit`, `Partial`, and interface extension |
| `main.ts` | Runnable terminal workflow that connects the examples |
| `self-check.ts` | Small repeatable checks for domain rules |
| `ui.ts` | Typed DOM access, browser events, state updates, and shared services |

## Requirements

Install a current Node.js release that can run TypeScript 6. The repository's
Angular 22 final project uses the same TypeScript major version.

Check the installed tools:

```bash
node --version
npm --version
```

## Install

Open a terminal in `Day 4/day-04-typescript`, then run:

```bash
npm install
```

The command installs only TypeScript and the small local preview server.

## Build the TypeScript

```bash
npm run build
```

The compiler reads `src/**/*.ts`, applies the strict settings in
`tsconfig.json`, and writes JavaScript into `dist/`.

If the compiler reports an error, read the file name, line number, expected
type, and received type before changing the code. Do not replace a useful type
with `any` simply to make the message disappear.

## Run the terminal demonstration

```bash
npm run demo
```

The program:

1. builds typed course summaries;
2. calculates remaining seats from approved enrollments;
3. maps a Course model to a response DTO;
4. creates a pending enrollment through a composed service;
5. updates an immutable enrollment object; and
6. validates an `unknown` external value at runtime.

## Run the automated self-checks

```bash
npm run check
```

The checks confirm that:

- Angular Foundations has 12 remaining seats;
- a published course with seats accepts requests;
- a full course rejects requests;
- runtime course ID validation works; and
- a new enrollment starts with the `pending` status.

## Run the browser lab

```bash
npm run preview
```

Open `http://localhost:4174` in a browser.

Try these cases:

- **Angular Foundations:** registration is open and the request succeeds.
- **Node API Fundamentals:** the full course disables registration.
- **MongoDB Basics:** the draft course is not available even though it has
  physical capacity.

The page loads Tailwind CSS from jsDelivr, so an internet connection is required
for its classroom styling. The compiled TypeScript behavior is local.

## Compile-time types versus runtime validation

TypeScript checks source code while the project is being built. Its types are
not present in the generated JavaScript.

Data from forms, APIs, environment variables, and MongoDB still arrives at
runtime. Validate that data before trusting it. The `readCourseId()` function
demonstrates this boundary by accepting `unknown` and returning a string only
after runtime checks pass.

## How this connects to MEAN

- **MongoDB/Mongoose:** TypeScript describes code-facing shapes; a Mongoose
  schema validates database values at runtime.
- **Express:** controllers, request DTOs, response DTOs, services, and
  repositories use typed contracts.
- **Angular 22:** components, services, routes, forms, and HTTP responses are
  written in TypeScript.
- **Node.js:** the compiled ES modules run the terminal demonstration and later
  backend code.

## Practice tasks

1. Add an `archivedAt?: Date` property that is allowed only in an archived
   course view model.
2. Add a `manager` result to a function that narrows `UserRole`.
3. Create `EnrollmentListItemDto` using `Pick`.
4. Add a repository method that filters courses by `CourseLevel`.
5. Add a self-check proving that approved enrollments cannot produce a negative
   remaining-seat value.
6. Explain why changing `unknown` to `any` in `readCourseId()` would remove a
   useful safety check.

## Submission checklist

- Keep strict mode enabled.
- Include typed Course, User, and Enrollment models.
- Use literal unions for roles, statuses, and levels.
- Include a generic `ApiResult<T>` and `Repository<T>`.
- Use at least two utility types.
- Run `npm run build`, `npm run check`, and `npm run demo`.
- Test all three browser-lab course states.
- Explain one compiler error you encountered and how you fixed it.
- Commit the Day 4 work with a clear Git message and push it to GitHub.

## Submission rule

Every type must answer a practical question about the data. Code must compile,
checks must pass, and runtime input must not be trusted merely because a
TypeScript interface exists.
