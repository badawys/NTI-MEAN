/**
 * CourseStatus is a literal union. A course can only be in one of the three
 * lifecycle states supported by this MVP.
 *
 * Using a union instead of `string` lets TypeScript catch misspellings such as
 * `"publishd"` while the code is being compiled.
 */
export type CourseStatus = 'draft' | 'published' | 'archived';

/**
 * Course is the domain model used by the enrollment service.
 */
export interface Course {
  /** The identity comes from the system and must not be replaced later. */
  readonly id: string;

  /** The title can be edited by an administrator. */
  title: string;

  /** The maximum number of approved students for the course. */
  capacity: number;

  /** The number of enrollment requests that have already been approved. */
  approvedEnrollments: number;

  /** Only published courses accept new registration requests. */
  status: CourseStatus;
}

/**
 * CreateCourseDto contains the values a client may send when creating a
 * course. The server owns the id and starts the approved count at zero.
 */
export type CreateCourseDto = Omit<Course, 'id' | 'approvedEnrollments'>;

/**
 * UpdateCourseDto contains only editable fields and makes each one optional,
 * so a client can submit a small patch instead of a complete Course object.
 */
export type UpdateCourseDto = Partial<Pick<Course, 'title' | 'capacity' | 'status'>>;
