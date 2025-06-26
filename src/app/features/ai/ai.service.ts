import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AiService {
  private apiUrl = `${environment.apiRoot}/ai/message`;
  private traceUrl = `${environment.apiRoot}/ai/trace`;

  constructor(private http: HttpClient) {}
  generateDynamicMessage(stack: string[]): Observable<string> {
    return this.http
      .post(this.apiUrl, { stack }, { responseType: 'text' as 'json' })
      .pipe(
        map((resp: any) => {
          // Si es string, regresa tal cual. Si es JSON, saca la propiedad 'message'.
          try {
            const obj = JSON.parse(resp);
            return obj.message || '';
          } catch {
            return resp;
          }
        })
      );
  }

  sendChatMessage(prompt: string): Observable<string> {
    return this.http
      .post(this.apiUrl, { prompt }, { responseType: 'text' as 'json' })
      .pipe(
        map((resp: any) => {
          try {
            const obj = JSON.parse(resp);
            return obj.message || '';
          } catch {
            return resp;
          }
        })
      );
  }

  sendTrace(info: string): Observable<string> {
    return this.http
      .post(this.traceUrl, { info }, { responseType: 'text' as 'json' })
      .pipe(
        map((resp: any) => {
          try {
            const obj = JSON.parse(resp);
            return obj.message || '';
          } catch {
            return resp;
          }
        })
      );
  }

}
