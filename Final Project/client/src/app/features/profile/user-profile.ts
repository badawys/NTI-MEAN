import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { TranslationService } from '../../core/translation.service';

/**
 * Self-service account page for every authenticated role. Separate forms keep
 * ordinary profile edits independent from the more sensitive password workflow.
 */
@Component({
  selector: 'app-user-profile',
  imports: [ReactiveFormsModule],
  template: `
    <section class="page-shell py-16 sm:py-24">
      <p class="section-kicker">Codes Training Center</p>
      <h1 class="section-title">{{ i18n.t('profileTitle') }}</h1>
      <p class="section-copy">{{ i18n.t('profileIntro') }}</p>

      <div class="mt-14 grid gap-10 lg:grid-cols-2">
        <form class="form-panel" [formGroup]="detailsForm" (ngSubmit)="saveDetails()">
          <h2 class="font-display text-3xl font-black">{{ i18n.t('accountDetails') }}</h2>
          <label class="form-label">{{ i18n.t('name') }}<input class="form-input" formControlName="name" autocomplete="name"></label>
          <label class="form-label">{{ i18n.t('email') }}<input class="form-input" type="email" formControlName="email" autocomplete="email"></label>
          @if (detailsMessage()) { <p class="text-sm font-bold" [class.text-coral]="detailsError()">{{ detailsMessage() }}</p> }
          <button class="primary-button w-fit" type="submit" [disabled]="detailsSaving()">{{ i18n.t('saveChanges') }}</button>
        </form>

        <form class="form-panel" [formGroup]="passwordForm" (ngSubmit)="changePassword()">
          <h2 class="font-display text-3xl font-black">{{ i18n.t('passwordSecurity') }}</h2>
          <label class="form-label">{{ i18n.t('currentPassword') }}<input class="form-input" type="password" formControlName="currentPassword" autocomplete="current-password"></label>
          <label class="form-label">{{ i18n.t('newPassword') }}<input class="form-input" type="password" formControlName="newPassword" autocomplete="new-password"></label>
          <p class="text-sm text-ink/55">{{ i18n.t('passwordHint') }}</p>
          @if (passwordMessage()) { <p class="text-sm font-bold" [class.text-coral]="passwordError()">{{ passwordMessage() }}</p> }
          <button class="primary-button w-fit" type="submit" [disabled]="passwordSaving()">{{ i18n.t('changePassword') }}</button>
        </form>
      </div>
    </section>
  `,
})
export class UserProfile {
  private readonly fb = inject(FormBuilder);
  readonly auth = inject(AuthService);
  readonly i18n = inject(TranslationService);
  readonly detailsSaving = signal(false);
  readonly passwordSaving = signal(false);
  readonly detailsMessage = signal('');
  readonly passwordMessage = signal('');
  readonly detailsError = signal(false);
  readonly passwordError = signal(false);

  readonly detailsForm = this.fb.nonNullable.group({
    name: [this.auth.user()?.name ?? '', [Validators.required, Validators.minLength(2)]],
    email: [this.auth.user()?.email ?? '', [Validators.required, Validators.email]],
  });
  readonly passwordForm = this.fb.nonNullable.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
  });

  /** Saves name/email and updates the header immediately from the returned user. */
  saveDetails(): void {
    if (this.detailsForm.invalid) {
      this.detailsForm.markAllAsTouched();
      this.detailsError.set(true);
      this.detailsMessage.set(this.i18n.t('invalidForm'));
      return;
    }

    this.detailsSaving.set(true);
    this.auth.updateProfile(this.detailsForm.getRawValue()).subscribe({
      next: () => {
        this.detailsError.set(false);
        this.detailsMessage.set(this.i18n.t('profileSaved'));
      },
      error: (error) => {
        this.detailsError.set(true);
        this.detailsMessage.set(error.error?.message ?? this.i18n.t('error'));
        this.detailsSaving.set(false);
      },
      complete: () => this.detailsSaving.set(false),
    });
  }

  /** Verifies the existing password on the API before saving the new hash. */
  changePassword(): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      this.passwordError.set(true);
      this.passwordMessage.set(this.i18n.t('invalidForm'));
      return;
    }

    this.passwordSaving.set(true);
    this.auth.updateProfile(this.passwordForm.getRawValue()).subscribe({
      next: () => {
        this.passwordError.set(false);
        this.passwordMessage.set(this.i18n.t('passwordChanged'));
        this.passwordForm.reset();
      },
      error: (error) => {
        this.passwordError.set(true);
        this.passwordMessage.set(error.error?.message ?? this.i18n.t('error'));
        this.passwordSaving.set(false);
      },
      complete: () => this.passwordSaving.set(false),
    });
  }
}
