import { Router } from 'express';
import { getCurrentUser, login, register } from '../controllers/auth.controller.js';
import { requireAuthentication } from '../middleware/auth.middleware.js';
import { validateBody } from '../middleware/validate.middleware.js';
import { asyncHandler } from '../utils/async-handler.js';
import { loginSchema, registerSchema } from '../validation/auth.validation.js';

export const authRouter = Router();

authRouter.post('/register', validateBody(registerSchema), asyncHandler(register));
authRouter.post('/login', validateBody(loginSchema), asyncHandler(login));
authRouter.get('/me', requireAuthentication, asyncHandler(getCurrentUser));
