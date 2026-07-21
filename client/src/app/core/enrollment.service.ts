import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { DashboardSummary, Enrollment, EnrollmentStatus } from './api.models';

/** Centralizes student and admin enrollment workflows. */
@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/enrollments';

  register(courseId: string) { return this.http.post<{ enrollment: Enrollment }>(this.apiUrl, { courseId }); }
  listMine() { return this.http.get<{ enrollments: Enrollment[] }>(`${this.apiUrl}/mine`); }
  listAll() { return this.http.get<{ enrollments: Enrollment[] }>(`${this.apiUrl}/admin`); }
  getSummary() { return this.http.get<DashboardSummary>(`${this.apiUrl}/summary`); }
  updateStatus(id: string, status: EnrollmentStatus) {
    return this.http.patch<{ enrollment: Enrollment }>(`${this.apiUrl}/${id}`, { status });
  }
}
