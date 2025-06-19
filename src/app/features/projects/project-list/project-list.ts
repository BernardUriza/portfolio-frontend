import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ProjectModel } from '../models/project.model';
import { ProjectViewerComponent } from '../project-viewer/project-viewer.component';
import { ProjectService } from '../project.service';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.html',
  standalone: true, 
  imports: [ProjectViewerComponent, DatePipe, CommonModule ], 
})
export class ProjectList {
  loading = false;
  projects: ProjectModel[] = [];
  selectedProject: ProjectModel | null = null;
  
  constructor(private projectService: ProjectService) {}

  ngOnInit() {
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
  }

  closeViewer() {
    this.selectedProject = null;
  }
  trackProject(index: number, project: ProjectModel): any {
    return project?.id ?? index;
  }
}
