import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../core/translation.service';

/** Public landing page with one clear promise and one primary conversion path. */
@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <section class="relative isolate min-h-[calc(100vh-5rem)] overflow-hidden bg-ink text-cream">
      <div class="absolute inset-0 hero-grid opacity-25" aria-hidden="true"></div>
      <div class="absolute -bottom-48 -right-28 size-[38rem] rounded-full bg-coral/80 blur-3xl" aria-hidden="true"></div>
      <div class="absolute -left-20 top-20 size-80 rounded-full bg-mint/25 blur-3xl" aria-hidden="true"></div>

      <div class="page-shell relative flex min-h-[calc(100vh-5rem)] items-center py-20">
        <div class="max-w-5xl">
          <p class="motion-rise text-sm font-black tracking-[0.24em] text-mint">{{ i18n.t('heroEyebrow') }}</p>
          <p class="motion-rise motion-delay mt-6 font-display text-4xl font-black leading-none text-coral sm:text-6xl">Codes Training Center</p>
          <h1 class="motion-rise motion-delay-2 mt-5 max-w-4xl font-display text-5xl font-black leading-[0.95] sm:text-7xl lg:text-8xl">
            {{ i18n.t('heroTitle') }}
          </h1>
          <p class="motion-rise motion-delay-3 mt-8 max-w-2xl text-lg leading-8 text-cream/70 sm:text-xl">{{ i18n.t('heroText') }}</p>
          <div class="motion-rise motion-delay-3 mt-10 flex flex-wrap gap-4">
            <a routerLink="/courses" class="primary-button text-base">{{ i18n.t('exploreCourses') }} →</a>
            <a routerLink="/register" class="secondary-button text-base">{{ i18n.t('joinNow') }}</a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Home {
  readonly i18n = inject(TranslationService);
}
