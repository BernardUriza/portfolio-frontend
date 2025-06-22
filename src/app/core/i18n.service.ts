import { Injectable, computed, signal } from '@angular/core';

export const LANGUAGES = {
  en: {
    HEADER: {
      ABOUT: 'About Me',
      ABOUT_LABEL: 'About Me',
      ABOUT_TOOLTIP: 'Discover my professional profile',
      SERVICES: 'Solutions',
      SERVICES_LABEL: 'Solutions',
      SERVICES_TOOLTIP: 'Explore tailored services',
      CONTACT: 'Connect',
      CONTACT_LABEL: 'Connect',
      CONTACT_TOOLTIP: 'Establish direct communication',
      CASES: 'Case Studies',
      CASES_LABEL: 'Case Studies',
      CASES_TOOLTIP: 'Analyze transformative projects',
      PROJECTS: 'Projects',
      PROJECTS_TOOLTIP: 'Navigate my project portfolio',
      SKILLS: 'Capabilities',
      SKILLS_TOOLTIP: 'Review technical proficiencies',
      EXPERIENCES: 'Experiences',
      EXPERIENCES_TOOLTIP: 'Trace my career trajectory',
      LANG_ES: 'Spanish',
      LANG_EN: 'English',
      LANG_SWITCH_ES: 'Activate Spanish',
      LANG_SWITCH_EN: 'Activate English'
    },
    HERO: {
      HERO_LINE_1: 'Engineering coherence from fragmentation',
      HERO_LINE_2: 'Delivering resilient, cyber-architected systems',
      HERO_EXPLORE: 'Engage with my portfolio'
    },
    CAROUSEL: {
      PHRASES: [
        'Dissonance sparks transformation',
        'Refactoring cultures drives true development',
        'Code is the output, not the objective',
        'Architecting beyond the codebase',
        'Cyber-resilience through catalytic design'
      ]
    },
    ABOUT: {
      TITLE: 'About Me',
      DESCRIPTION: 'Technical catalyst and architecture strategist. I expose what is broken and engineer coherence where chaos once reigned. I do not adapt, I transform. I do not decorate, I reconfigure.'
    },
    CASES: {
      TITLE: 'Case Studies',
      ITEMS: [
        {
          ID: 'startup',
          TITLE: 'Startup Scaling',
          SUMMARY: 'From 5 to 50 without losing coherence.',
          DETAIL: 'Detailed transformation of a startup scaling with cyber-architected resilience.'
        },
        {
          ID: 'family',
          TITLE: 'Family Business Digitalization',
          SUMMARY: 'From craft to scale, preserving its soul.',
          DETAIL: 'Digital transition while preserving tradition.'
        },
        {
          ID: 'fusion',
          TITLE: 'Cultural & System Fusion',
          SUMMARY: 'Merged what seemed impossible: tech and teams.',
          DETAIL: 'Merging of technology stacks and cultures.'
        }
      ]
    }
  },
  es: {
    HEADER: {
      ABOUT: 'Sobre Mí',
      ABOUT_LABEL: 'Sobre Mí',
      ABOUT_TOOLTIP: 'Descubre mi perfil profesional',
      SERVICES: 'Soluciones',
      SERVICES_LABEL: 'Soluciones',
      SERVICES_TOOLTIP: 'Explora servicios a medida',
      CONTACT: 'Conectar',
      CONTACT_LABEL: 'Conectar',
      CONTACT_TOOLTIP: 'Establece comunicación directa',
      CASES: 'Casos de Estudio',
      CASES_LABEL: 'Casos de Estudio',
      CASES_TOOLTIP: 'Analiza proyectos transformadores',
      PROJECTS: 'Proyectos',
      PROJECTS_TOOLTIP: 'Navega por mi portafolio',
      SKILLS: 'Capacidades',
      SKILLS_TOOLTIP: 'Revisa habilidades técnicas',
      EXPERIENCES: 'Experiencias',
      EXPERIENCES_TOOLTIP: 'Traza mi trayectoria profesional',
      LANG_ES: 'Español',
      LANG_EN: 'Inglés',
      LANG_SWITCH_ES: 'Activar Español',
      LANG_SWITCH_EN: 'Activar Inglés'
    },
    HERO: {
      HERO_LINE_1: 'Ingeniería de coherencia desde la fragmentación',
      HERO_LINE_2: 'Sistemas resilientes con arquitectura cibernética',
      HERO_EXPLORE: 'Explora mi portafolio'
    },
    CAROUSEL: {
      PHRASES: [
        'La disonancia impulsa la transformación',
        'Refactorizar culturas es el verdadero desarrollo',
        'El código es la consecuencia, no el propósito',
        'Arquitectura más allá del código',
        'Resiliencia cibernética mediante diseño catalítico'
      ]
    },
    ABOUT: {
      TITLE: 'Sobre Mí',
      DESCRIPTION: 'Catalizador técnico y estratega de arquitectura. Revelo lo que está roto y diseño coherencia donde antes hubo caos. No adapto, transformo. No decoro, reconfiguro.'
    },
    CASES: {
      TITLE: 'Casos de Estudio',
      ITEMS: [
        {
          ID: 'startup',
          TITLE: 'Escalado de Startup',
          SUMMARY: 'De 5 a 50 sin perder la cabeza.',
          DETAIL: 'Historia detallada de un startup que creció con arquitectura resiliente.'
        },
        {
          ID: 'family',
          TITLE: 'Digitalización de Empresa Familiar',
          SUMMARY: 'De lo artesanal a lo escalable.',
          DETAIL: 'Transición digital sin perder la tradición.'
        },
        {
          ID: 'fusion',
          TITLE: 'Fusión Cultural y de Sistemas',
          SUMMARY: 'Unimos lo que parecía imposible: tecnología y equipos.',
          DETAIL: 'Unión de stacks tecnológicos y culturas.'
        }
      ]
    }
  }
};

@Injectable({ providedIn: 'root' })
export class I18nService {
  lang = signal<'en' | 'es'>('en');
  t = computed(() => LANGUAGES[this.lang()]);
  switchLang = () => this.lang.set(this.lang() === 'en' ? 'es' : 'en');
}
