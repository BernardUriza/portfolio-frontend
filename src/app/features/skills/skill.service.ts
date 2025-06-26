import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SkillModel } from './models/skill.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private apiUrl = `${environment.apiRoot}/skills`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<SkillModel[]> {
    return this.http.get<SkillModel[]>(this.apiUrl);
  }
}
