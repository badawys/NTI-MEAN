import mongoose from 'mongoose';
import { env } from './env.js';

/**
 * Opens the single Mongoose connection used by all models. Awaiting this
 * function before starting Express ensures requests never reach a disconnected
 * database during application startup.
 */
export async function connectToDatabase(): Promise<void> {
  await mongoose.connect(env.mongoUri);
  console.log('MongoDB connected');
}

/** Closes MongoDB cleanly during tests, scripts, or application shutdown. */
export async function disconnectFromDatabase(): Promise<void> {
  await mongoose.disconnect();
}
