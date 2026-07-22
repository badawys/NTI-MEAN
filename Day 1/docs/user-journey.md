# Codes Training Center — Users, Pages, and Journey

## Public journey

```text
Home → Course list → Course details → Login/Create account → Register → Confirmation
```

Pages: Home, Course List, Course Details, Login, Create Account.

## Student journey

```text
Login → Browse/choose course → Register → My Registrations → Read status
```

Pages: Course List, Course Details, My Registrations, Profile/session controls.

## Admin journey

```text
Login → Dashboard → Manage Courses / Review Enrollments → Save decision
```

Pages: Dashboard, Manage Courses, Review Enrollments.

## Manager journey

```text
Login → Dashboard → Review summaries and enrollment list
```

The manager does not change courses or statuses. This boundary will become an RBAC rule.

## Primary happy path

1. Visitor opens the course list on a phone.
2. Visitor selects a published course.
3. Visitor creates a student account.
4. Student submits one registration.
5. System saves it as pending and shows success.
6. Admin reviews and confirms it.
7. Student sees confirmed status in My Registrations.
