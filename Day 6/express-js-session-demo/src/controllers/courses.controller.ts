import type {
  Request,
  Response,
  NextFunction
} from "express";
import {getAllCourses as allCourses} from "../services/courses.service";
import {createCourse as newCourse} from "../services/courses.service";
import {findCourseById} from "../services/courses.service";
import {AppError} from "../errors/AppError";


export function createCourse(
  _request: Request,
  response: Response
) {
    const course = newCourse(_request.body);
    response.status(201).json({
        success: true,
        data: course
    });
}

export function getAllCourses(
  _request: Request,
  response: Response
) {
  const courses = allCourses(_request.query);
  response.json({ success: true, data: courses });
}

export function getCourseById(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const course = findCourseById(request.params.id as string);

  if (!course) {
    next(new AppError("Course was not found", 404));
    return;
  }

  response.json({ success: true, data: course });
}