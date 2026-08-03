# Express TypeScript Session Demo

This project is the Day 6 starter API. It focuses on the smallest useful
Express application: create an app, register routes, read a query parameter,
and send JSON responses.

## Requirements

- Node.js 20 or newer
- npm
- A browser, curl, or Postman for sending requests

Check the installed versions:

```bash
node --version
npm --version
```

## Install dependencies

Run this command from `Day 6/express-js-session-demo`:

```bash
npm install
```

The project uses Express and TypeScript. `tsx` is used by the development
script so TypeScript can run directly and restart when a source file changes.
`dotenv` and `multer` are installed as preparation for environment-variable and
file-upload examples that will be introduced after this starter.

## Run the server

### Development mode

```bash
npm run dev
```

The server starts on port `3000` and watches `src/server.ts` for changes.

### Build and run compiled JavaScript

```bash
npm run build
npm start
```

`npm run build` compiles `src/**/*.ts` into the generated `dist/` folder.
`dist/` is ignored by Git and can be regenerated at any time.

## Try the endpoints

### Health check

Request:

```bash
curl http://localhost:3000/api/health
```

Response:

```json
{
  "success": true,
  "message": "API is running"
}
```

This route is useful as the first test that the server is listening and that
Express can match a URL.

### Search query

Request:

```bash
curl "http://localhost:3000/api/search?q=angular"
```

The intended response shape is:

```json
{
  "success": true,
  "data": [
    {
      "id": "angular",
      "name": "Search result for angular"
    }
  ]
}
```

There is a deliberate beginner bug in the starter code: it checks
`request.query.q` but then reads `request.query.anything`. Ask students to
observe the incorrect result first, then change `anything` to `q` and run the
request again. This demonstrates why the query-key name must be consistent.

Without a query value:

```bash
curl http://localhost:3000/api/search
```

the route returns:

```json
{
  "success": true,
  "data": []
}
```

## Source files

| File | Purpose |
|---|---|
| `src/server.ts` | Express app, health route, search route, and server startup |
| `src/course-availability.ts` | Empty practice file for the Day 6 course-availability exercise |
| `package.json` | Scripts and dependencies |
| `tsconfig.json` | Strict TypeScript compiler configuration |
| `dist/` | Generated JavaScript after `npm run build` |

## Practice task

Complete `src/course-availability.ts` with a typed
`getCourseAvailability(course)` function. Reuse the Day 4 ideas:

- define an `Availability` literal union;
- define a `CourseAvailability` interface;
- return a generic success/failure result;
- calculate remaining seats with `Math.max`; and
- return `open`, `full`, or `unavailable` behavior for the course status.

Then add a route that calls the function and returns its result as JSON. Keep
the business rule in the separate file instead of placing it directly inside
the Express route.

## Compiler settings

The `tsconfig.json` file enables strict checking, unused-variable checks,
explicit return checks, source maps, and `noEmitOnError`. Fix TypeScript errors
before running the compiled server; do not hide them with `any`.

## Scope

This is an intentionally small classroom starter. It does not connect to
MongoDB, authenticate users, or persist data. Those concerns are added after
the Express request/response lifecycle is clear.
