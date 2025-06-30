import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-symptom-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './symptom-bar.component.html',
  styleUrls: ['./symptom-bar.component.scss']
})
export class SymptomBarComponent implements OnInit, OnDestroy {
  options = ['BARS', 'DOTS', 'BLOCKS'];
  style = this.options[0];
  private intervalId: any;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      let next;
      do {
        next = this.options[Math.floor(Math.random() * this.options.length)];
      } while (next === this.style);
      this.style = next;
    }, 90000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
