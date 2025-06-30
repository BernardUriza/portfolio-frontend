import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pillar-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pillar-card.component.html',
  styleUrls: ['./pillar-card.component.scss']
})
export class PillarCardComponent {
  @Input() title = '';
  @Input() icon = '';
  @Input() color: 'rojo-oscuro' | 'dorado' | 'holo-blue' = 'rojo-oscuro';
  @Input() description = '';
  @Input() detail?: string;
}
