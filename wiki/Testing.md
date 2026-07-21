# Testing and Verification

## Automated checks

```bash
npm run build
npm test --workspace client
```

The build compiles strict TypeScript on both sides and creates Angular’s optimized output. The client smoke test constructs the root application shell.

## API smoke test

Start MongoDB, then:

```bash
npm run seed
npm run start:api
```

In another terminal:

```bash
curl http://localhost:3000/api/health
curl http://localhost:3000/api/courses
```

## Manual acceptance checklist

1. Public catalog shows only two seeded published courses.
2. EN/AR control translates visible labels and switches direction.
3. New account rejects invalid email and passwords shorter than 8 characters.
4. Student can register once; a duplicate returns a conflict message.
5. Student sees only their own registrations.
6. Admin can create, edit, publish, and archive a course.
7. Admin can confirm/cancel an enrollment.
8. Manager sees summaries and records but cannot edit courses/statuses.
9. Anonymous requests to protected API endpoints return 401.
10. Student requests to admin endpoints return 403.
11. Test desktop and a 375px-wide mobile viewport.
12. Navigate using keyboard only; focus remains visible.

Re-run `npm run seed` whenever the class needs a clean known state.
