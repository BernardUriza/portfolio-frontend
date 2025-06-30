import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-entropy',
  imports: [CommonModule],
  templateUrl: './entropy.html'
})
export class Entropy implements OnInit, OnDestroy {
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
    }, 10000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
