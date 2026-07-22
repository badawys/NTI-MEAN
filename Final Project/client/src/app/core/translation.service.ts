import { Injectable, computed, signal } from '@angular/core';

type Language = 'en' | 'ar';

const translations = {
  en: {
    trainingCenter: 'TRAINING CENTER', courses: 'Courses', myRegistrations: 'My registrations',
    dashboard: 'Dashboard', changeLanguage: 'Change language', logout: 'Log out', login: 'Log in',
    joinNow: 'Join now', footerText: 'Practical technology education built around real projects.',
    heroEyebrow: 'LEARN. BUILD. SHOW YOUR WORK.', heroTitle: 'Turn curiosity into working code.',
    heroText: 'Focused courses, clear progress, and practical projects for the next step in your career.',
    exploreCourses: 'Explore courses', viewCourse: 'View course', availableCourses: 'Available courses',
    availableText: 'Choose a focused learning path and register in a few clear steps.', hours: 'hours',
    beginner: 'Beginner', intermediate: 'Intermediate', loading: 'Loading…', noCourses: 'No published courses yet.',
    backToCourses: 'Back to courses', registerCourse: 'Register for this course', registrationSent: 'Registration sent for review.',
    signInFirst: 'Log in as a student to register.', email: 'Email', password: 'Password', name: 'Full name',
    createAccount: 'Create account', accountPrompt: 'New to Codes?', existingPrompt: 'Already have an account?',
    invalidForm: 'Please complete all required fields correctly.', status: 'Status', registeredOn: 'Registered on',
    noRegistrations: 'You have not registered for a course yet.', adminOverview: 'Training overview',
    adminText: 'A focused view of courses and registration follow-up.', totalCourses: 'Active courses',
    published: 'Published', totalEnrollments: 'Enrollments', pending: 'Pending', manageCourses: 'Manage courses',
    reviewEnrollments: 'Review enrollments', addCourse: 'Add course', titleEn: 'English title', titleAr: 'Arabic title',
    summaryEn: 'English summary', summaryAr: 'Arabic summary', duration: 'Duration (hours)', capacity: 'Capacity',
    level: 'Level', isPublished: 'Publish now', save: 'Save course', archive: 'Archive', draft: 'Draft', archived: 'Archived',
    student: 'Student', course: 'Course', actions: 'Actions', confirmed: 'Confirmed', cancelled: 'Cancelled',
    saveStatus: 'Save status', edit: 'Edit', cancelEdit: 'Cancel edit', updateCourse: 'Update course', courseSaved: 'Course saved.',
    accessDenied: 'You do not have access to this page.', error: 'Something went wrong. Please try again.',
  },
  ar: {
    trainingCenter: 'مركز التدريب', courses: 'الدورات', myRegistrations: 'تسجيلاتي', dashboard: 'لوحة التحكم',
    changeLanguage: 'تغيير اللغة', logout: 'تسجيل الخروج', login: 'تسجيل الدخول', joinNow: 'انضم الآن',
    footerText: 'تعليم تقني عملي مبني على مشروعات حقيقية.', heroEyebrow: 'تعلّم. ابنِ. اعرض عملك.',
    heroTitle: 'حوّل فضولك إلى كود يعمل.', heroText: 'دورات مركزة وتقدم واضح ومشروعات عملية لخطوتك المهنية القادمة.',
    exploreCourses: 'استكشف الدورات', viewCourse: 'عرض الدورة', availableCourses: 'الدورات المتاحة',
    availableText: 'اختر مساراً تعليمياً مركزاً وسجّل في خطوات واضحة.', hours: 'ساعة', beginner: 'مبتدئ',
    intermediate: 'متوسط', loading: 'جارٍ التحميل…', noCourses: 'لا توجد دورات منشورة حالياً.', backToCourses: 'العودة للدورات',
    registerCourse: 'التسجيل في الدورة', registrationSent: 'تم إرسال التسجيل للمراجعة.', signInFirst: 'سجّل الدخول كطالب للتسجيل.',
    email: 'البريد الإلكتروني', password: 'كلمة المرور', name: 'الاسم الكامل', createAccount: 'إنشاء حساب',
    accountPrompt: 'جديد في Codes؟', existingPrompt: 'لديك حساب بالفعل؟', invalidForm: 'أكمل الحقول المطلوبة بصورة صحيحة.',
    status: 'الحالة', registeredOn: 'تاريخ التسجيل', noRegistrations: 'لم تسجل في أي دورة بعد.', adminOverview: 'نظرة عامة على التدريب',
    adminText: 'عرض مركز للدورات ومتابعة التسجيلات.', totalCourses: 'الدورات النشطة', published: 'منشورة',
    totalEnrollments: 'التسجيلات', pending: 'قيد المراجعة', manageCourses: 'إدارة الدورات', reviewEnrollments: 'مراجعة التسجيلات',
    addCourse: 'إضافة دورة', titleEn: 'العنوان بالإنجليزية', titleAr: 'العنوان بالعربية', summaryEn: 'الوصف بالإنجليزية',
    summaryAr: 'الوصف بالعربية', duration: 'المدة (بالساعات)', capacity: 'السعة', level: 'المستوى', isPublished: 'النشر الآن',
    save: 'حفظ الدورة', archive: 'أرشفة', draft: 'مسودة', archived: 'مؤرشفة', student: 'الطالب', course: 'الدورة',
    actions: 'الإجراءات', confirmed: 'مؤكد', cancelled: 'ملغي', saveStatus: 'حفظ الحالة', edit: 'تعديل',
    cancelEdit: 'إلغاء التعديل', updateCourse: 'تحديث الدورة', courseSaved: 'تم حفظ الدورة.',
    accessDenied: 'ليس لديك صلاحية لعرض هذه الصفحة.', error: 'حدث خطأ. حاول مرة أخرى.',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

/** Small in-memory EN/AR service suitable for this MVP and easy for students to inspect. */
@Injectable({ providedIn: 'root' })
export class TranslationService {
  readonly language = signal<Language>((localStorage.getItem('codes-language') as Language) || 'en');
  readonly direction = computed(() => (this.language() === 'ar' ? 'rtl' : 'ltr'));

  /** Looks up one UI label in the active dictionary. */
  t(key: TranslationKey): string {
    return translations[this.language()][key];
  }

  /** Switches language, stores the choice, and immediately updates page direction. */
  toggleLanguage(): void {
    const nextLanguage = this.language() === 'en' ? 'ar' : 'en';
    this.language.set(nextLanguage);
    localStorage.setItem('codes-language', nextLanguage);
  }
}
