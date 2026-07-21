import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth.service';
import { TranslationService } from './core/translation.service';

/**
 * Root shell shared by every page. It owns global navigation, language direction,
 * and session controls while feature components focus on one workflow each.
 */
@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
})
export class App {
  readonly auth = inject(AuthService);
  readonly i18n = inject(TranslationService);

  /** Ends the local session; protected guards redirect on the next navigation. */
  logout(): void {
    this.auth.logout();
  }
}
