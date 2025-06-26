import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectModel } from '../models/project.model';
import { ProjectViewerComponent } from '../project-viewer/project-viewer.component';
import { ProjectService } from '../project.service';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { StackTrailService } from '../../../stack-trail.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.html',
  standalone: true,
  imports: [ProjectViewerComponent, ProjectCardComponent, CommonModule],
})
export class ProjectList {
  loading = false;
  projects: ProjectModel[] = [];

  constructor(
    private projectService: ProjectService,
    private stackTrail: StackTrailService
  ) { }

  get selectedProject$() {
    return this.projectService.selectedProject$;
  }

  get aiMessage$() {
    return this.projectService.aiMessage$;
  }

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
  closeViewer() {
    this.projectService.selectProject(null);
  }

  selectProject(project: ProjectModel) {
    this.stackTrail.addStack(project.stack);
    this.projectService.selectProject(project);
  }


  trackProject(index: number, project: ProjectModel): any {
    return project?.id ?? index;
  }
}
