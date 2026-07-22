import bcrypt from 'bcryptjs';
import { connectToDatabase, disconnectFromDatabase } from '../config/database.js';
import { Course } from '../models/course.model.js';
import { Enrollment } from '../models/enrollment.model.js';
import { User } from '../models/user.model.js';

/**
 * Rebuilds predictable sample data. This script deliberately deletes only
 * the three application collections inside the configured training database.
 */
async function seedDatabase(): Promise<void> {
  await connectToDatabase();
  await Promise.all([Enrollment.deleteMany({}), Course.deleteMany({}), User.deleteMany({})]);

  const passwordHash = await bcrypt.hash('Password123!', 12);
  await User.create([
    { name: 'Codes Admin', email: 'admin@codes.test', passwordHash, role: 'admin' },
    { name: 'Mona Student', email: 'student@codes.test', passwordHash, role: 'student' },
    { name: 'Codes Manager', email: 'manager@codes.test', passwordHash, role: 'manager' },
  ]);

  await Course.create([
    {
      titleEn: 'MEAN Stack Foundations',
      titleAr: 'أساسيات تطوير MEAN Stack',
      summaryEn: 'Build a clear foundation in MongoDB, Express, Angular, and Node.js.',
      summaryAr: 'ابنِ أساساً واضحاً في MongoDB وExpress وAngular وNode.js.',
      durationHours: 84,
      capacity: 24,
      level: 'Intermediate',
      published: true,
    },
    {
      titleEn: 'JavaScript Essentials',
      titleAr: 'أساسيات JavaScript',
      summaryEn: 'Practice functions, arrays, objects, DOM events, and problem solving.',
      summaryAr: 'تدرّب على الدوال والمصفوفات والكائنات وأحداث DOM وحل المشكلات.',
      durationHours: 30,
      capacity: 30,
      level: 'Beginner',
      published: true,
    },
    {
      titleEn: 'API Design Lab',
      titleAr: 'معمل تصميم واجهات API',
      summaryEn: 'A draft class for REST, Express middleware, validation, and testing.',
      summaryAr: 'مسودة دورة عن REST وExpress والتحقق والاختبارات.',
      durationHours: 18,
      capacity: 20,
      level: 'Intermediate',
      published: false,
    },
  ]);

  console.log('Seed complete. Password for demo accounts: Password123!');
}

seedDatabase()
  .catch((error) => {
    console.error('Seed failed.', error);
    process.exitCode = 1;
  })
  .finally(disconnectFromDatabase);
