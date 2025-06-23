import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ProjectModel } from '../models/project.model';
import { ProjectViewerComponent } from '../project-viewer/project-viewer.component';
import { ProjectService } from '../project.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.html',
  standalone: true,
  imports: [ProjectViewerComponent, DatePipe, CommonModule],
})
export class ProjectList {
  loading = false;
  projects: ProjectModel[] = [];
  selectedProject: ProjectModel | null = null;

  aiMessageLoading = false;
  dynamicMessage = '';
  
  constructor(
    private projectService: ProjectService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loading = true;
    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.loading = false;
      },
      error: () => {
        this.projects = [];
        this.loading = false;
      }
    });
  }

  selectProject(project: ProjectModel) {
    this.selectedProject = project;
    this.getAiMessage(project.stack);
  }

  closeViewer() {
    this.selectedProject = null;
    this.dynamicMessage = '';
  }

  getAiMessage(stack: string) {
    this.aiMessageLoading = true;
    this.dynamicMessage = '';
    this.http.post<{ message: string }>('/api/ai/message', { stack })
      .subscribe({
        next: (resp) => {
          this.dynamicMessage = typeof resp === 'string' ? resp : resp.message || '';
          this.aiMessageLoading = false;
        },
        error: () => {
          this.dynamicMessage = 'Failed to load AI message.';
          this.aiMessageLoading = false;
        }
      });
  }

  trackProject(index: number, project: ProjectModel): any {
    return project?.id ?? index;
  }
}
