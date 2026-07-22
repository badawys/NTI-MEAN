import { Router } from 'express';
import {
  archiveCourse,
  createCourse,
  getPublicCourse,
  listAllCourses,
  listPublicCourses,
  unarchiveCourse,
  updateCourse,
} from '../controllers/course.controller.js';
import { allowRoles, requireAuthentication } from '../middleware/auth.middleware.js';
import { validateBody } from '../middleware/validate.middleware.js';
import { asyncHandler } from '../utils/async-handler.js';
import { courseSchema, updateCourseSchema } from '../validation/course.validation.js';

export const courseRouter = Router();

courseRouter.get('/', asyncHandler(listPublicCourses));
courseRouter.get('/admin', requireAuthentication, allowRoles('admin'), asyncHandler(listAllCourses));
courseRouter.post(
  '/',
  requireAuthentication,
  allowRoles('admin'),
  validateBody(courseSchema),
  asyncHandler(createCourse),
);
courseRouter.patch(
  '/:id',
  requireAuthentication,
  allowRoles('admin'),
  validateBody(updateCourseSchema),
  asyncHandler(updateCourse),
);
courseRouter.delete('/:id', requireAuthentication, allowRoles('admin'), asyncHandler(archiveCourse));
courseRouter.patch(
  '/:id/unarchive',
  requireAuthentication,
  allowRoles('admin'),
  asyncHandler(unarchiveCourse),
);
courseRouter.get('/:id', asyncHandler(getPublicCourse));
