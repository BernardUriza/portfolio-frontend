import { Component, computed, inject } from '@angular/core';
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
  readonly i18n = inject(I18nService);
  readonly translations = computed(() => this.i18n.t().CAROUSEL);
 
  fraseIndex = 0;
  fadeClass = 'opacity-100';

  constructor() {
    this.startCarousel();
  }

  startCarousel() {
    setInterval(() => {
      this.fadeClass = 'opacity-0';
      setTimeout(() => {
        this.fraseIndex = (this.fraseIndex + 1) % this.translations().PHRASES.length;
        this.fadeClass = 'opacity-100';
      }, 500);
    }, 4000);
  }
}
