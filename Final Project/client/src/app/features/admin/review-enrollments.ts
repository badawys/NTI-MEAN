import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import type { Enrollment, EnrollmentStatus } from '../../core/api.models';
import { AuthService } from '../../core/auth.service';
import { EnrollmentService } from '../../core/enrollment.service';
import { TranslationService } from '../../core/translation.service';

/** Review queue lets managers read and admins update the small status workflow. */
@Component({
  selector: 'app-review-enrollments',
  imports: [DatePipe],
  template: `
    <section class="page-shell py-16 sm:py-24">
      <p class="section-kicker">Codes Training Center</p>
      <h1 class="section-title">{{ i18n.t('reviewEnrollments') }}</h1>
      <div class="mt-12 overflow-x-auto border-y border-ink/15">
        <table class="data-table">
          <thead><tr><th>{{ i18n.t('student') }}</th><th>{{ i18n.t('course') }}</th><th>{{ i18n.t('registeredOn') }}</th><th>{{ i18n.t('status') }}</th><th>{{ i18n.t('actions') }}</th></tr></thead>
          <tbody>
            @for (enrollment of enrollments(); track enrollment._id) {
              <tr>
                <td><strong>{{ enrollment.student?.name }}</strong><span>{{ enrollment.student?.email }}</span></td>
                <td>{{ i18n.language() === 'ar' ? enrollment.course.titleAr : enrollment.course.titleEn }}</td>
                <td>{{ enrollment.createdAt | date:'mediumDate' }}</td>
                <td><span class="status-label" [attr.data-status]="enrollment.status">{{ i18n.t(enrollment.status) }}</span></td>
                <td>
                  @if (auth.user()?.role === 'admin') {
                    <div class="flex min-w-64 gap-2"><select class="form-input py-2" #status [value]="enrollment.status"><option value="pending">{{ i18n.t('pending') }}</option><option value="confirmed">{{ i18n.t('confirmed') }}</option><option value="cancelled">{{ i18n.t('cancelled') }}</option></select><button type="button" class="text-button" (click)="update(enrollment._id, status.value)">{{ i18n.t('saveStatus') }}</button></div>
                  } @else { — }
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </section>
  `,
})
export class ReviewEnrollments {
  private readonly enrollmentService = inject(EnrollmentService);
  readonly auth = inject(AuthService);
  readonly i18n = inject(TranslationService);
  readonly enrollments = signal<Enrollment[]>([]);

  constructor() { this.load(); }

  /** Reloads the populated student/course records used by the table. */
  private load(): void {
    this.enrollmentService.listAll().subscribe({ next: ({ enrollments }) => this.enrollments.set(enrollments) });
  }

  /** Converts the select value to the known union after the native option list constrains it. */
  update(id: string, status: string): void {
    this.enrollmentService.updateStatus(id, status as EnrollmentStatus).subscribe({ next: () => this.load() });
  }
}
