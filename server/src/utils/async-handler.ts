import type { NextFunction, Request, RequestHandler, Response } from 'express';

/**
 * Wraps async controllers so rejected promises are forwarded to the centralized
 * Express error handler instead of repeating try/catch in every controller.
 */
export function asyncHandler(
  handler: (req: Request, res: Response, next: NextFunction) => Promise<void>,
): RequestHandler {
  return (req, res, next) => {
    void handler(req, res, next).catch(next);
  };
}
