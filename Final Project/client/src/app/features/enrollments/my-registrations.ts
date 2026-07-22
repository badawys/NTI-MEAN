import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { Course, Enrollment } from '../../core/api.models';
import { EnrollmentService } from '../../core/enrollment.service';
import { TranslationService } from '../../core/translation.service';

/** Student-owned list of course registrations and their review status. */
@Component({
  selector: 'app-my-registrations',
  imports: [DatePipe, RouterLink],
  template: `
    <section class="page-shell py-16 sm:py-24">
      <p class="section-kicker">Codes Training Center</p>
      <h1 class="section-title">{{ i18n.t('myRegistrations') }}</h1>
      @if (loading()) {
        <p class="mt-12">{{ i18n.t('loading') }}</p>
      } @else if (enrollments().length === 0) {
        <div class="mt-12 border-y border-ink/15 py-12">
          <p class="text-ink/60">{{ i18n.t('noRegistrations') }}</p>
          <a routerLink="/courses" class="primary-button mt-6">{{ i18n.t('exploreCourses') }}</a>
        </div>
      } @else {
        <div class="mt-12 divide-y divide-ink/15 border-y border-ink/15">
          @for (enrollment of enrollments(); track enrollment._id) {
            <article class="grid gap-4 py-7 sm:grid-cols-[1fr_auto] sm:items-center">
              <div><h2 class="font-display text-2xl font-black">{{ courseTitle(enrollment.course) }}</h2><p class="mt-2 text-sm text-ink/50">{{ i18n.t('registeredOn') }} {{ enrollment.createdAt | date:'mediumDate' }}</p></div>
              <span class="status-label" [attr.data-status]="enrollment.status">{{ statusLabel(enrollment.status) }}</span>
            </article>
          }
        </div>
      }
    </section>
  `,
})
export class MyRegistrations {
  private readonly enrollmentService = inject(EnrollmentService);
  readonly i18n = inject(TranslationService);
  readonly enrollments = signal<Enrollment[]>([]);
  readonly loading = signal(true);

  constructor() {
    this.enrollmentService.listMine().subscribe({
      next: ({ enrollments }) => this.enrollments.set(enrollments),
      complete: () => this.loading.set(false),
      error: () => this.loading.set(false),
    });
  }

  /** Selects the course's matching language field. */
  courseTitle(course: Course): string { return this.i18n.language() === 'ar' ? course.titleAr : course.titleEn; }

  /** Maps API status values to translated, user-friendly labels. */
  statusLabel(status: Enrollment['status']): string {
    return this.i18n.t(status);
  }
}
