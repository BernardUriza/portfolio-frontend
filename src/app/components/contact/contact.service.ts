import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private url = `${environment.apiRoot}/contacts`;

  constructor(private http: HttpClient) {}

  sendContact(payload: ContactPayload): Observable<any> {
    return this.http.post(this.url, payload);
  }
}
