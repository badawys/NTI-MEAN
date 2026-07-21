import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { Course } from '../../core/api.models';
import { CourseService } from '../../core/course.service';
import { TranslationService } from '../../core/translation.service';

/** Fetches and presents the public course catalog with localized course content. */
@Component({
  selector: 'app-course-list',
  imports: [RouterLink],
  template: `
    <section class="page-shell py-16 sm:py-24">
      <p class="section-kicker">Codes Training Center</p>
      <h1 class="section-title">{{ i18n.t('availableCourses') }}</h1>
      <p class="section-copy">{{ i18n.t('availableText') }}</p>

      @if (loading()) {
        <p class="mt-16 text-ink/55">{{ i18n.t('loading') }}</p>
      } @else if (courses().length === 0) {
        <p class="mt-16 border-y border-ink/10 py-12 text-ink/55">{{ i18n.t('noCourses') }}</p>
      } @else {
        <div class="mt-14 divide-y divide-ink/15 border-y border-ink/15">
          @for (course of courses(); track course._id; let index = $index) {
            <article class="group grid gap-5 py-8 sm:grid-cols-[5rem_1fr_auto] sm:items-center">
              <span class="font-display text-4xl font-black text-coral/40">0{{ index + 1 }}</span>
              <div>
                <p class="mb-2 text-xs font-black uppercase tracking-[0.2em] text-ink/45">
                  {{ course.level === 'Beginner' ? i18n.t('beginner') : i18n.t('intermediate') }} · {{ course.durationHours }} {{ i18n.t('hours') }}
                </p>
                <h2 class="font-display text-3xl font-black">{{ localizedTitle(course) }}</h2>
                <p class="mt-3 max-w-2xl leading-7 text-ink/65">{{ localizedSummary(course) }}</p>
              </div>
              <a [routerLink]="['/courses', course._id]" class="primary-button w-fit">{{ i18n.t('viewCourse') }}</a>
            </article>
          }
        </div>
      }
    </section>
  `,
})
export class CourseList {
  private readonly courseService = inject(CourseService);
  readonly i18n = inject(TranslationService);
  readonly courses = signal<Course[]>([]);
  readonly loading = signal(true);

  constructor() {
    // The subscription is finite because Angular HttpClient completes after one response.
    this.courseService.listPublic().subscribe({
      next: ({ courses }) => this.courses.set(courses),
      error: () => this.loading.set(false),
      complete: () => this.loading.set(false),
    });
  }

  /** Chooses stored bilingual content without duplicating templates. */
  localizedTitle(course: Course): string {
    return this.i18n.language() === 'ar' ? course.titleAr : course.titleEn;
  }

  localizedSummary(course: Course): string {
    return this.i18n.language() === 'ar' ? course.summaryAr : course.summaryEn;
  }
}
