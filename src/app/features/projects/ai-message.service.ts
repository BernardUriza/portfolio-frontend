import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AiMessageService {
  private apiUrl = `${environment.apiRoot}/projects`;
  private cache = new Map<number, string>();

  constructor(private http: HttpClient) {}

  getProjectMessage(projectId: number): Observable<string> {
    const cached = this.cache.get(projectId);
    if (cached) {
      return of(cached);
    }
    return this.http
      .get(`${this.apiUrl}/${projectId}/ai-message`, { responseType: 'text' })
      .pipe(
        tap(msg => this.cache.set(projectId, msg)),
        catchError(() => of(''))
      );
  }
}
