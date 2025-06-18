import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Signal, signal } from '@angular/core';
import { Experience } from './models/experience.model';

@Injectable({ providedIn: 'root' })
export class ExperienceService {
  private apiUrl = 'https://portfolio-spring-1-jhxz.onrender.com/api/experience';

  experiences = signal<Experience[]>([]);

  constructor(private http: HttpClient) {}

  fetchExperiences() {
    this.http.get<Experience[]>(this.apiUrl).subscribe({
      next: (data) => this.experiences.set(data),
      error: (err) => console.error('Error loading experiences', err)
    });
  }
}
