import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ProjectModel } from '../models/project.model';
import { ProjectViewerComponent } from '../project-viewer/project-viewer.component';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.html',
  standalone: true, // <--- Si es standalone
  imports: [ProjectViewerComponent, DatePipe, CommonModule ], 
})
export class ProjectListComponent {
  loading = false;
  projects: ProjectModel[] = [];
  selectedProject: ProjectModel | null = null;

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
