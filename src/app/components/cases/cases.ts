import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../core/i18n.service';

@Component({
  selector: 'app-cases',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cases.html',
  styleUrl: './cases.scss'
})
export class Cases {
  readonly i18n = inject(I18nService);
  readonly translations = computed(() => this.i18n.t().CASES);
  readonly activeCase = signal<string | null>(null);

  openPopup(caseId: string) {
    this.activeCase.set(caseId);
  }

  closePopup() {
    this.activeCase.set(null);
  }

  activeCaseData = computed(() => 
    this.translations().ITEMS.find(i => i.ID === this.activeCase())
  );
}
