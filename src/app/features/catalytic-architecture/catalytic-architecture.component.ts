import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../core/i18n.service';
import { PillarCardComponent } from './components/pillar-card/pillar-card.component';
import { SymptomBarComponent } from './components/symptom-bar/symptom-bar.component';
import { EntropyComponent } from './components/entropy/entropy.component';
import { MethodTransformComponent } from './components/method-transform/method-transform.component';
import { TransformationDiagramComponent } from './components/transformation-diagram/transformation-diagram.component';

@Component({
  selector: 'app-catalytic-architecture',
  standalone: true,
  imports: [
    CommonModule,
    PillarCardComponent,
    SymptomBarComponent,
    EntropyComponent,
    MethodTransformComponent,
    TransformationDiagramComponent
  ],
  templateUrl: './catalytic-architecture.component.html',
  styleUrls: ['./catalytic-architecture.component.scss']
})
export class CatalyticArchitectureComponent {
  readonly translations = computed(() => this.i18n.t().BETWEEN);
  constructor(private i18n: I18nService) {}
}
