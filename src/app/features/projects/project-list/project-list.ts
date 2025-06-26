import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ProjectModel } from '../models/project.model';
import { ProjectViewerComponent } from '../project-viewer/project-viewer.component';
import { ProjectService } from '../project.service';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { StackTrailService } from '../../../stack-trail.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.html',
  standalone: true,
  imports: [ProjectViewerComponent, ProjectCardComponent, DatePipe, CommonModule],
})
export class ProjectList {
  loading = false;
  projects: ProjectModel[] = [];
  readonly selectedProject$ = this.projectService.selectedProject$;
  readonly aiMessage$ = this.projectService.aiMessage$;

  constructor(
    private projectService: ProjectService,
    private stackTrail: StackTrailService
  ) { }

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
