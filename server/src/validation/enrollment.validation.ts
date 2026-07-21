import { z } from 'zod';

/** MongoDB identifiers are 24-character hexadecimal strings. */
export const createEnrollmentSchema = z.object({
  courseId: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid course identifier.'),
});

/** Admins can move an enrollment through this deliberately small workflow. */
export const updateEnrollmentSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled']),
});
