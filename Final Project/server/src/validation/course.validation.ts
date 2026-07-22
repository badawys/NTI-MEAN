import { z } from 'zod';

/** Shared shape used when an admin creates a complete course. */
export const courseSchema = z.object({
  titleEn: z.string().trim().min(3).max(120),
  titleAr: z.string().trim().min(3).max(120),
  summaryEn: z.string().trim().min(10).max(600),
  summaryAr: z.string().trim().min(10).max(600),
  durationHours: z.number().int().min(1).max(500),
  capacity: z.number().int().min(1).max(1000),
  level: z.enum(['Beginner', 'Intermediate']),
  published: z.boolean(),
});

/** Edit requests may send only the fields that changed. */
export const updateCourseSchema = courseSchema.partial();
