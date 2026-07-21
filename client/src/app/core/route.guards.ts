import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import type { UserRole } from './api.models';
import { AuthService } from './auth.service';

/** Redirects anonymous visitors to login while preserving a simple lesson-ready flow. */
export const authenticatedGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  return auth.user() ? true : inject(Router).createUrlTree(['/login']);
};

/** Creates a guard for one or more allowed roles, illustrating reusable RBAC. */
export function roleGuard(...roles: UserRole[]): CanActivateFn {
  return () => {
    const auth = inject(AuthService);
    return auth.user() && roles.includes(auth.user()!.role)
      ? true
      : inject(Router).createUrlTree(['/']);
  };
}
