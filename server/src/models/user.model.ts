import { model, Schema } from 'mongoose';

export const userRoles = ['student', 'admin', 'manager'] as const;
export type UserRole = (typeof userRoles)[number];

export interface UserDocument {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Stores account credentials and authorization role. Passwords are never stored
 * directly; controllers hash them before creating a document.
 */
const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true, minlength: 2 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: userRoles, default: 'student' },
  },
  { timestamps: true },
);

export const User = model<UserDocument>('User', userSchema);
