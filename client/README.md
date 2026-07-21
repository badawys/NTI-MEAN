# Codes Training Center — Angular Client

This folder contains the Angular 22 standalone application and Tailwind CSS 4 UI. Run commands from the repository root so the client and API use the same workspace dependencies.

```bash
npm run start:web                 # Angular only
npm test --workspace client       # Unit tests
npm run build --workspace client  # Production build
```

Start the API separately with `npm run start:api`, or use `npm run dev` to run both. Read the [root README](../README.md) and [architecture wiki](../wiki/Architecture.md) before changing routes or services.
