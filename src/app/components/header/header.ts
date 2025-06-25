import { Component, computed, signal, inject, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../core/i18n.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  standalone: true,
  imports: [CommonModule],
})
export class Header {
  readonly menuOpen = signal(false);

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth >= 768 && this.menuOpen()) {
      this.closeMenu();
    }
  }

  /** Toggle the mobile menu visibility */
  toggleMenu(): void {
    this.menuOpen.update(open => !open);
  }
  readonly i18n = inject(I18nService);
  readonly currentLang = this.i18n.lang;
  readonly translations = computed(() => this.i18n.t().HEADER);
  readonly isProjectsActive = computed(() => this.router.url.includes('projects'));
  readonly isSkillsActive = computed(() => this.router.url.includes('skills'));
  readonly isExperiencesActive = computed(() => this.router.url.includes('experiences'));

  constructor(private router: Router) {}
  readonly navItems = computed(() => {
    const t = this.translations();
    return [
      { href: '#about', target: 'about', label: t.ABOUT_LABEL, text: t.ABOUT, tooltip: t.ABOUT_TOOLTIP },
      { href: '#cases', target: 'cases', label: t.CASES_LABEL, text: t.CASES, tooltip: t.CASES_TOOLTIP },
      { href: '#services', target: 'services', label: t.SERVICES_LABEL, text: t.SERVICES, tooltip: t.SERVICES_TOOLTIP },
      { href: '#contact', target: 'contact', label: t.CONTACT_LABEL, text: t.CONTACT, tooltip: t.CONTACT_TOOLTIP },
    ];
  });

    readonly sectionButtons = computed(() => {
    const t = this.translations();
    return [
      { section: 'projects', text: t.PROJECTS, tooltip: t.PROJECTS_TOOLTIP, active: this.isProjectsActive },
      { section: 'skills', text: t.SKILLS, tooltip: t.SKILLS_TOOLTIP, active: this.isSkillsActive },
      { section: 'experiences', text: t.EXPERIENCES, tooltip: t.EXPERIENCES_TOOLTIP, active: this.isExperiencesActive },
    ];
  });
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
      setTimeout(() => this.scrollTo('main-content'), 50);
    });
  }

  closeMenu() {
    this.menuOpen.set(false);
  }

  goHome(): void {
    this.router.navigate(['/']);
    this.closeMenu();
  }

  readonly langLabel = computed(() => {
    const t = this.translations();
    return this.currentLang() === 'en' ? t.LANG_ES : t.LANG_EN;
  });
  switchLang(): void {
    this.i18n.switchLang();
    this.closeMenu();
  }
}
