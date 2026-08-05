export type CourseStatus =
  | "draft"
  | "published"
  | "archived";

export type Course = {
  readonly id: string;
  title: string;
  capacity: number;
  approvedEnrollments: number;
  status: CourseStatus;
};

export type CreateCourseInput = {
  title: string;
  capacity: number;
  status?: CourseStatus;
};

export type UpdateCourseInput = Partial<
  Pick<Course, "title" | "capacity" | "status">
>;