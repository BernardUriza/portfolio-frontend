import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ProjectModel } from '../models/project.model';
import { ProjectViewerComponent } from '../project-viewer/project-viewer.component';
import { ProjectService } from '../project.service';
import { AiService } from '../../ai/ai.service';
import { StackTrailService } from '../../../stack-trail.service';
import { TraceService } from '../../../core/trace.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.html',
  standalone: true,
  imports: [ProjectViewerComponent, DatePipe, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectList implements OnInit, OnDestroy {
  readonly loading$ = new BehaviorSubject(true);
  readonly projects$ = new BehaviorSubject<ProjectModel[]>([]);
  readonly error$ = new BehaviorSubject(false);
  selectedProject: ProjectModel | null = null;

  aiMessageLoading = false;
  dynamicMessage = '';

  private destroy$ = new Subject<void>();

  constructor(
    private projectService: ProjectService,
    private aiService: AiService,
    private stackTrail: StackTrailService,
    private trace: TraceService
  ) { }

  ngOnInit() {
    this.trace.trace('projects fetch start');
    this.projectService
      .getProjects()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (projects) => {
          this.trace.trace('projects fetch success', projects.length);
          this.projects$.next(projects);
          this.loading$.next(false);
        },
        error: (err) => {
          this.trace.trace('projects fetch error', err);
          this.error$.next(true);
          this.loading$.next(false);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  closeViewer() {
    this.selectedProject = null;
    this.dynamicMessage = '';
  }

  selectProject(project: ProjectModel) {
    this.trace.trace('project selected', project);
    this.selectedProject = project;
    this.stackTrail.addStack(project.stack);
    this.getAiMessage();
  }

  getAiMessage() {
    this.aiMessageLoading = true;
    const trail = this.stackTrail.getTrail();
    this.trace.trace('ai message request', trail);
    this.aiService.generateDynamicMessage(trail).subscribe({
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
