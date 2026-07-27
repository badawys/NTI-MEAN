# 03 — Responsive Wireframe Notes

Open [all-screens.html](all-screens.html) to review the complete low-fidelity
wireframe set for every final-project route.

## What the wireframes communicate

- content order and page hierarchy;
- navigation and role boundaries;
- primary and secondary actions;
- form structure and validation locations;
- desktop versus mobile behavior;
- loading, empty, success, and error states; and
- reusable Angular component candidates.

They deliberately avoid finished brand artwork and detailed decoration. A
wireframe answers “what belongs where and why?” before visual polish.

## Screen annotations

### Home

- Brand promise is the strongest signal.
- One primary CTA leads to the course catalog.
- Create Account remains secondary.
- Mobile keeps the same content order and removes decorative complexity.

### Course list

- Search and level filter appear before results.
- Each result exposes level, duration, availability, and one Details action.
- Empty state suggests clearing filters.
- Mobile stacks controls and course information.

### Course detail

- Course value and description appear before registration.
- Full capacity and remaining seats are separate facts.
- The action changes for signed-out, student, and full-course states.
- Related courses appear only after the main decision content.

### Login and Create account

- Labels remain visible; placeholders do not replace them.
- Errors appear beside the field or in a clearly connected summary.
- Entered values remain when validation fails.
- Authentication pages link to each other.

### Profile

- Account details and password security are separate forms.
- Saving one form does not submit the other.
- Success/error feedback stays near the relevant form.

### My registrations

- Course name, registration date, and text status are scannable.
- Empty state sends the student to Courses.
- Status never depends on color alone.

### Admin dashboard

- Summary supports orientation; it does not replace the work queue.
- Admin receives course-management and review actions.
- Manager receives only the read-only review action.

### Manage courses

- Desktop uses a form beside the course list.
- Mobile puts the form before the list.
- Edit mode is obvious and cancelable.
- Archive/unarchive state is visible and non-destructive.

### Review enrollments

- Filters reduce the queue before the table.
- Desktop table can scroll if required.
- Mobile presents the same fields as stacked labeled rows.
- Status mutation needs confirmation and feedback.

## Component and state checklist

- [ ] Header/nav
- [ ] Page heading
- [ ] Search/filter controls
- [ ] Course summary
- [ ] Fact list
- [ ] Form field/hint/error
- [ ] Primary/secondary/destructive button
- [ ] Status label
- [ ] Data row/table
- [ ] Confirmation dialog
- [ ] Loading state
- [ ] Empty state
- [ ] Success state
- [ ] Error state

## Review questions

1. Can the user identify the page goal within five seconds?
2. Is there one clearly preferred action?
3. Does the reading order still work on mobile?
4. What happens when data is missing, loading, or unavailable?
5. Can each wireframe map to a real Angular route and component?
