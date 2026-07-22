# Architecture

## Request flow

```text
Angular component
  → Angular service (typed HTTP call)
  → JWT interceptor
  → Express route
  → authentication / role / validation middleware
  → controller business workflow
  → Mongoose model
  → MongoDB collection
  → JSON response returns through the same layers
```

## Front end

The Angular 22 application uses standalone components and lazy-loaded routes. `core/` contains code shared across features:

- `api.models.ts`: TypeScript contracts for responses.
- `translation.service.ts`: EN/AR dictionary, persisted language, and LTR/RTL direction.
- `auth.service.ts`: login, registration, session persistence, and logout.
- `auth.interceptor.ts`: adds the JWT `Authorization` header.
- `route.guards.ts`: prevents navigation to pages the current role cannot use.
- `course.service.ts` and `enrollment.service.ts`: isolate HTTP details from components.

`features/` is organized by user workflow: home, auth, courses, enrollments, and admin. Components use Angular signals for view state and reactive forms for validated input.

Tailwind CSS provides low-level utilities. `styles.css` defines the project’s cream/ink/coral/mint visual language and a few semantic utility compositions. The public hero uses staged motion; `prefers-reduced-motion` removes it for users who request reduced motion.

## Back end

The Express application is split by responsibility:

- `routes/` maps URL + HTTP method to middleware and controller.
- `middleware/` handles authentication, RBAC, Zod validation, and errors.
- `controllers/` coordinates workflow and chooses HTTP responses.
- `models/` defines MongoDB documents, validation, relationships, and indexes.
- `config/` owns environment values and the database connection.
- `scripts/seed.ts` creates predictable demo records.

`app.ts` builds Express separately from `server.ts`, which connects MongoDB and listens. This separation makes future integration testing easier.

## Deliberate simplifications

- The API URL is fixed to localhost in Angular services for learning clarity. A deployment exercise should move it to Angular environments.
- The MVP uses access tokens in local storage. The security wiki explains the production trade-off.
- Course capacity uses a count followed by create; a high-volume production system would need transaction/atomic capacity enforcement.
- There is no state library. Signals and finite HttpClient requests are enough for these flows.
