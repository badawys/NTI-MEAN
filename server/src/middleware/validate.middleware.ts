import type { NextFunction, Request, Response } from 'express';
import type { ZodType } from 'zod';

/**
 * Turns any Zod schema into reusable Express body-validation middleware. The
 * parsed body replaces the original body so controllers receive clean values.
 */
export function validateBody(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        message: 'Please correct the highlighted data.',
        errors: result.error.flatten().fieldErrors,
      });
      return;
    }

    req.body = result.data;
    next();
  };
}
