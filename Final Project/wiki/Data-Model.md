# Data Model

## User

| Field | Type | Rules |
|---|---|---|
| `name` | string | Required, trimmed, minimum 2 characters |
| `email` | string | Required, normalized lowercase, unique |
| `passwordHash` | string | Required, excluded from normal queries |
| `role` | enum | `student`, `admin`, or `manager` |

Public registration always creates a `student`. Only trusted seed/admin tooling should assign staff roles.

## Course

| Field | Type | Purpose |
|---|---|---|
| `titleEn`, `titleAr` | string | Bilingual catalog title |
| `summaryEn`, `summaryAr` | string | Bilingual course explanation |
| `durationHours` | number | Positive instructional duration |
| `capacity` | number | Maximum non-cancelled registrations |
| `level` | enum | `Beginner` or `Intermediate` |
| `published` | boolean | Visible in the public catalog |
| `archived` | boolean | Hidden without losing historical relationships |

## Enrollment

| Field | Type | Purpose |
|---|---|---|
| `student` | ObjectId → User | The student who submitted registration |
| `course` | ObjectId → Course | The selected course |
| `status` | enum | `pending`, `confirmed`, or `cancelled` |

A unique compound index on `(student, course)` prevents duplicate registrations. `populate()` supplies readable names/titles in admin and student responses.

## Relationships

```text
User (student) 1 ─── * Enrollment * ─── 1 Course
```

Enrollment is its own entity because the relationship has data—status and timestamps—that does not belong inside either User or Course.
