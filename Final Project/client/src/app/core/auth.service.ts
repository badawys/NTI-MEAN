import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import type { User } from './api.models';

interface AuthResponse { token: string; user: User }

/** Owns the current browser session and all authentication API calls. */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly apiUrl = 'http://localhost:3000/api/auth';
  readonly user = signal<User | null>(this.readStoredUser());

  /** Provides the interceptor with the token without exposing storage details. */
  getToken(): string | null {
    return localStorage.getItem('codes-token');
  }

  /** Creates a student account and stores the returned authenticated session. */
  register(data: { name: string; email: string; password: string }) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      tap((response) => this.storeSession(response)),
    );
  }

  /** Authenticates an existing account and stores the returned session. */
  login(data: { email: string; password: string }) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data).pipe(
      tap((response) => this.storeSession(response)),
    );
  }

  /** Updates profile data and immediately refreshes the name/email shown in the shell. */
  updateProfile(data: { name?: string; email?: string; currentPassword?: string; newPassword?: string }) {
    return this.http.patch<{ user: User }>(`${this.apiUrl}/me`, data).pipe(
      tap(({ user }) => {
        localStorage.setItem('codes-user', JSON.stringify(user));
        this.user.set(user);
      }),
    );
  }

  /** Removes both pieces of local session data and returns to the public home page. */
  logout(): void {
    localStorage.removeItem('codes-token');
    localStorage.removeItem('codes-user');
    this.user.set(null);
    void this.router.navigateByUrl('/');
  }

  /** Safely restores user display data when the page reloads. */
  private readStoredUser(): User | null {
    const stored = localStorage.getItem('codes-user');
    if (!stored) return null;

    try {
      return JSON.parse(stored) as User;
    } catch {
      localStorage.removeItem('codes-user');
      return null;
    }
  }

  /** Keeps token and user updates atomic for login and registration. */
  private storeSession(response: AuthResponse): void {
    localStorage.setItem('codes-token', response.token);
    localStorage.setItem('codes-user', JSON.stringify(response.user));
    this.user.set(response.user);
  }
}
