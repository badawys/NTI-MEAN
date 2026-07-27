# Day 3 — UI/UX, Accessibility & SEO

This folder contains every Day 3 output from the presentation plus complete HTML
examples. The artifacts use the same users, routes, entities, and course
registration workflow as the Codes Training Center final project.

## Learning outcomes

After completing Day 3, you should be able to:

- distinguish a client, user, persona, user journey, and user flow;
- organize public, student, admin, and manager content into a simple IA;
- explain visual hierarchy, consistency, content-first design, and responsive
  behavior;
- create low-fidelity wireframes before building Angular components;
- plan semantic HTML, form labels, keyboard flow, focus, contrast, and states;
- write useful metadata, headings, URLs, internal links, and performance rules;
  and
- compare a poor experience with an accessible, responsive, SEO-ready version.

## Folder map

```text
day-03-ui-ux-seo/
├── research/
│   └── 01-personas-and-journey.md
├── architecture/
│   └── 02-flow-and-information-architecture.md
├── wireframes/
│   ├── 03-wireframes.md
│   └── all-screens.html
├── quality/
│   └── 04-accessibility-and-seo-checklist.md
├── examples/
│   └── slide-examples.html
├── seo/
│   └── seo-course-page.html
└── comparison/
    ├── bad-course-detail.html
    ├── good-course-detail-wireframe.html
    └── good-course-detail.html
```

## Open the HTML examples

No package installation is required. Open any `.html` file directly in a modern
browser. An internet connection is needed because the lesson prototypes load
the Tailwind CSS 4 browser build from jsDelivr.

Recommended order:

1. `examples/slide-examples.html`
2. `wireframes/all-screens.html`
3. `comparison/bad-course-detail.html`
4. `comparison/good-course-detail-wireframe.html`
5. `comparison/good-course-detail.html`
6. `seo/seo-course-page.html`

The Tailwind browser build is appropriate for these classroom prototypes because
it keeps every example runnable without a build step. It is not intended for a
production website. The Angular final project uses a compiled Tailwind workflow.

## Final-project screen coverage

| Role | Screen | Planned route |
|---|---|---|
| Visitor | Home | `/` |
| Visitor | Course list | `/courses` |
| Visitor/student | Course detail | `/courses/:id` |
| Visitor | Login | `/login` |
| Visitor | Create account | `/register` |
| Authenticated user | Profile | `/profile` |
| Student | My registrations | `/my-registrations` |
| Admin/manager | Operational dashboard | `/admin` |
| Admin | Manage courses | `/admin/courses` |
| Admin/manager | Review enrollments | `/admin/enrollments` |

Managers reuse the dashboard and enrollment-review screens in read-only mode;
they do not need a separate route.

## Tailwind concepts demonstrated

- mobile-first responsive prefixes such as `sm:`, `md:`, `lg:`, and `xl:`;
- layout utilities for Grid, Flexbox, spacing, width, and overflow;
- typography, color, border, and focus-visible utilities;
- breakpoint changes for navigation, forms, facts, tables, and actions;
- state styling for loading, empty, success, error, pending, and confirmed; and
- print-friendly, semantic HTML that remains understandable without decoration.

## Day 3 submission checklist

- Complete the student and admin personas.
- Document the student journey from need to enrollment follow-up.
- Keep the registration flow and app IA aligned with real routes.
- Review every final-project screen in the wireframe gallery.
- Test the good page at phone and desktop widths.
- Navigate the good page using only the keyboard.
- Inspect the `<head>` of both SEO-ready examples.
- Complete the accessibility and SEO checklist with evidence.
- Add screenshots if required for submission.
- Commit the Day 3 folder with a clear message and push it to GitHub.

## Submission rule

The wireframes must describe real project screens, page content must match the
planned routes, and accessibility/SEO claims must be supported by actual HTML.
