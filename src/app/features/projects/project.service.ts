import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap, shareReplay } from 'rxjs/operators';
import { ProjectModel } from './models/project.model';
import { AiMessageService } from './ai-message.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = `${environment.apiRoot}/projects`;

  private projectsSubject = new BehaviorSubject<ProjectModel[]>([]);
  readonly projects$ = this.projectsSubject.asObservable().pipe(shareReplay(1));

  private selectedProjectSubject = new BehaviorSubject<ProjectModel | null>(null);
  readonly selectedProject$ = this.selectedProjectSubject.asObservable();

  private aiMessageSubject = new BehaviorSubject<string | null>(null);
  readonly aiMessage$ = this.aiMessageSubject.asObservable();

  constructor(private http: HttpClient, private aiMessage: AiMessageService) {}

  getProjects(): Observable<ProjectModel[]> {
    if (this.projectsSubject.value.length === 0) {
      return this.http.get<ProjectModel[]>(this.apiUrl).pipe(
        tap(projects => this.projectsSubject.next(projects)),
        catchError(err => {
          this.projectsSubject.next([]);
          return of([]);
        }),
        shareReplay(1)
      );
    } else {
      return this.projects$;
    }
  }
  
  private refreshProjects(): void {
    this.http.get<ProjectModel[]>(this.apiUrl).pipe(
      tap(projects => this.projectsSubject.next(projects)),
      catchError(err => {
        this.projectsSubject.next([]);
        return of([]);
      })
    ).subscribe();
  }

  createProject(project: ProjectModel): Observable<ProjectModel> {
    return this.http.post<ProjectModel>(this.apiUrl, project).pipe(
      tap(() => this.refreshProjects())
    );
  }

  updateProject(id: number, project: ProjectModel): Observable<ProjectModel> {
    return this.http.put<ProjectModel>(`${this.apiUrl}/${id}`, project).pipe(
      tap(() => this.refreshProjects())
    );
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.refreshProjects())
    );
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

  /** 
   * Si necesitas forzar un refresco manual
   */
  forceRefresh(): void {
    this.refreshProjects();
  }
}
