import type {
  Course,
  CourseStatus,
  CreateCourseInput,
  UpdateCourseInput
} from "../models/course.model";

const courses: Course[] = [
  {
    id: "course-angular",
    title: "Angular Basics",
    capacity: 30,
    approvedEnrollments: 18,
    status: "published"
  },
  {
    id: "course-react",
    title: "React Basics",
    capacity: 25,
    approvedEnrollments: 20,
    status: "draft"
  }
];

export function getAllCourses(filters: { status?: CourseStatus } = {}): Course[] {
  let result = courses;

  if (filters.status) {
    result = result.filter((course) => course.status === filters.status);
  }

  return result;
}

export function findCourseById(courseId: string): Course | null {
  return courses.find((course) => course.id === courseId) ?? null;
}

export function createCourse(courseData: CreateCourseInput): Course {
  const course: Course = {
    id: `course-${Date.now()}`,
    title: courseData.title,
    capacity: courseData.capacity,
    approvedEnrollments: 0,
    status: courseData.status ?? "draft"
  };

  courses.push(course);
  return course;
}

export function updateCourse(
  courseId: string,
  updates: UpdateCourseInput
): Course | null {
  const course = findCourseById(courseId);

  if (!course) {
    return null;
  }

  if (updates.title !== undefined) {
    course.title = updates.title;
  }

  if (updates.capacity !== undefined) {
    course.capacity = updates.capacity;
  }

  if (updates.status !== undefined) {
    course.status = updates.status;
  }

  return course;
}

export function archiveCourse(courseId: string): Course | null {
  const course = findCourseById(courseId);

  if (!course) {
    return null;
  }

  course.status = "archived";
  return course;
}