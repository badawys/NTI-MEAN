import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import type { Course } from '../../core/api.models';
import { AuthService } from '../../core/auth.service';
import { CourseService } from '../../core/course.service';
import { EnrollmentService } from '../../core/enrollment.service';
import { TranslationService } from '../../core/translation.service';

/** Shows a single course and connects its call-to-action to student registration. */
@Component({
  selector: 'app-course-detail',
  imports: [RouterLink],
  template: `
    <section class="page-shell py-16 sm:py-24">
      <a routerLink="/courses" class="text-button">← {{ i18n.t('backToCourses') }}</a>
      @if (course(); as item) {
        <div class="mt-12 grid gap-12 lg:grid-cols-[1fr_20rem]">
          <div>
            <p class="section-kicker">Codes Training Center</p>
            <h1 class="section-title max-w-4xl">{{ localizedTitle(item) }}</h1>
            <p class="mt-7 max-w-3xl text-xl leading-9 text-ink/65">{{ localizedSummary(item) }}</p>
          </div>
          <aside class="border-s-4 border-coral ps-7">
            <dl class="space-y-5">
              <div><dt class="text-xs font-black uppercase tracking-widest text-ink/45">{{ i18n.t('duration') }}</dt><dd class="mt-1 text-xl font-bold">{{ item.durationHours }} {{ i18n.t('hours') }}</dd></div>
              <div><dt class="text-xs font-black uppercase tracking-widest text-ink/45">{{ i18n.t('capacity') }}</dt><dd class="mt-1 text-xl font-bold">{{ item.capacity }}</dd></div>
              <div><dt class="text-xs font-black uppercase tracking-widest text-ink/45">{{ i18n.t('level') }}</dt><dd class="mt-1 text-xl font-bold">{{ item.level === 'Beginner' ? i18n.t('beginner') : i18n.t('intermediate') }}</dd></div>
            </dl>
            @if (auth.user()?.role === 'student') {
              <button type="button" class="primary-button mt-8 w-full" (click)="register(item._id)" [disabled]="submitting()">{{ i18n.t('registerCourse') }}</button>
            } @else if (!auth.user()) {
              <a routerLink="/login" class="primary-button mt-8 w-full">{{ i18n.t('signInFirst') }}</a>
            }
            @if (message()) { <p class="mt-4 text-sm font-bold" [class.text-coral]="hasError()">{{ message() }}</p> }
          </aside>
        </div>
      } @else {
        <p class="mt-12">{{ i18n.t('loading') }}</p>
      }
    </section>
  `,
})
export class CourseDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly courseService = inject(CourseService);
  private readonly enrollmentService = inject(EnrollmentService);
  readonly auth = inject(AuthService);
  readonly i18n = inject(TranslationService);
  readonly course = signal<Course | null>(null);
  readonly submitting = signal(false);
  readonly message = signal('');
  readonly hasError = signal(false);

  constructor() {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (!courseId) {
      void this.router.navigateByUrl('/courses');
      return;
    }

    this.courseService.getPublic(courseId).subscribe({
      next: ({ course }) => this.course.set(course),
      error: () => void this.router.navigateByUrl('/courses'),
    });
  }

  /** Sends one enrollment and provides immediate success/error feedback. */
  register(courseId: string): void {
    this.submitting.set(true);
    this.message.set('');
    this.enrollmentService.register(courseId).subscribe({
      next: () => {
        this.hasError.set(false);
        this.message.set(this.i18n.t('registrationSent'));
      },
      error: (error) => {
        this.hasError.set(true);
        this.message.set(error.error?.message ?? this.i18n.t('error'));
        this.submitting.set(false);
      },
      complete: () => this.submitting.set(false),
    });
  }

  localizedTitle(course: Course): string { return this.i18n.language() === 'ar' ? course.titleAr : course.titleEn; }
  localizedSummary(course: Course): string { return this.i18n.language() === 'ar' ? course.summaryAr : course.summaryEn; }
}
