import type {
  Request,
  Response
} from "express";
import {getAllCourses as allCourses} from "../services/courses.service";
import {createCourse as newCourse} from "../services/courses.service";


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