import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { DashboardSummary } from '../../core/api.models';
import { AuthService } from '../../core/auth.service';
import { EnrollmentService } from '../../core/enrollment.service';
import { TranslationService } from '../../core/translation.service';

/** Compact operational overview for admins and read-only managers. */
@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterLink],
  template: `
    <section class="page-shell py-16 sm:py-24">
      <p class="section-kicker">Codes Training Center</p>
      <h1 class="section-title">{{ i18n.t('adminOverview') }}</h1>
      <p class="section-copy">{{ i18n.t('adminText') }}</p>

      @if (summary(); as stats) {
        <dl class="mt-14 grid border-y border-ink/15 sm:grid-cols-2 lg:grid-cols-4">
          <div class="metric"><dt>{{ i18n.t('totalCourses') }}</dt><dd>{{ stats.courses }}</dd></div>
          <div class="metric"><dt>{{ i18n.t('published') }}</dt><dd>{{ stats.publishedCourses }}</dd></div>
          <div class="metric"><dt>{{ i18n.t('totalEnrollments') }}</dt><dd>{{ stats.enrollments }}</dd></div>
          <div class="metric"><dt>{{ i18n.t('pending') }}</dt><dd>{{ stats.pendingEnrollments }}</dd></div>
        </dl>
      }

      <div class="mt-14 flex flex-wrap gap-4">
        @if (auth.user()?.role === 'admin') { <a routerLink="/admin/courses" class="primary-button">{{ i18n.t('manageCourses') }}</a> }
        <a routerLink="/admin/enrollments" class="secondary-button border-ink text-ink hover:bg-ink hover:text-cream">{{ i18n.t('reviewEnrollments') }}</a>
      </div>
    </section>
  `,
})
export class AdminDashboard {
  private readonly enrollmentService = inject(EnrollmentService);
  readonly auth = inject(AuthService);
  readonly i18n = inject(TranslationService);
  readonly summary = signal<DashboardSummary | null>(null);

  constructor() {
    this.enrollmentService.getSummary().subscribe({ next: (summary) => this.summary.set(summary) });
  }
}
