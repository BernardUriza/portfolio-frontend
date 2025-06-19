import { Component, OnInit, signal } from '@angular/core';
import { ProjectService } from '../project.service';
import { CommonModule } from '@angular/common';
import { ProjectModel } from '../models/project.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  selectedProject: ProjectModel | null = null;
  safeUrl: SafeResourceUrl | null = null;

  constructor(private projectService: ProjectService, private sanitizer: DomSanitizer) {}

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

  openIframe(project: ProjectModel) {
    this.selectedProject = project;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(project.link);
    setTimeout(() => {
      document.getElementById('project-viewer')?.scrollIntoView({ behavior: 'smooth' });
    }, 10);
  }
  closeIframe() {
    this.selectedProject = null;
    this.safeUrl = null;
  }

}
