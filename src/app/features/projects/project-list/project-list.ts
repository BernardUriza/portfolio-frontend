import { Component, OnInit } from '@angular/core';
import { ProjectService, Project } from '../project.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-project-list',
  standalone: true,
  templateUrl: './project-list.html',
  styleUrls: ['./project-list.scss'],
  imports: [CommonModule] 
})
export class ProjectList implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => this.projects = data,
      error: (err) => console.error('Error loading projects', err)
    });
  }
}
