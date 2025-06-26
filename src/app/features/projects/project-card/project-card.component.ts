import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ProjectModel } from '../models/project.model';
import { ProjectService } from '../project.service';
import { StackTrailService } from '../../../stack-trail.service';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './project-card.component.html'
})
export class ProjectCardComponent {
  @Input() project!: ProjectModel;

  constructor(private projectService: ProjectService, private stackTrail: StackTrailService) {}

  select() {
    this.stackTrail.addStack(this.project.stack);
    this.projectService.selectProject(this.project);
  }
}
