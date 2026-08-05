import { Router } from "express";
import { getAllCourses, createCourse } from "../controllers/courses.controller";

const router = Router();

// Get all courses
router.get("/", getAllCourses);

// Create a new course
router.post("/", createCourse);

export default router;