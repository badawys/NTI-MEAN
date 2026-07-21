import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';
import { authRouter } from './routes/auth.routes.js';
import { courseRouter } from './routes/course.routes.js';
import { enrollmentRouter } from './routes/enrollment.routes.js';

/**
 * Builds the Express application separately from server startup. This makes the
 * routing layer easier to test and demonstrates middleware execution order.
 */
export function createApp() {
  const app = express();

  // Browsers treat localhost and 127.0.0.1 as different origins even though
  // both reach this computer, so development accepts the two explicit forms.
  const allowedOrigins = new Set([
    env.clientOrigin,
    env.clientOrigin.replace('localhost', '127.0.0.1'),
    env.clientOrigin.replace('127.0.0.1', 'localhost'),
  ]);

  app.use(helmet());
  app.use(
    cors({
      origin(origin, callback) {
        // Requests without an Origin header are server-to-server tools such as curl.
        callback(null, !origin || allowedOrigins.has(origin));
      },
    }),
  );
  app.use(express.json({ limit: '100kb' }));
  app.use(morgan('dev'));
  app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, limit: 300 }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'Codes Training Center API' });
  });
  app.use('/api/auth', authRouter);
  app.use('/api/courses', courseRouter);
  app.use('/api/enrollments', enrollmentRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
