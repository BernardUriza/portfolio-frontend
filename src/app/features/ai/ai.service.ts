import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AiService {
  private apiUrl = 'https://portfolio-spring-1-jhxz.onrender.com/api/ai/message';

  constructor(private http: HttpClient) {}

  generateDynamicMessage(stack: string): Observable<string> {
    return this.http.post(this.apiUrl, { stack }, { responseType: 'text' });
  }
}
