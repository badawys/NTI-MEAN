# Day 1 — Codes Training Center Assignment

## Value sentence

Codes Training Center reduces slow manual course registration by giving visitors a clear catalog, students a trackable registration, and staff one follow-up workflow.

## 60-second project pitch

Training centers often publish course details in messages and collect registrations in separate spreadsheets. Visitors cannot easily compare available courses, students do not know whether registration was accepted, and staff repeatedly copy data between tools. Codes Training Center is a simple mobile-friendly MEAN application where visitors browse published courses, students register and track status, and admins manage courses and review enrollments. The MVP focuses on Users, Courses, and Enrollments to deliver faster registration, clearer follow-up, and a project students can explain and finish during the 14-day course.

## Users and roles

- **Visitor:** browses public course information.
- **Student:** creates an account, registers, and tracks registration status.
- **Admin:** creates/edits/publishes/archives courses and reviews enrollments.
- **Manager:** sees course demand and registration summaries without edit access.

## Day 1 outcomes represented here

- [Discovery checklist](docs/discovery-checklist.md)
- [Project brief](docs/project-brief.md)
- [User journey](docs/user-journey.md)
- [Functions, arrays, objects, filter, map, and reduce](js/day1-review/codes-course-data.js)
- [DOM manipulation and events registration demo](js/day1-review/index.html)

## Run the JavaScript examples

Data transformation in the terminal:

```bash
node Day1/js/day1-review/codes-course-data.js
```

DOM/events example: open `Day1/js/day1-review/index.html` directly in a browser. Fill the form and submit it. No server or database is used on Day 1.

## Reflection question / bug to discuss

The remaining-seats function returns a negative number when `enrolled` is larger than `capacity`. Should the function clamp at zero, throw an error, or report invalid data separately? What does each choice mean to the user?

## Assignment submission checklist

- Repository uses an organized `docs/` and `js/day1-review/` structure.
- README includes value, pitch, users/roles, and one JavaScript question.
- Discovery questions address business, users, workflow, data, constraints, and success.
- Project brief defines pages, entities, MVP, out-of-scope items, and acceptance criteria.
- JavaScript file demonstrates functions, arrays, objects, `filter`, `map`, and `reduce`.
- DOM demo validates inputs, creates an enrollment object, and shows feedback.
- Push the folder to GitHub before Day 2.
