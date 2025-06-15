import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { CommonModule } from '@angular/common';
import { ProjectModel } from '../models/project.model';

@Component({
  standalone: true,
  selector: 'app-project-list',
  imports: [CommonModule],
  templateUrl: './project-list.html',
  styleUrl: './project-list.scss'
})
export class ProjectList {
  projects: ProjectModel[] = [];
  error = '';

  constructor(private service: ProjectService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: data => this.projects = data,
      error: () => this.error = 'Failed to load projects'
    });
  }
}
