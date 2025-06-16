import { Component, HostListener, ElementRef, Renderer2 } from '@angular/core';


@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    const svg = this.el.nativeElement.querySelector('#nocheOscuraSVG');
    this.renderer.addClass(svg, 'fog-active');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    const svg = this.el.nativeElement.querySelector('#nocheOscuraSVG');
    this.renderer.removeClass(svg, 'fog-active');
    this.renderer.removeClass(svg, 'particles-cleared');
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const svg = this.el.nativeElement.querySelector('#nocheOscuraSVG');
    const rect = svg.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const particles = svg.querySelectorAll('g#particles circle');
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
    const intensity = Math.min(scrollY / maxScroll, 1) * 0.3 + 0.1;
    svg.style.opacity = `${intensity}`;
  }
}