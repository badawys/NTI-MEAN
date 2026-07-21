import { model, Schema, Types } from 'mongoose';

export const enrollmentStatuses = ['pending', 'confirmed', 'cancelled'] as const;
export type EnrollmentStatus = (typeof enrollmentStatuses)[number];

export interface EnrollmentDocument {
  student: Types.ObjectId;
  course: Types.ObjectId;
  status: EnrollmentStatus;
  createdAt: Date;
  updatedAt: Date;
}

/** Connects one student to one course and tracks the admin's review decision. */
const enrollmentSchema = new Schema<EnrollmentDocument>(
  {
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    status: { type: String, enum: enrollmentStatuses, default: 'pending' },
  },
  { timestamps: true },
);

// A compound unique index prevents the same student from registering twice.
enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

export const Enrollment = model<EnrollmentDocument>('Enrollment', enrollmentSchema);
