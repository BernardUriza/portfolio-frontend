import { Component, HostListener, ElementRef, Renderer2, inject, computed } from '@angular/core';
import { I18nService } from '../../core/i18n.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero {
  readonly i18n = inject(I18nService);
  readonly translations = computed(() => this.i18n.t().HERO);

  readonly currentLang = this.i18n.lang;
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const svg = this.el.nativeElement.querySelector('#nocheOscuraSVG');
    const rect = svg.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const particles = svg.querySelectorAll('#particles circle');
    particles.forEach((circle: SVGCircleElement) => {
      const cx = parseFloat(circle.getAttribute('cx') || '0');
      const cy = parseFloat(circle.getAttribute('cy') || '0');
      const dist = Math.hypot(cx - x, cy - y);
      circle.setAttribute('opacity', dist < 100 ? '0' : '0.1');
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    const svg = this.el.nativeElement.querySelector('#nocheOscuraSVG');
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const offset = Math.min(scrollY / maxScroll, 1) * 20; // y-offset modulation

    const fractals = svg.querySelectorAll('.fractal-layer');
    fractals.forEach((layer: SVGGElement) => {
      layer.style.transform = `translateY(${offset}px)`;
    });
  }
}