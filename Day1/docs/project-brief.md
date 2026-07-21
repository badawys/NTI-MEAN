# Codes Course Registration System — Project Brief

## Client and problem

**Client:** Codes Training Center.

**Problem:** Course information and registrations are handled manually, slowing student registration and staff follow-up.

## Users

Visitor, Student, Admin, and Manager. Instructors are not part of the MVP.

## Pages

- Public: Home, Course List, Course Details.
- Student: Login/Register, My Registrations, Profile/session controls.
- Admin: Dashboard, Manage Courses, Review Enrollments.
- Manager: read-only Dashboard and Review Enrollments.

## Entities

- **User:** name, email, password hash, role.
- **Course:** bilingual title/summary, duration, capacity, level, published, archived.
- **Enrollment:** student, course, status, timestamps.

Category and Message may be added later; they are not required for the MVP.

## Must-have MVP features

- Browse published courses and read details.
- Create a student account and sign in.
- Register once for a course with available capacity.
- Track pending/confirmed/cancelled status.
- Admin creates, edits, publishes, and archives courses.
- Admin reviews registrations; manager reads summaries.
- Mobile-friendly, accessible EN/AR interface.

## Nice-to-have / out of scope

Payment gateway, certificates, email/SMS reminders, analytics platform, instructor portal, file uploads, and production deployment automation are out of scope for this course MVP.

## Acceptance criteria

1. Given a published course with capacity, when a signed-in student registers, then one pending enrollment is saved and success appears.
2. Given the same student/course, when registration is submitted again, then the API rejects the duplicate.
3. Given a valid bilingual course form, when an admin saves it, then the course is stored and publication controls public visibility.
4. Given an archived course, when a visitor browses, then the course does not appear and existing enrollment history remains.
5. Given a manager account, when course/status write routes are requested, then access is denied.
6. All worked UI labels are available in English and Arabic and the layout supports RTL.

## Success criteria

- Visitor registers in under two minutes.
- Staff completes core follow-up without a separate spreadsheet.
- Course and registration forms work on mobile.
- Validation and roles protect enrollment data.
- Final demo clearly explains business value and MEAN architecture.
