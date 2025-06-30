import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-entropy-wave',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './entropy-wave.html',
  styleUrl: './entropy-wave.scss'
})
export class EntropyWave implements OnInit, OnDestroy {
  options = ['WAVE', 'DOTS', 'GRID'];
  style = this.options[0];
  private intervalId: any;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      let next;
      do {
        next = this.options[Math.floor(Math.random() * this.options.length)];
      } while (next === this.style);
      this.style = next;
    }, 10000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
