import { Component, OnInit, signal } from '@angular/core';
import { ProjectService, Project } from '../project.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/auth/auth.service';
@Component({
  selector: 'app-project-list',
  standalone: true,
  templateUrl: './project-list.html',
  styleUrls: ['./project-list.scss'],
  imports: [CommonModule]
})
export class ProjectList implements OnInit {
  projects: Project[] = [];
  showForm = signal(false);

  // Campos del formulario (podrías usar signals para cada uno)
  newProject: Partial<Project> = { title: '', description: '', stack: [] };

  constructor(
    private projectService: ProjectService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => this.projects = data,
      error: (err) => console.error('Error loading projects', err)
    });
  }

  agregarProyecto() {
    this.showForm.set(true);
  }

  cancelarAgregar() {
    this.showForm.set(false);
    this.newProject = { title: '', description: '', stack: [] };
  }

  guardarProyecto() {
    // Lógica real: podrías usar projectService.addProject(this.newProject)
    // Aquí solo lo agrego local para demo:
    this.projects.push({
      id: Date.now(),
      title: this.newProject.title!,
      description: this.newProject.description!,
      stack: this.newProject.stack as string[]
    });
    this.cancelarAgregar();
  }
}
