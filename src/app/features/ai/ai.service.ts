import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap, catchError } from 'rxjs';
import { TraceService } from '../../core/trace.service';

@Injectable({ providedIn: 'root' })
export class AiService {
  private apiUrl = 'https://portfolio-spring-1-jhxz.onrender.com/api/ai/message';
  private cache = new Map<string, string>();

  constructor(private http: HttpClient, private trace: TraceService) {}
  generateDynamicMessage(stack: string[]): Observable<string> {
    const key = stack.join('|');
    if (this.cache.has(key)) {
      this.trace.trace('ai cache hit', key);
      return of(this.cache.get(key)!);
    }
    this.trace.trace('ai cache miss', key);
    return this.http
      .post(this.apiUrl, { stack }, { responseType: 'text' as 'json' })
      .pipe(
        tap(() => this.trace.trace('ai request', stack)),
        map((resp: any) => {
          try {
            const obj = JSON.parse(resp);
            return obj.message || '';
          } catch {
            return resp;
          }
        }),
        tap(msg => {
          this.trace.trace('ai response', msg);
          this.cache.set(key, msg);
        }),
        catchError(err => {
          this.trace.trace('ai request error', err);
          throw err;
        })
      );
  }

}
