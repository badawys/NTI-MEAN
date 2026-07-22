import { model, Schema } from 'mongoose';

export interface CourseDocument {
  titleEn: string;
  titleAr: string;
  summaryEn: string;
  summaryAr: string;
  durationHours: number;
  capacity: number;
  level: 'Beginner' | 'Intermediate';
  published: boolean;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/** Course content is bilingual because every visible UI label has EN/AR support. */
const courseSchema = new Schema<CourseDocument>(
  {
    titleEn: { type: String, required: true, trim: true },
    titleAr: { type: String, required: true, trim: true },
    summaryEn: { type: String, required: true, trim: true },
    summaryAr: { type: String, required: true, trim: true },
    durationHours: { type: Number, required: true, min: 1 },
    capacity: { type: Number, required: true, min: 1 },
    level: { type: String, enum: ['Beginner', 'Intermediate'], required: true },
    published: { type: Boolean, default: false },
    archived: { type: Boolean, default: false },
  },
  { timestamps: true },
);

courseSchema.index({ published: 1, archived: 1 });

export const Course = model<CourseDocument>('Course', courseSchema);
