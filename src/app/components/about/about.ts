import { Component, computed, inject } from '@angular/core';
import { I18nService } from '../../core/i18n.service';

@Component({
  selector: 'app-about',
  imports: [],
  standalone: true,
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {
  readonly i18n = inject(I18nService);
  readonly translations = computed(() => this.i18n.t().ABOUT);

}
