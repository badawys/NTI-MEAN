import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import type { Course } from '../../core/api.models';
import { CourseService } from '../../core/course.service';
import { TranslationService } from '../../core/translation.service';

/** Admin CRUD screen intentionally combines the short form and list for an MVP workflow. */
@Component({
  selector: 'app-manage-courses',
  imports: [ReactiveFormsModule],
  template: `
    <section class="page-shell py-16 sm:py-24">
      <p class="section-kicker">Codes Training Center</p>
      <h1 class="section-title">{{ i18n.t('manageCourses') }}</h1>

      <div class="mt-12 grid gap-12 xl:grid-cols-[26rem_1fr]">
        <form class="form-panel self-start" [formGroup]="form" (ngSubmit)="save()">
          <h2 class="font-display text-3xl font-black">{{ editingId() ? i18n.t('updateCourse') : i18n.t('addCourse') }}</h2>
          <label class="form-label">{{ i18n.t('titleEn') }}<input class="form-input" formControlName="titleEn"></label>
          <label class="form-label">{{ i18n.t('titleAr') }}<input class="form-input" formControlName="titleAr" dir="rtl"></label>
          <label class="form-label">{{ i18n.t('summaryEn') }}<textarea class="form-input min-h-24" formControlName="summaryEn"></textarea></label>
          <label class="form-label">{{ i18n.t('summaryAr') }}<textarea class="form-input min-h-24" formControlName="summaryAr" dir="rtl"></textarea></label>
          <div class="grid grid-cols-2 gap-4">
            <label class="form-label">{{ i18n.t('duration') }}<input class="form-input" type="number" formControlName="durationHours"></label>
            <label class="form-label">{{ i18n.t('capacity') }}<input class="form-input" type="number" formControlName="capacity"></label>
          </div>
          <label class="form-label">{{ i18n.t('level') }}<select class="form-input" formControlName="level"><option value="Beginner">{{ i18n.t('beginner') }}</option><option value="Intermediate">{{ i18n.t('intermediate') }}</option></select></label>
          <label class="flex items-center gap-3 text-sm font-bold"><input class="size-5 accent-coral" type="checkbox" formControlName="published">{{ i18n.t('isPublished') }}</label>
          @if (message()) { <p class="text-sm font-bold text-coral">{{ message() }}</p> }
          <div class="flex flex-wrap gap-3">
            <button class="primary-button" type="submit">{{ editingId() ? i18n.t('updateCourse') : i18n.t('save') }}</button>
            @if (editingId()) { <button class="text-button" type="button" (click)="cancelEdit()">{{ i18n.t('cancelEdit') }}</button> }
          </div>
        </form>

        <div class="divide-y divide-ink/15 border-y border-ink/15">
          @for (course of courses(); track course._id) {
            <article class="py-6">
              <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div><h2 class="font-display text-2xl font-black">{{ course.titleEn }}</h2><p class="mt-1 text-lg font-bold text-ink/60" dir="rtl">{{ course.titleAr }}</p><p class="mt-3 text-sm text-ink/50">{{ course.published ? i18n.t('published') : i18n.t('draft') }} · {{ course.archived ? i18n.t('archived') : course.capacity + ' ' + i18n.t('capacity') }}</p></div>
                @if (!course.archived) {
                  <div class="flex gap-2"><button type="button" class="text-button" (click)="startEdit(course)">{{ i18n.t('edit') }}</button><button type="button" class="text-button text-coral" (click)="archive(course._id)">{{ i18n.t('archive') }}</button></div>
                } @else {
                  <button type="button" class="text-button text-coral" (click)="unarchive(course._id)">{{ i18n.t('unarchive') }}</button>
                }
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class ManageCourses {
  private readonly fb = inject(FormBuilder);
  private readonly courseService = inject(CourseService);
  readonly i18n = inject(TranslationService);
  readonly courses = signal<Course[]>([]);
  readonly editingId = signal<string | null>(null);
  readonly message = signal('');
  readonly form = this.fb.nonNullable.group({
    titleEn: ['', [Validators.required, Validators.minLength(3)]], titleAr: ['', [Validators.required, Validators.minLength(3)]],
    summaryEn: ['', [Validators.required, Validators.minLength(10)]], summaryAr: ['', [Validators.required, Validators.minLength(10)]],
    durationHours: [6, [Validators.required, Validators.min(1)]], capacity: [20, [Validators.required, Validators.min(1)]],
    level: ['Beginner' as Course['level'], Validators.required], published: [false],
  });

  constructor() { this.loadCourses(); }

  /** Loads drafts, published, and archived records after every mutation. */
  private loadCourses(): void {
    this.courseService.listAll().subscribe({ next: ({ courses }) => this.courses.set(courses) });
  }

  /** Creates a new course or updates the selected one using the same validated form. */
  save(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); this.message.set(this.i18n.t('invalidForm')); return; }
    const request = this.editingId()
      ? this.courseService.update(this.editingId()!, this.form.getRawValue())
      : this.courseService.create(this.form.getRawValue());
    request.subscribe({
      next: () => { this.message.set(this.i18n.t('courseSaved')); this.cancelEdit(); this.loadCourses(); },
      error: (error) => this.message.set(error.error?.message ?? this.i18n.t('error')),
    });
  }

  /** Copies one list item into the form so students can see the edit lifecycle. */
  startEdit(course: Course): void {
    this.editingId.set(course._id);
    this.form.setValue({
      titleEn: course.titleEn, titleAr: course.titleAr, summaryEn: course.summaryEn, summaryAr: course.summaryAr,
      durationHours: course.durationHours, capacity: course.capacity, level: course.level, published: course.published,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /** Leaves edit mode and resets predictable starter values. */
  cancelEdit(): void {
    this.editingId.set(null);
    this.form.reset({ durationHours: 6, capacity: 20, level: 'Beginner', published: false });
  }

  /** Calls the non-destructive archive endpoint, then refreshes the list. */
  archive(id: string): void {
    this.courseService.archive(id).subscribe({ next: () => this.loadCourses() });
  }

  /** Restores an archived course as a safe unpublished draft. */
  unarchive(id: string): void {
    this.courseService.unarchive(id).subscribe({ next: () => this.loadCourses() });
  }
}
