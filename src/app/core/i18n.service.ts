import { Injectable, computed, signal } from '@angular/core';

export const LANGUAGES = {
  en: {
    HEADER: {
      ABOUT: 'About me',
      ABOUT_LABEL: 'About me',
      ABOUT_TOOLTIP: 'Learn more about me',
      SERVICES: 'Services',
      SERVICES_LABEL: 'Services',
      SERVICES_TOOLTIP: 'View services offered',
      CONTACT: 'Contact',
      CONTACT_LABEL: 'Contact',
      CONTACT_TOOLTIP: 'Get in touch',
      CASES: 'Case studies',
      CASES_LABEL: 'Case studies',
      CASES_TOOLTIP: 'Explore case studies',
      PROJECTS: 'Projects',
      PROJECTS_TOOLTIP: 'See projects',
      SKILLS: 'Skills',
      SKILLS_TOOLTIP: 'View skills',
      EXPERIENCES: 'Experiences',
      EXPERIENCES_TOOLTIP: 'Check experiences',
      LANG_ES: 'Spanish',
      LANG_EN: 'English',
      LANG_SWITCH_ES: 'Switch to Spanish',
      LANG_SWITCH_EN: 'Switch to English'
    },
    HERO: {
      HERO_LINE_1: 'Transforming broken systems',
      HERO_LINE_2: 'into coherent architectures'
    }
  },
  es: {
    HEADER: {
      ABOUT: 'Sobre mí',
      ABOUT_LABEL: 'Sobre mí',
      ABOUT_TOOLTIP: 'Conóceme mejor',
      SERVICES: 'Servicios',
      SERVICES_LABEL: 'Servicios',
      SERVICES_TOOLTIP: 'Ver los servicios ofrecidos',
      CONTACT: 'Contacto',
      CONTACT_LABEL: 'Contacto',
      CONTACT_TOOLTIP: 'Ponte en contacto',
      CASES: 'Casos de estudio',
      CASES_LABEL: 'Casos de estudio',
      CASES_TOOLTIP: 'Explora casos de estudio',
      PROJECTS: 'Proyectos',
      PROJECTS_TOOLTIP: 'Ver proyectos',
      SKILLS: 'Habilidades',
      SKILLS_TOOLTIP: 'Ver habilidades',
      EXPERIENCES: 'Experiencias',
      EXPERIENCES_TOOLTIP: 'Ver experiencias',
      LANG_ES: 'Español',
      LANG_EN: 'Inglés',
      LANG_SWITCH_ES: 'Cambiar a Español',
      LANG_SWITCH_EN: 'Cambiar a Inglés'
    },
    HERO: {
      HERO_LINE_1: 'Transformando sistemas rotos',
      HERO_LINE_2: 'en nuevas arquitecturas coherentes'
    }
  }
};

@Injectable({ providedIn: 'root' })
export class I18nService {
  lang = signal<'en' | 'es'>('en');
  t = computed(() => LANGUAGES[this.lang()]);
  switchLang = () => this.lang.set(this.lang() === 'en' ? 'es' : 'en');
}
