import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ProjectModel } from '../models/project.model';
import { ProjectViewerComponent } from '../project-viewer/project-viewer.component';
import { ProjectService } from '../project.service';
import { AiService } from '../../ai/ai.service';
import { StackTrailService } from '../../../stack-trail.service';
import { TraceService } from '../../../core/trace.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.html',
  standalone: true,
  imports: [ProjectViewerComponent, DatePipe, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectList {
  loading = false;
  projects: ProjectModel[] = [];
  selectedProject: ProjectModel | null = null;

  aiMessageLoading = false;
  dynamicMessage = '';

  constructor(
    private projectService: ProjectService,
    private aiService: AiService,
    private stackTrail: StackTrailService,
    private trace: TraceService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.trace.trace('projects fetched', projects);
        this.projects = projects;
        this.loading = false;
      },
      error: () => {
        this.trace.trace('projects fetch error');
        this.projects = [];
        this.loading = false;
      }
    });
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
