import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProjectModel } from './models/project.model';
import { AiMessageService } from './ai-message.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'https://portfolio-spring-1-jhxz.onrender.com/api/projects';

  private selectedProjectSubject = new BehaviorSubject<ProjectModel | null>(null);
  readonly selectedProject$ = this.selectedProjectSubject.asObservable();

  private aiMessageSubject = new BehaviorSubject<string | null>(null);
  readonly aiMessage$ = this.aiMessageSubject.asObservable();

  constructor(private http: HttpClient, private aiMessage: AiMessageService) {}

  getProjects(): Observable<ProjectModel[]> {
    return this.http.get<ProjectModel[]>(this.apiUrl);
  }

  createProject(project: ProjectModel): Observable<ProjectModel> {
    return this.http.post<ProjectModel>(this.apiUrl, project);
  }

  updateProject(id: number, project: ProjectModel): Observable<ProjectModel> {
    return this.http.put<ProjectModel>(`${this.apiUrl}/${id}`, project);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  selectProject(project: ProjectModel | null): void {
    this.selectedProjectSubject.next(project);
    if (project?.id != null) {
      this.aiMessageSubject.next(null);
      this.aiMessage
        .getProjectMessage(project.id)
        .pipe(tap(msg => this.aiMessageSubject.next(msg)))
        .subscribe();
    } else {
      this.aiMessageSubject.next(null);
    }
  }
}
