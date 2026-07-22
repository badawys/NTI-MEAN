import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import type { UserRole } from '../models/user.model.js';

interface TokenPayload {
  sub: string;
  role: UserRole;
}

/**
 * Validates the Bearer token and exposes the signed user identity to later
 * middleware/controllers. It returns 401 when the token is missing or invalid.
 */
export function requireAuthentication(req: Request, res: Response, next: NextFunction): void {
  const authorization = req.header('Authorization');
  const token = authorization?.startsWith('Bearer ') ? authorization.slice(7) : undefined;

  if (!token) {
    res.status(401).json({ message: 'Authentication required.' });
    return;
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret) as TokenPayload;
    req.authUser = { id: payload.sub, role: payload.role };
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
}

/**
 * Produces role-checking middleware. Keeping this separate from authentication
 * demonstrates that identity (who) and authorization (what may they do) differ.
 */
export function allowRoles(...roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.authUser || !roles.includes(req.authUser.role)) {
      res.status(403).json({ message: 'You do not have permission for this action.' });
      return;
    }

    next();
  };
}
