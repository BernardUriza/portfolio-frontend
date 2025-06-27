import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../core/i18n.service';

@Component({
  selector: 'app-services',
  imports: [CommonModule],
  templateUrl: './services.html',
  styleUrl: './services.scss'
})
export class Services {
  readonly translations = computed(() => this.i18n.t().SERVICES_DETAIL);
  constructor(private i18n: I18nService) {}
}
