import { Component, computed, inject } from '@angular/core';
import { I18nService } from '../../core/i18n.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  readonly i18n = inject(I18nService);
  readonly translations = computed(() => this.i18n.t().FOOTER);
}
