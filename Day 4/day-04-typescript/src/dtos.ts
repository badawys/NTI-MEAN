import type { Course, CourseLevel, CourseStatus } from './models.js';

/**
 * A DTO describes data crossing an API boundary.
 *
 * The create request contains only values a client is allowed to supply. It
 * intentionally excludes server-owned values such as id and status.
 */
export interface CreateCourseDto {
  title: string;
  description: string;
  level: CourseLevel;
  capacity: number;
}

/**
 * The response adds values produced by the server.
 */
export interface CourseResponseDto extends CreateCourseDto {
  id: string;
  status: CourseStatus;
  remainingSeats: number;
}

/**
 * Pick creates the compact shape required by course-list screens.
 */
export type CourseListItemDto = Pick<
  CourseResponseDto,
  'id' | 'title' | 'level' | 'remainingSeats'
>;

/**
 * Partial makes every selected property optional for patch-style updates.
 * Omit removes fields that must not be edited through this DTO.
 */
export type UpdateCourseDto = Partial<
  Omit<CreateCourseDto, 'capacity'>
> & {
  capacity?: number;
};

/**
 * Maps an internal Course model to a public response contract.
 */
export function toCourseResponseDto(course: Course): CourseResponseDto {
  return {
    id: course.id,
    title: course.title,
    description: course.description,
    level: course.level,
    capacity: course.capacity,
    status: course.status,
    remainingSeats: Math.max(
      0,
      course.capacity - course.approvedEnrollments,
    ),
  };
}
