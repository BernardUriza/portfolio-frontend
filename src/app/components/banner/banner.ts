import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../features/projects/project.service';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.html',
  styleUrl: './banner.scss'
})
export class Banner {
  constructor(public projectService: ProjectService) {}
}
