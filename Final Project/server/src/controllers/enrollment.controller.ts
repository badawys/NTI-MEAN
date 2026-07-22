import type { Request, Response } from 'express';
import { Course } from '../models/course.model.js';
import { Enrollment } from '../models/enrollment.model.js';

/** Registers the signed-in student after checking publication and capacity. */
export async function createEnrollment(req: Request, res: Response): Promise<void> {
  const course = await Course.findOne({
    _id: req.body.courseId,
    published: true,
    archived: false,
  });

  if (!course) {
    res.status(404).json({ message: 'This course is not available.' });
    return;
  }

  const confirmedCount = await Enrollment.countDocuments({
    course: course.id,
    status: 'confirmed',
  });

  if (confirmedCount >= course.capacity) {
    res.status(409).json({ message: 'This course has reached its capacity.' });
    return;
  }

  const enrollment = await Enrollment.create({
    student: req.authUser!.id,
    course: course.id,
  });

  await enrollment.populate('course');
  res.status(201).json({ enrollment });
}

/** Lists only the current student's records to enforce data ownership. */
export async function listMyEnrollments(req: Request, res: Response): Promise<void> {
  const enrollments = await Enrollment.find({ student: req.authUser!.id })
    .populate('course')
    .sort({ createdAt: -1 });
  res.json({ enrollments });
}

/** Gives admins/managers the enrollment review queue with course and student labels. */
export async function listAllEnrollments(_req: Request, res: Response): Promise<void> {
  const enrollments = await Enrollment.find()
    .populate('student', 'name email')
    .populate('course', 'titleEn titleAr')
    .sort({ createdAt: -1 });
  res.json({ enrollments });
}

/** Updates one enrollment status after role and body validation middleware pass. */
export async function updateEnrollmentStatus(req: Request, res: Response): Promise<void> {
  if (req.body.status === 'confirmed') {
    const requestedEnrollment = await Enrollment.findById(req.params['id']);
    if (!requestedEnrollment) {
      res.status(404).json({ message: 'Enrollment not found.' });
      return;
    }

    const [course, confirmedCount] = await Promise.all([
      Course.findById(requestedEnrollment.course),
      Enrollment.countDocuments({
        course: requestedEnrollment.course,
        status: 'confirmed',
        _id: { $ne: requestedEnrollment.id },
      }),
    ]);

    if (!course) {
      res.status(404).json({ message: 'Course not found.' });
      return;
    }

    if (confirmedCount >= course.capacity) {
      res.status(409).json({ message: 'This course has reached its capacity.' });
      return;
    }
  }

  const enrollment = await Enrollment.findByIdAndUpdate(
    req.params['id'],
    { status: req.body.status },
    { returnDocument: 'after', runValidators: true },
  )
    .populate('student', 'name email')
    .populate('course', 'titleEn titleAr');

  if (!enrollment) {
    res.status(404).json({ message: 'Enrollment not found.' });
    return;
  }

  res.json({ enrollment });
}

/** Calculates four small summary values for the admin/manager dashboard. */
export async function getDashboardSummary(_req: Request, res: Response): Promise<void> {
  const [courses, publishedCourses, enrollments, pendingEnrollments] = await Promise.all([
    Course.countDocuments({ archived: false }),
    Course.countDocuments({ archived: false, published: true }),
    Enrollment.countDocuments(),
    Enrollment.countDocuments({ status: 'pending' }),
  ]);

  res.json({ courses, publishedCourses, enrollments, pendingEnrollments });
}
