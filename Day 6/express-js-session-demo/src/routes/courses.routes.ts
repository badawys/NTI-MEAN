import { Router, RequestHandler } from "express";
import { getAllCourses, createCourse } from "../controllers/courses.controller";
import { requestLogger } from "../middleware/requestLogger";
import { validateCreateCourse } from "../middleware/validateCreateCourse";
import { getCourseById } from "../controllers/courses.controller";

const router = Router();

// Get all courses
router.get("/", requestLogger as unknown as RequestHandler, getAllCourses);

// Create a new course
router.post("/", requestLogger, validateCreateCourse, createCourse);

// Get a course by ID
router.get("/:id", requestLogger as unknown as RequestHandler, getCourseById);

export default router;