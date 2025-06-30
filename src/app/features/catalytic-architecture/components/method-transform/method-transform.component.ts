import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-method-transform',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './method-transform.component.html',
  styleUrls: ['./method-transform.component.scss']
})
export class MethodTransformComponent implements OnInit, OnDestroy {
  options = ['FLOW', 'CUBES', 'SPIRAL'];
  style = this.options[0];
  private intervalId: any;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      let next;
      do {
        next = this.options[Math.floor(Math.random() * this.options.length)];
      } while (next === this.style);
      this.style = next;
    }, 15000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
