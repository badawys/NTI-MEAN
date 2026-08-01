/**
 * UserRole is the complete list of roles used by this simplified example.
 */
export type UserRole = 'student' | 'admin' | 'manager';

/**
 * User describes the account that is attempting to register for a course.
 */
export interface User {
  /** User ids are stable identities and cannot be reassigned accidentally. */
  readonly id: string;

  /** The display name shown to other users. */
  name: string;

  /** The email address used to identify the account. */
  email: string;

  /** The role determines which actions the account may perform. */
  role: UserRole;
}
