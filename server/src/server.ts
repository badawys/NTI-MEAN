import { createApp } from './app.js';
import { connectToDatabase, disconnectFromDatabase } from './config/database.js';
import { env } from './config/env.js';

/** Connects infrastructure first, then starts accepting HTTP requests. */
async function startServer(): Promise<void> {
  await connectToDatabase();
  const server = createApp().listen(env.port, () => {
    console.log(`API running at http://localhost:${env.port}`);
  });

  /** Lets Ctrl+C stop both HTTP and MongoDB cleanly during class demos. */
  const shutdown = () => {
    server.close(() => {
      void disconnectFromDatabase().finally(() => process.exit(0));
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

startServer().catch((error) => {
  console.error('The API could not start.', error);
  process.exit(1);
});
