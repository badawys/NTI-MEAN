import type {
  NextFunction,
  Request
} from "express";
import { AppError } from "../errors/AppError";

import type {
  CourseStatus
} from "../models/course.model";

const allowedStatuses: CourseStatus[] = [
  "draft",
  "published",
  "archived"
];

export function validateCreateCourse(
  request: Request,
  next: NextFunction
): void {
  const { title, capacity, status } = request.body;

  if (typeof title !== "string" || title.trim().length === 0) {
    next(new AppError("Course title is required", 400))
  }

  if (!Number.isInteger(capacity) || capacity <= 0) {
    next(new AppError("Capacity must be a positive integer", 400));
  }

  if (status !== undefined && !allowedStatuses.includes(status)) {
    next(new AppError("Invalid course status", 400));
  }

  next();
}