# 02 — User Flow and Information Architecture

## Student registration flow

```text
Home
  ↓ Explore courses
Course list
  ↓ Select “View details”
Course detail
  ├─ Signed out → Login or Create account → return to course detail
  ├─ Course full → explain unavailability → return to course list
  └─ Signed in + seat available → Submit registration
                                  ↓
                              Confirmation
                                  ↓
                         My registrations
```

## Flow rules and states

1. The home page introduces one promise and one primary discovery path.
2. The course list supports search/filtering and an empty-result state.
3. Course detail provides information before asking for commitment.
4. Signed-out visitors are sent to authentication, then returned to context.
5. Submit enters a visible loading state and prevents duplicate requests.
6. Success explains that the request is `pending`, not already approved.
7. Failure preserves context and offers a clear next action.

## Admin review flow

```text
Login
  ↓ Role-aware redirect
Admin dashboard
  ↓ Review enrollments
Enrollment queue
  ↓ Filter to Pending
Review student + course
  ↓ Choose new status
Confirm decision
  ↓ Save
Updated row + success feedback
```

Manager follows the same route but sees a read-only queue without status-change
controls.

## Information architecture

```text
Codes Training Center
├── Public
│   ├── Home
│   ├── Courses
│   │   └── Course details
│   ├── Login
│   └── Create account
├── Student
│   ├── My registrations
│   └── Profile
├── Admin
│   ├── Dashboard
│   ├── Manage courses
│   ├── Review enrollments
│   └── Profile
├── Manager
│   ├── Dashboard (read-only)
│   ├── Review enrollments (read-only)
│   └── Profile
└── Shared states
    ├── Loading
    ├── Empty result
    ├── Validation error
    ├── Request error
    ├── Success feedback
    └── Route not found / safe redirect
```

## Route and page inventory

| Route | User goal | Primary content | Primary action | Important states |
|---|---|---|---|---|
| `/` | Understand the product | Value statement | Explore courses | Normal |
| `/courses` | Compare available courses | Search, filters, course summaries | View details | Loading, empty, error |
| `/courses/:id` | Decide whether to register | Course description and facts | Register/sign in | Loading, full, success, error |
| `/login` | Start a session | Email/password form | Log in | Validation, submitting, API error |
| `/register` | Create a student account | Name/email/password form | Create account | Validation, submitting, API error |
| `/profile` | Maintain account data | Details and password forms | Save changes | Validation, saving, success, error |
| `/my-registrations` | Track requests | Course and status list | Explore courses if empty | Loading, empty, error |
| `/admin` | Understand operations | Course/enrollment summary | Open work queue | Loading, error, read-only |
| `/admin/courses` | Maintain course catalog | Course form and list | Save course | Create/edit, archived, validation |
| `/admin/enrollments` | Review requests | Filters and enrollment table | Save status | Empty, confirmation, success, error |

## Navigation model

- Public navigation: Home, Courses, Login, Create account.
- Student navigation: Home, Courses, My registrations, Profile, Log out.
- Admin navigation: Home, Dashboard, Courses, Enrollments, Profile, Log out.
- Manager navigation: Home, Dashboard, Enrollments, Profile, Log out.
- Current page is visually identified and available to assistive technology.
- Mobile navigation remains keyboard-operable and does not hide the main task.

## Reusable component inventory

- Site header and role-aware navigation
- Page title block
- Primary, secondary, text, and destructive actions
- Course summary row/card
- Search input and filter select
- Labeled form field with hint/error
- Course fact list
- Status label with text
- Data table and mobile stacked-row alternative
- Loading, empty, success, warning, and error message
- Confirmation dialog
- Pagination or result count if the data set grows

## Responsive behavior

- Below `640px`: one-column content, stacked filters, full-width primary actions.
- From `640px`: facts and short form rows can use two columns.
- From `768px`: navigation expands and tables may use horizontal scrolling.
- From `1024px`: decision pages can use a main column plus sticky facts/actions.
- Content order remains logical when CSS layout changes.
- Touch targets should be at least approximately 44×44 CSS pixels.
