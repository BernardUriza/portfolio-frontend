import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ProjectModel } from '../models/project.model';
import { ProjectViewerComponent } from '../project-viewer/project-viewer.component';
import { ProjectService } from '../project.service';
import { StackTrailService } from '../../../stack-trail.service';
import { TraceService } from '../../../core/trace.service';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { takeUntil, tap, catchError, shareReplay } from 'rxjs/operators';
import { AiService } from '../../ai/ai.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.html',
  standalone: true,
  imports: [ProjectViewerComponent, DatePipe, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectList implements OnInit {
  readonly loading$ = new BehaviorSubject(true);
  readonly error$ = new BehaviorSubject(false);
  projects$: Observable<ProjectModel[]> = of([]);
  readonly selectedProject$: Observable<ProjectModel | null>;

  aiMessageLoading = false;
  dynamicMessage = '';

  private destroy$ = new Subject<void>();

  constructor(
    private projectService: ProjectService,
    private aiService: AiService,
    private stackTrail: StackTrailService,
    private trace: TraceService
  ) {
    this.selectedProject$ = this.projectService.selectedProject$;
  }
  
  ngOnInit() {
    this.trace.trace('projects fetch start');
    this.loading$.next(true);
    this.projects$ = this.projectService.getProjects(true).pipe( // 'true' para forzar fetch
      tap(projects => {
        this.trace.trace('projects fetch success', projects.length);
        this.loading$.next(false);
      }),
      catchError(err => {
        this.trace.trace('projects fetch error', err);
        this.error$.next(true);
        this.loading$.next(false);
        return of([]);
      }),
      takeUntil(this.destroy$),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  closeViewer() {
    this.projectService.selectProject(null);
  }

  selectProject(project: ProjectModel) {
    this.trace.trace('project selected', project);
    this.stackTrail.addStack(project.stack);
    this.projectService.selectProject(project);
  }

  getAiMessage() {
    this.aiMessageLoading = true;
    const trail = this.stackTrail.getTrail();
    this.trace.trace('ai message request', trail);

    this.aiService.generateDynamicMessage(trail)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resp) => {
          this.trace.trace('ai message success', resp);
          this.dynamicMessage = resp;
          this.aiMessageLoading = false;
        },
        error: () => {
          this.trace.trace('ai message error');
          this.dynamicMessage = 'Failed to load AI message.';
          this.aiMessageLoading = false;
        }
      });
  }

  trackProject(index: number, project: ProjectModel): any {
    return project?.id ?? index;
  }
}