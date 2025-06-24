import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AiService {
  private apiUrl = 'https://portfolio-spring-1-jhxz.onrender.com/api/ai/message';

  constructor(private http: HttpClient) {}

  generateDynamicMessage(trail: string[]) {
    return this.http.post<{ message: string }>('/api/ai/message', { trail })
      .pipe(map(resp => typeof resp === 'string' ? resp : resp.message || ''));
  }
}
