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
