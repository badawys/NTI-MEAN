import type { UserRole } from '../models/user.model.js';

declare global {
  namespace Express {
    interface Request {
      /** Identity added by the authentication middleware after JWT validation. */
      authUser?: { id: string; role: UserRole };
    }
  }
}

export {};
