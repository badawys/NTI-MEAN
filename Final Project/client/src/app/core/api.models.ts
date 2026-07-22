/** Shared API contracts keep Angular services and components type-safe. */
export type UserRole = 'student' | 'admin' | 'manager';
export type EnrollmentStatus = 'pending' | 'confirmed' | 'cancelled';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Course {
  _id: string;
  titleEn: string;
  titleAr: string;
  summaryEn: string;
  summaryAr: string;
  durationHours: number;
  capacity: number;
  level: 'Beginner' | 'Intermediate';
  published: boolean;
  archived: boolean;
  /** Availability fields are returned by the public course-details endpoint. */
  confirmedEnrollments?: number;
  remainingSeats?: number;
}

export interface Enrollment {
  _id: string;
  status: EnrollmentStatus;
  createdAt: string;
  student?: User;
  course: Course;
}

export interface DashboardSummary {
  courses: number;
  publishedCourses: number;
  enrollments: number;
  pendingEnrollments: number;
}
