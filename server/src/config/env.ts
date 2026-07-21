import 'dotenv/config';

/**
 * Reads one environment variable and optionally provides a safe development
 * default. Keeping this logic in one place makes configuration easy to find
 * and prevents unrelated files from reading process.env directly.
 */
function readEnvironmentValue(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

/** Typed application configuration used by the rest of the API. */
export const env = {
  port: Number(readEnvironmentValue('PORT', '3000')),
  mongoUri: readEnvironmentValue(
    'MONGODB_URI',
    'mongodb://127.0.0.1:27017/codes_training_center',
  ),
  jwtSecret: readEnvironmentValue(
    'JWT_SECRET',
    'development-only-secret-change-before-deployment',
  ),
  clientOrigin: readEnvironmentValue('CLIENT_ORIGIN', 'http://localhost:4200'),
};
