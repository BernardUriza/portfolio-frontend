import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { CommonModule } from '@angular/common';
import { ProjectModel } from '../models/project.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.html', 
  imports: [
    CommonModule
  ]
})
export class ProjectList implements OnInit {
  projects: ProjectModel[] = [];
  loading = true;

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

  trackProject(i: number, p: ProjectModel) {
    return p.id || i;
  }
}
