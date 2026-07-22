# Codes Training Center

Codes Training Center is a deliberately small, portfolio-ready MEAN-stack course registration system. Visitors browse published courses, students create accounts and register, admins manage courses and enrollment decisions, and managers see operational summaries. It replaces manual registration sheets with one clear, mobile-friendly workflow.

> **60-second pitch:** Training centers lose time when course information and student registrations are scattered across messages and spreadsheets. Codes Training Center gives visitors a fast course catalog, gives students a trackable registration, and gives staff a focused follow-up workflow. The project demonstrates MongoDB, Express, Angular 22, Node.js, TypeScript, Tailwind CSS, REST, validation, JWT authentication, RBAC, responsive UI, and project documentation without adding features outside the 14-day course.

## What is included

- Public home, course list, and course detail pages.
- Student registration/login and “My registrations” status tracking.
- Self-service profile updates for name, email, and password.
- Admin course create, edit, publish, draft, and archive workflows.
- Admin enrollment review; manager read-only review and summary access.
- Express 5 REST API with controllers, routers, middleware, Zod validation, centralized errors, rate limiting, CORS, and Helmet.
- MongoDB/Mongoose models for `User`, `Course`, and `Enrollment`.
- JWT authentication, bcrypt password hashing, role-based API middleware, Angular guards, and an HTTP interceptor.
- Responsive Tailwind CSS 4 UI with English/Arabic labels and automatic LTR/RTL direction.
- Seed data, detailed learning comments, Day 1 assignment materials, and a developer-focused wiki.

Out of scope by design: payments, certificates, email/SMS delivery, analytics platforms, file uploads, password reset email, and production hosting automation.

## Technology versions

| Layer | Technology |
|---|---|
| Database | MongoDB Community 8.0 + Mongoose 9 |
| API | Node.js 24, Express 5, TypeScript 7 |
| Web | Angular 22 standalone components, TypeScript, RxJS |
| Styling | Tailwind CSS 4 + custom design tokens |
| Security | JWT, bcryptjs, Zod, Helmet, CORS, rate limiting |

Angular 22 requires Node.js `22.22.3`, `24.15.0`, or a newer supported release. This repository recommends Node.js `24.15.0` and declares the minimum supported version in the root `package.json`.

## Repository map

```text
Final Project/
├── client/                 Angular 22 + Tailwind browser application
├── server/                 Express + MongoDB REST API
├── wiki/                   Detailed setup and developer documentation
├── package.json            Workspace commands
└── README.md               Project overview and quick start
```

## Fast start

After completing the setup guide for your operating system, open a terminal and run:

```bash
cd "/path/to/course-repository/Final Project"
cp server/.env.example server/.env
npm install
npm run seed
npm run dev
```

Open `http://localhost:4200`. The API health endpoint is `http://localhost:3000/api/health`.

If NVM selects an older Node.js version, run:

```bash
nvm use 24.15.0
```

## Demo accounts

Run `npm run seed` before using these accounts. All three use password `Password123!`.

| Role | Email | What you can practice |
|---|---|---|
| Student | `student@codes.test` | Browse, register, track status |
| Admin | `admin@codes.test` | Dashboard, course CRUD, enrollment decisions |
| Manager | `manager@codes.test` | Read-only dashboard and registration review |

These credentials are sample data only. Never reuse them in a deployed system.

## Commands

```bash
npm run dev          # Angular on :4200 and API on :3000
npm run build        # Production builds for server and client
npm run seed         # Recreate predictable sample database data
npm run start:api    # API only, with TypeScript watch mode
npm run start:web    # Angular only
npm test --workspace client  # Angular unit tests
```

## Postman API collection

Import both files from the [`postman/`](postman/) folder into Postman:

- `Codes Training Center API.postman_collection.json`
- `Codes Training Center API.postman_environment.json`

Select **Codes Training Center - Local**, then prepare and start the API:

```bash
npm run seed
npm run start:api
```

Run the collection in its saved order. It covers every backend route and
automatically stores student/admin/manager JWTs, course IDs, and enrollment IDs.
The workflow creates a disposable student and temporary course, so run
`npm run seed` afterward whenever you want to restore the original sample data.

## Environment configuration

Copy `server/.env.example` to `server/.env`:

```dotenv
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/codes_training_center
JWT_SECRET=replace-this-with-a-long-random-value
CLIENT_ORIGIN=http://localhost:4200
```

- `PORT` is the Express HTTP port.
- `MONGODB_URI` selects the database. Use a separate database for any non-course data.
- `JWT_SECRET` signs authentication tokens. Generate a strong secret before deployment.
- `CLIENT_ORIGIN` is the one browser origin allowed by CORS.

The development defaults let a beginner start quickly, but a production deployment must provide a private `JWT_SECRET` and an appropriately secured MongoDB connection.

## Suggested learning walkthrough

1. Start MongoDB, seed the database, and run both apps.
2. Open the catalog as a visitor and switch between EN/AR to show shared translations and RTL.
3. Sign in as the student and register for a published course.
4. Sign in as the admin, confirm the new enrollment, and create a bilingual draft course.
5. Publish that course and confirm it appears in the public catalog.
6. Trace one request from Angular component → service → interceptor → Express route → middleware → controller → Mongoose model → MongoDB.

## Documentation

- [Wiki home](wiki/Home.md)
- [Windows setup](wiki/Windows-Setup.md)
- [Linux setup](wiki/Linux-Setup.md)
- [macOS setup](wiki/macOS-Setup.md)
- [Architecture](wiki/Architecture.md)
- [Data model](wiki/Data-Model.md)
- [API reference](wiki/API-Reference.md)
- [Security and limitations](wiki/Security.md)
- [Testing and verification](wiki/Testing.md)
- [Troubleshooting](wiki/Troubleshooting.md)
- [Day 1 assignment](<../Day 1/README.md>)

## Learning notes

Code comments explain each project-owned function/method and the reason it exists. Comments focus on concepts students need in this course: responsibilities, inputs, outputs, async flow, middleware order, validation, security boundaries, and UI state. Generated framework configuration and dependency files remain close to standard Angular/npm output so learners can compare this repository with a fresh project.

## License

This repository is course material for learning how to build and explain a MEAN-stack application. Do not republish it without permission from the copyright owner.
