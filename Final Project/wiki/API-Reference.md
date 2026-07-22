# API Reference

Base URL: `http://localhost:3000/api`. JSON request bodies require `Content-Type: application/json`. Protected endpoints require `Authorization: Bearer <token>`.

## Health

| Method | Path | Access | Result |
|---|---|---|---|
| GET | `/health` | Public | Service status |

## Authentication

| Method | Path | Access | Body |
|---|---|---|---|
| POST | `/auth/register` | Public | `{ name, email, password }` |
| POST | `/auth/login` | Public | `{ email, password }` |
| GET | `/auth/me` | Authenticated | — |
| PATCH | `/auth/me` | Authenticated | `{ name?, email?, currentPassword?, newPassword? }` |

Register/login returns `{ token, user }`. Passwords require at least 8 characters during registration.
Profile password changes require both `currentPassword` and `newPassword`.

## Courses

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/courses` | Public | Published, non-archived list |
| GET | `/courses/:id` | Public | One published, non-archived course |
| GET | `/courses/admin` | Admin | All courses including drafts/archive |
| POST | `/courses` | Admin | Create bilingual course |
| PATCH | `/courses/:id` | Admin | Edit supplied fields |
| DELETE | `/courses/:id` | Admin | Archive and unpublish (not hard delete) |
| PATCH | `/courses/:id/unarchive` | Admin | Restore an archived course as a draft |

Course write body fields: `titleEn`, `titleAr`, `summaryEn`, `summaryAr`, `durationHours`, `capacity`, `level`, and `published`.

The public course-details response also includes `confirmedEnrollments` and
`remainingSeats`. Remaining seats equals total capacity minus confirmed enrollments;
pending and cancelled requests do not consume displayed capacity.

## Enrollments and dashboard

| Method | Path | Access | Purpose |
|---|---|---|---|
| POST | `/enrollments` | Student | Register using `{ courseId }` |
| GET | `/enrollments/mine` | Student | Own records only |
| GET | `/enrollments/admin` | Admin/Manager | Populated review list |
| GET | `/enrollments/summary` | Admin/Manager | Four dashboard counts |
| PATCH | `/enrollments/:id` | Admin | Set `{ status }` |

## Status conventions

- `200`: successful read/update.
- `201`: new user, course, or enrollment created.
- `400`: invalid body or identifier.
- `401`: missing, invalid, or expired JWT.
- `403`: authenticated role lacks permission.
- `404`: route/resource unavailable.
- `409`: duplicate email/enrollment or full capacity.
- `500`: unexpected server error; details remain in the server console.
