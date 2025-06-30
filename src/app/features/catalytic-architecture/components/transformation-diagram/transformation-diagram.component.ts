import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../../../core/i18n.service';

@Component({
  selector: 'app-transformation-diagram',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transformation-diagram.component.html',
  styleUrls: ['./transformation-diagram.component.scss']
})
export class TransformationDiagramComponent {
  readonly translations = computed(() => this.i18n.t().BETWEEN);
  constructor(private i18n: I18nService) {}
}
