import type { ErrorRequestHandler, RequestHandler } from 'express';
import mongoose from 'mongoose';

/** Handles unknown URLs after all feature routers have had a chance to match. */
export const notFoundHandler: RequestHandler = (_req, res) => {
  res.status(404).json({ message: 'Route not found.' });
};

/**
 * Converts unexpected thrown errors into a consistent JSON response. Detailed
 * errors are logged for developers but are not leaked to API clients.
 */
export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error(error);

  if (error instanceof mongoose.Error.CastError) {
    res.status(400).json({ message: 'Invalid resource identifier.' });
    return;
  }

  if ((error as { code?: number }).code === 11000) {
    res.status(409).json({ message: 'This record already exists.' });
    return;
  }

  res.status(500).json({ message: 'An unexpected server error occurred.' });
};
