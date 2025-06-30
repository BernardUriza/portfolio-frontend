import { Component, OnInit, OnDestroy, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../../../core/i18n.service';

@Component({
  selector: 'app-entropy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './entropy.component.html',
  styleUrls: ['./entropy.component.scss']
})
export class EntropyComponent implements OnInit, OnDestroy {
  readonly i18n = inject(I18nService);
  readonly translations = computed(() => this.i18n.t().BETWEEN);
  options = [
    'HÍBRIDO CONCEPTUAL',
    'RED NEURAL FRAGMENTADA',
    'HEARTBEAT/PULSO DE SISTEMA',
    'MATRIZ DE SISTEMAS FRAGMENTADOS',
    'RADAR DE DIAGNÓSTICO',
    'GRÁFICO DE ENTROPÍA CON ONDAS'
  ];

  plasmaSelected = this.options[0];
  private intervalId: any;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      let next;
      do {
        next = this.options[Math.floor(Math.random() * this.options.length)];
      } while (next === this.plasmaSelected);
      this.plasmaSelected = next;
    }, 30000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
