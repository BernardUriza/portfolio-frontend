import { Component, computed, signal, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, MatTooltipModule],
})
export class Header {
  private router = inject(Router);
  private translate = inject(TranslateService);

  logoHovered = signal(false);
  currentLang = signal('en');
  isProjectsActive = computed(() => this.router.url.includes('projects'));
  isSkillsActive = computed(() => this.router.url.includes('skills'));
  isExperiencesActive = computed(() => this.router.url.includes('experiences'));

  constructor() {
    this.translate.addLangs(['en', 'es']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang() || 'en';
    const initialLang = browserLang.match(/en|es/) ? browserLang : 'en';
    this.translate.use(initialLang);
    this.currentLang.set(initialLang);

    effect(() => {
      this.translate.use(this.currentLang());
    });
  }
  navItems = () => [
    { href: '#about', target: 'about', label: 'Sobre mí', tooltip: 'Sobre mí', text: () => this.translate.instant('HEADER.ABOUT') },
    { href: '#cases', target: 'cases', label: 'Casos de estudio', tooltip: 'Casos de estudio', text: () => this.translate.instant('HEADER.CASES') },
    { href: '#services', target: 'services', label: 'Servicios', tooltip: 'Servicios', text: () => this.translate.instant('HEADER.SERVICES') },
    { href: '#contact', target: 'contact', label: 'Contacto', tooltip: 'Contacto', text: () => this.translate.instant('HEADER.CONTACT') },
  ];

  sectionButtons = () => [
    { section: 'projects', tooltip: 'Proyectos', text: () => this.translate.instant('HEADER.PROJECTS'), active: this.isProjectsActive },
    { section: 'skills', tooltip: 'Skills', text: () => this.translate.instant('HEADER.SKILLS'), active: this.isSkillsActive },
    { section: 'experiences', tooltip: 'Experiencias', text: () => this.translate.instant('HEADER.EXPERIENCES'), active: this.isExperiencesActive },
  ];

  goHome() {
    this.router.navigate(['/']);
  }

  langLabel = computed(() => this.currentLang() === 'en' ? 'Español' : 'English');
  langTooltip = computed(() => this.currentLang() === 'en' ? 'Switch to Spanish' : 'Cambiar a Inglés');

  scrollTo(section: string, event?: Event) {
    if (event) event.preventDefault();
    const el = document.getElementById(section);
    if (el) {
      const header = document.querySelector('header');
      const offset = header ? header.clientHeight : 0;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  go(route: string) {
    this.router.navigate([route]).then(() => {
      this.scrollTo('main-content');
    });
  }

  isActive = computed(() => {
    const url = this.router.url;
    return (route: string) => url.includes(route);
  });

  switchLang() {
    this.currentLang.set(this.currentLang() === 'en' ? 'es' : 'en');
  }
}
