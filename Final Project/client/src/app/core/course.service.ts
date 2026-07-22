import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { Course } from './api.models';

/** Centralizes course HTTP requests so components contain presentation logic only. */
@Injectable({ providedIn: 'root' })
export class CourseService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/courses';

  listPublic() { return this.http.get<{ courses: Course[] }>(this.apiUrl); }
  getPublic(id: string) { return this.http.get<{ course: Course }>(`${this.apiUrl}/${id}`); }
  listAll() { return this.http.get<{ courses: Course[] }>(`${this.apiUrl}/admin`); }
  create(data: Omit<Course, '_id' | 'archived'>) { return this.http.post<{ course: Course }>(this.apiUrl, data); }
  update(id: string, data: Partial<Omit<Course, '_id' | 'archived'>>) {
    return this.http.patch<{ course: Course }>(`${this.apiUrl}/${id}`, data);
  }
  archive(id: string) { return this.http.delete<{ course: Course }>(`${this.apiUrl}/${id}`); }
  unarchive(id: string) { return this.http.patch<{ course: Course }>(`${this.apiUrl}/${id}/unarchive`, {}); }
}
