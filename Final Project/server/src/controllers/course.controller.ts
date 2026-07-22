import type { Request, Response } from 'express';
import { Course } from '../models/course.model.js';

/** Lists active published courses for visitors and students. */
export async function listPublicCourses(_req: Request, res: Response): Promise<void> {
  const courses = await Course.find({ published: true, archived: false }).sort({ createdAt: -1 });
  res.json({ courses });
}

/** Returns one public course or 404 when it is unpublished/archived. */
export async function getPublicCourse(req: Request, res: Response): Promise<void> {
  const course = await Course.findOne({
    _id: req.params['id'],
    published: true,
    archived: false,
  });

  if (!course) {
    res.status(404).json({ message: 'Course not found.' });
    return;
  }

  res.json({ course });
}

/** Admin list includes drafts and archived items for management screens. */
export async function listAllCourses(_req: Request, res: Response): Promise<void> {
  const courses = await Course.find().sort({ archived: 1, createdAt: -1 });
  res.json({ courses });
}

/** Creates a course from the body already cleaned by Zod middleware. */
export async function createCourse(req: Request, res: Response): Promise<void> {
  const course = await Course.create(req.body);
  res.status(201).json({ course });
}

/** Updates approved fields and returns validation errors through Mongoose. */
export async function updateCourse(req: Request, res: Response): Promise<void> {
  const course = await Course.findByIdAndUpdate(req.params['id'], req.body, {
    returnDocument: 'after',
    runValidators: true,
  });

  if (!course) {
    res.status(404).json({ message: 'Course not found.' });
    return;
  }

  res.json({ course });
}

/** Archives instead of deleting so enrollment history remains valid. */
export async function archiveCourse(req: Request, res: Response): Promise<void> {
  const course = await Course.findByIdAndUpdate(
    req.params['id'],
    { archived: true, published: false },
    { returnDocument: 'after' },
  );

  if (!course) {
    res.status(404).json({ message: 'Course not found.' });
    return;
  }

  res.json({ course });
}

/**
 * Restores an archived course as a draft. It remains unpublished so an admin
 * can review its content before making it visible in the public catalog again.
 */
export async function unarchiveCourse(req: Request, res: Response): Promise<void> {
  const course = await Course.findOneAndUpdate(
    { _id: req.params['id'], archived: true },
    { archived: false, published: false },
    { returnDocument: 'after', runValidators: true },
  );

  if (!course) {
    res.status(404).json({ message: 'Archived course not found.' });
    return;
  }

  res.json({ course });
}
