import { Router } from 'express';
import {
  createEnrollment,
  getDashboardSummary,
  listAllEnrollments,
  listMyEnrollments,
  updateEnrollmentStatus,
} from '../controllers/enrollment.controller.js';
import { allowRoles, requireAuthentication } from '../middleware/auth.middleware.js';
import { validateBody } from '../middleware/validate.middleware.js';
import { asyncHandler } from '../utils/async-handler.js';
import {
  createEnrollmentSchema,
  updateEnrollmentSchema,
} from '../validation/enrollment.validation.js';

export const enrollmentRouter = Router();

enrollmentRouter.use(requireAuthentication);
enrollmentRouter.get('/mine', allowRoles('student'), asyncHandler(listMyEnrollments));
enrollmentRouter.post(
  '/',
  allowRoles('student'),
  validateBody(createEnrollmentSchema),
  asyncHandler(createEnrollment),
);
enrollmentRouter.get(
  '/admin',
  allowRoles('admin', 'manager'),
  asyncHandler(listAllEnrollments),
);
enrollmentRouter.get(
  '/summary',
  allowRoles('admin', 'manager'),
  asyncHandler(getDashboardSummary),
);
enrollmentRouter.patch(
  '/:id',
  allowRoles('admin'),
  validateBody(updateEnrollmentSchema),
  asyncHandler(updateEnrollmentStatus),
);
