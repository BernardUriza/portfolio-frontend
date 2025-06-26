import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Signal, signal } from '@angular/core';
import { Experience } from './models/experience.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ExperienceService {
  private apiUrl = `${environment.apiRoot}/experience`;

  experiences = signal<Experience[]>([]);

  constructor(private http: HttpClient) {}

  fetchExperiences() {
    this.http.get<Experience[]>(this.apiUrl).subscribe({
      next: (data) => this.experiences.set(data),
      error: (err) => console.error('Error loading experiences', err)
    });
  }
}
