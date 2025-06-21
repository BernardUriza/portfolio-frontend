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
  readonly menuOpen = signal(false);

  readonly currentLang = this.i18n.lang;

  readonly isProjectsActive = computed(() => this.router.url.includes('projects'));
  readonly isSkillsActive = computed(() => this.router.url.includes('skills'));
  readonly isExperiencesActive = computed(() => this.router.url.includes('experiences'));

  readonly translations = computed(() => this.i18n.t().HEADER);

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

  readonly langLabel = computed(() => {
    const t = this.translations();
    return this.currentLang() === 'en' ? t.LANG_ES : t.LANG_EN;
  });

  readonly langTooltip = computed(() => {
    const t = this.translations();
    return this.currentLang() === 'en' ? t.LANG_SWITCH_ES : t.LANG_SWITCH_EN;
  });
}
