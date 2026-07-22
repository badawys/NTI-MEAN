import bcrypt from 'bcryptjs';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { User, type UserRole } from '../models/user.model.js';

/** Creates the short public user object returned to Angular. */
function publicUser(user: { id: string; name: string; email: string; role: UserRole }) {
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

/** Signs a one-day JWT containing only the identity and authorization role. */
function createAccessToken(userId: string, role: UserRole): string {
  return jwt.sign({ role }, env.jwtSecret, { subject: userId, expiresIn: '1d' });
}

/** Registers a student, hashes the password, and returns an immediate session. */
export async function register(req: Request, res: Response): Promise<void> {
  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    res.status(409).json({ message: 'An account already uses this email.' });
    return;
  }

  const passwordHash = await bcrypt.hash(req.body.password, 12);
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    passwordHash,
    role: 'student',
  });

  res.status(201).json({
    token: createAccessToken(user.id, user.role),
    user: publicUser(user),
  });
}

/** Checks credentials without revealing whether the email or password was wrong. */
export async function login(req: Request, res: Response): Promise<void> {
  const user = await User.findOne({ email: req.body.email }).select('+passwordHash');
  const passwordMatches = user
    ? await bcrypt.compare(req.body.password, user.passwordHash)
    : false;

  if (!user || !passwordMatches) {
    res.status(401).json({ message: 'Email or password is incorrect.' });
    return;
  }

  res.json({
    token: createAccessToken(user.id, user.role),
    user: publicUser(user),
  });
}

/** Reloads the signed-in user's safe profile from MongoDB. */
export async function getCurrentUser(req: Request, res: Response): Promise<void> {
  const user = await User.findById(req.authUser!.id);

  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    return;
  }

  res.json({ user: publicUser(user) });
}
