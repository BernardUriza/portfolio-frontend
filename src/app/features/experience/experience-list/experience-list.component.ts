import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceService } from '../experience.service';
import { I18nService } from '../../../core/i18n.service';

@Component({
  selector: 'app-experience-list',
  standalone: true,
  templateUrl: './experience-list.component.html',
  styleUrls: ['./experience-list.component.scss'],
  imports: [CommonModule]
})
export class ExperienceListComponent implements OnInit {
  experiences;
  readonly translations = computed(() => this.i18n.t().EXPERIENCE_LIST);

  constructor(private expService: ExperienceService, private i18n: I18nService) {
    this.experiences = this.expService.experiences;
  }

  ngOnInit() {
    this.expService.fetchExperiences();
  }
}
