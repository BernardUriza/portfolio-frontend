import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../core/i18n.service';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss'
})
export class Carousel {
  frases = [
    'La disonancia es el inicio del cambio',
    'Refactorizar culturas es el verdadero desarrollo',
    'El código es la consecuencia, no el propósito'
  ];

  fraseIndex = 0;
  fadeClass = 'opacity-100';

  constructor() {
    this.startCarousel();
  }

  startCarousel() {
    setInterval(() => {
      this.fadeClass = 'opacity-0';
      setTimeout(() => {
        this.fraseIndex = (this.fraseIndex + 1) % this.frases.length;
        this.fadeClass = 'opacity-100';
      }, 500);
    }, 4000);
  }
}
