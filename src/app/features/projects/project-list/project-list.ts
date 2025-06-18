import { Component, OnInit } from '@angular/core';
import { ProjectService, Project } from '../project.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/auth/auth.service';
import { signal } from '@angular/core';
@Component({
  selector: 'app-project-list',
  standalone: true,
  templateUrl: './project-list.html',
  styleUrls: ['./project-list.scss'],
  imports: [CommonModule] 
})
export class ProjectList implements OnInit {
projects = signal<Project[]>([]);

  constructor(private projectService: ProjectService,
  public authService: AuthService) {}

ngOnInit(): void {
  this.projectService.getProjects().subscribe({
    next: (data) => this.projects.set(data),
    error: (err) => console.error('Error loading projects', err)
  });
}
}
