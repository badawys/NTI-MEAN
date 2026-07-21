import type { Routes } from '@angular/router';
import { authenticatedGuard, roleGuard } from './core/route.guards';

/** Lazy route definitions keep each teaching feature isolated and easy to locate. */
export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home').then((m) => m.Home) },
  { path: 'courses', loadComponent: () => import('./features/courses/course-list').then((m) => m.CourseList) },
  { path: 'courses/:id', loadComponent: () => import('./features/courses/course-detail').then((m) => m.CourseDetail) },
  { path: 'login', loadComponent: () => import('./features/auth/login').then((m) => m.Login) },
  { path: 'register', loadComponent: () => import('./features/auth/register').then((m) => m.Register) },
  {
    path: 'my-registrations',
    canActivate: [authenticatedGuard, roleGuard('student')],
    loadComponent: () => import('./features/enrollments/my-registrations').then((m) => m.MyRegistrations),
  },
  {
    path: 'admin',
    canActivate: [authenticatedGuard, roleGuard('admin', 'manager')],
    loadComponent: () => import('./features/admin/admin-dashboard').then((m) => m.AdminDashboard),
  },
  {
    path: 'admin/courses',
    canActivate: [authenticatedGuard, roleGuard('admin')],
    loadComponent: () => import('./features/admin/manage-courses').then((m) => m.ManageCourses),
  },
  {
    path: 'admin/enrollments',
    canActivate: [authenticatedGuard, roleGuard('admin', 'manager')],
    loadComponent: () => import('./features/admin/review-enrollments').then((m) => m.ReviewEnrollments),
  },
  { path: '**', redirectTo: '' },
];
