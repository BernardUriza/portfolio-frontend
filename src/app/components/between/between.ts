import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../core/i18n.service';
import { Entropy } from './entropy';

@Component({
  selector: 'app-between',
  standalone: true,
  imports: [CommonModule, Entropy],
  templateUrl: './between.html'
})
export class Between {
  readonly translations = computed(() => this.i18n.t().BETWEEN);
  constructor(private i18n: I18nService) {}
}
