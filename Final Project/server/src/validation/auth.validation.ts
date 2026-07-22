import { z } from 'zod';

/** Registration accepts only the fields a new student is allowed to choose. */
export const registerSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email().transform((value) => value.toLowerCase()),
  password: z.string().min(8).max(72),
});

/** Login uses the same normalized email rules as registration. */
export const loginSchema = z.object({
  email: z.email().transform((value) => value.toLowerCase()),
  password: z.string().min(1),
});

/**
 * Profile details and password changes share one endpoint. Password fields must
 * appear together so a new password can never be set without verification.
 */
export const updateProfileSchema = z
  .object({
    name: z.string().trim().min(2).max(80).optional(),
    email: z.email().transform((value) => value.toLowerCase()).optional(),
    currentPassword: z.string().min(1).optional(),
    newPassword: z.string().min(8).max(72).optional(),
  })
  .superRefine((data, context) => {
    if (data.newPassword && !data.currentPassword) {
      context.addIssue({ code: 'custom', path: ['currentPassword'], message: 'Current password is required.' });
    }

    if (data.currentPassword && !data.newPassword) {
      context.addIssue({ code: 'custom', path: ['newPassword'], message: 'New password is required.' });
    }

    if (!data.name && !data.email && !data.newPassword) {
      context.addIssue({ code: 'custom', message: 'Provide at least one profile change.' });
    }
  });
