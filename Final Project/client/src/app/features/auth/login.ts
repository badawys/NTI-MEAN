import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { TranslationService } from '../../core/translation.service';

/** Reactive login form demonstrating validation, API errors, and role-aware redirect. */
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <section class="page-shell grid min-h-[calc(100vh-10rem)] items-center py-16 lg:grid-cols-2 lg:gap-20">
      <div class="hidden lg:block"><p class="section-kicker">Codes Training Center</p><h1 class="section-title">{{ i18n.t('login') }}</h1><p class="section-copy">{{ i18n.t('heroText') }}</p></div>
      <form class="form-panel" [formGroup]="form" (ngSubmit)="submit()">
        <h1 class="font-display text-4xl font-black lg:hidden">{{ i18n.t('login') }}</h1>
        <label class="form-label">{{ i18n.t('email') }}<input class="form-input" type="email" formControlName="email" autocomplete="email"></label>
        <label class="form-label">{{ i18n.t('password') }}<input class="form-input" type="password" formControlName="password" autocomplete="current-password"></label>
        @if (message()) { <p class="text-sm font-bold text-coral">{{ message() }}</p> }
        <button class="primary-button w-full" type="submit" [disabled]="submitting()">{{ i18n.t('login') }}</button>
        <p class="text-sm text-ink/60">{{ i18n.t('accountPrompt') }} <a routerLink="/register" class="font-black text-coral">{{ i18n.t('createAccount') }}</a></p>
      </form>
    </section>
  `,
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  readonly i18n = inject(TranslationService);
  readonly submitting = signal(false);
  readonly message = signal('');
  readonly form = this.fb.nonNullable.group({ email: ['', [Validators.required, Validators.email]], password: ['', Validators.required] });

  /** Validates locally, authenticates, then selects the landing page by role. */
  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); this.message.set(this.i18n.t('invalidForm')); return; }
    this.submitting.set(true);
    this.auth.login(this.form.getRawValue()).subscribe({
      next: ({ user }) => void this.router.navigateByUrl(user.role === 'student' ? '/courses' : '/admin'),
      error: (error) => { this.message.set(error.error?.message ?? this.i18n.t('error')); this.submitting.set(false); },
      complete: () => this.submitting.set(false),
    });
  }
}
