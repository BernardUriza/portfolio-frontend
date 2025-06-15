import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SkillModel } from './models/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private apiUrl = 'https://portfolio-spring-1-jhxz.onrender.com/api/skills';

  constructor(private http: HttpClient) {}

  getAll(): Observable<SkillModel[]> {
    return this.http.get<SkillModel[]>(this.apiUrl);
  }
}
