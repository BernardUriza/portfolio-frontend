import { Component, computed, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { I18nService } from '../../core/i18n.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
})
export class Header {
  private readonly router = inject(Router);
  readonly i18n = inject(I18nService);

  readonly logoHovered = signal(false);
  readonly menuOpen = signal(false); // <-- NUEVO

  readonly currentLang = this.i18n.lang;

  readonly isProjectsActive = computed(() => this.router.url.includes('projects'));
  readonly isSkillsActive = computed(() => this.router.url.includes('skills'));
  readonly isExperiencesActive = computed(() => this.router.url.includes('experiences'));

  readonly navItems = () => [
    { href: '#about', target: 'about', label: this.i18n.t().HEADER.ABOUT_LABEL, text: () => this.i18n.t().HEADER.ABOUT, tooltip: () => this.i18n.t().HEADER.ABOUT_TOOLTIP },
    { href: '#cases', target: 'cases', label: this.i18n.t().HEADER.CASES_LABEL, text: () => this.i18n.t().HEADER.CASES, tooltip: () => this.i18n.t().HEADER.CASES_TOOLTIP },
    { href: '#services', target: 'services', label: this.i18n.t().HEADER.SERVICES_LABEL, text: () => this.i18n.t().HEADER.SERVICES, tooltip: () => this.i18n.t().HEADER.SERVICES_TOOLTIP },
    { href: '#contact', target: 'contact', label: this.i18n.t().HEADER.CONTACT_LABEL, text: () => this.i18n.t().HEADER.CONTACT, tooltip: () => this.i18n.t().HEADER.CONTACT_TOOLTIP },
  ];

  readonly sectionButtons = () => [
    { section: 'projects', text: () => this.i18n.t().HEADER.PROJECTS, tooltip: () => this.i18n.t().HEADER.PROJECTS_TOOLTIP, active: this.isProjectsActive },
    { section: 'skills', text: () => this.i18n.t().HEADER.SKILLS, tooltip: () => this.i18n.t().HEADER.SKILLS_TOOLTIP, active: this.isSkillsActive },
    { section: 'experiences', text: () => this.i18n.t().HEADER.EXPERIENCES, tooltip: () => this.i18n.t().HEADER.EXPERIENCES_TOOLTIP, active: this.isExperiencesActive },
  ];

  toggleMenu() {
    this.menuOpen.update(open => !open);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }

  goHome(): void {
    this.router.navigate(['/']);
    this.closeMenu();
  }

  scrollTo(section: string, event?: Event): void {
    event?.preventDefault();
    const el = document.getElementById(section);
    if (el) {
      const offset = document.querySelector('header')?.clientHeight || 0;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    this.closeMenu();
  }

  go(route: string): void {
    this.router.navigate([route]).then(() => this.scrollTo('main-content'));
    this.closeMenu();
  }

  switchLang(): void {
    this.i18n.switchLang();
    this.closeMenu();
  }

  readonly langLabel = computed(() => this.currentLang() === 'en' ? this.i18n.t().HEADER.LANG_ES : this.i18n.t().HEADER.LANG_EN);
  readonly langTooltip = computed(() => this.currentLang() === 'en' ? this.i18n.t().HEADER.LANG_SWITCH_ES : this.i18n.t().HEADER.LANG_SWITCH_EN);
}
