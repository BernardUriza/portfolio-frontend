import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceService } from '../experience.service';

@Component({
  selector: 'app-experience-list',
  standalone: true,
  templateUrl: './experience-list.component.html',
  styleUrls: ['./experience-list.component.scss'],
  imports: [CommonModule]
})
export class ExperienceListComponent implements OnInit {
  experiences;

  constructor(private expService: ExperienceService) {
    this.experiences = this.expService.experiences;
  }

  ngOnInit() {
    this.expService.fetchExperiences();
  }
}
