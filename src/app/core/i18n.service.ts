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
      CASES: 'Proven Impact',
      CASES_LABEL: 'Proven Impact',
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
      HERO_LINE_1: "Your team doesn't need more developers.",
      HERO_LINE_2: 'It needs a phase catalyst.',
      HERO_SUB: 'I break systems that have outgrown their chaos but are not yet ready for stability.',
      HERO_EXPLORE: 'Schedule a Catalyst Consultation'
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
      TITLE: 'Proven Impact',
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
    },
    BETWEEN: {
      TITLE: 'What Happens Between Startup and Structure',
      SUBTITLE: 'Transformation • Catalysis • Emergence',
      PILLARS: {
        DETECTION: 'DETECTION',
        ANALYSIS: 'ANALYSIS', 
        CATALYSIS: 'CATALYSIS'
      },
      CTA_BUTTON: 'Initiate Systemic Diagnosis',
      CTA_COMMENT: '// Enzyme-substrate compatibility evaluation',
      // Versión balanceada de las líneas del diagrama catalítico
      LINES: [
        'Your startup scaled beyond MVP, adding people and process layers.',
        'Suddenly velocity stalls and every decision becomes gridlock.',
        "That's not fatigue—it's narrative entropy taking hold of systems.",
        "More standups won't fix underlying structural breakdown here.",
        'Only a catalytic shock can realign your organizational story.',
        'Crisis becomes opportunity when you embrace necessary disonance.'
      ],
      DIAGRAM: {
        CHAOS: 'CHAOS',
        CATALYST: 'CATALYST',
        ORDER: 'ORDER',
        TITLE: 'SYSTEMIC TRANSFORMATION PROCESS',
        WEEKS: ['Week 0-1', 'Weeks 2-8', 'Week 9+'],
        LABELS: { 
          CHAOS: 'SYSTEMIC CRISIS', 
          CATALYST: 'CATALYTIC INTERVENTION', 
          ORDER: 'NEW EQUILIBRIUM' 
        },
        DESCRIPTIONS: [
          'System in critical state requires external intervention',
          'Introduction of productive dissonance and reconfiguration',
          'Stabilization at new level of complexity and capability'
        ],
        FOOTER: '// Irreversible transformation with emergent systemic capacity'
      },
      ENTROPY_DEFAULT: '(No operation selected)'
    },
    SERVICES_DETAIL: {
      TITLE: 'Catalyst Engineering by Bernard Uriza',
      OFFERINGS: [
        { 
          ICON: '🔍', 
          TITLE: 'Symbolic System Diagnosis', 
          DESC: 'Deep-read of your team culture, unspoken contracts, and technical decisions hiding ego structures.' 
        },
        { 
          ICON: '🧠', 
          TITLE: 'Narrative & Architectural Disruption', 
          DESC: 'Restructure not only your tech stack—but your organizational myths.' 
        },
        { 
          ICON: '💥', 
          TITLE: 'Fracture as Strategy', 
          DESC: 'I engineer safe collapse. I break the parts that are silently holding you back.' 
        },
        { 
          ICON: '🚪', 
          TITLE: 'Designed Exit', 
          DESC: "I leave when I'm no longer needed. I don't grow with your org. I evolve it." 
        }
      ],
      TOOLS_TITLE: 'Tools Used',
      TOOLS: 'GPT-driven retrospectives • Architecture audits • Signal hacking • Legacy resurrection • Emotional mapping'
    },
    CTA: {
      TITLE_LINE_1: "I won't make you feel comfortable.",
      TITLE_LINE_2: "I'll make you feel clear.",
      SUBTEXT: 'Book a 30-minute clarity conflict. No fluff. No frameworks. Just reality.',
      BUTTON: 'Start the Disruption',
      NAME: 'Name',
      EMAIL: 'Email',
      MESSAGE: 'Message',
      SEND: 'Send'
    },
    LOGIN: {
      TITLE: 'Log in',
      EMAIL: 'Email',
      PASSWORD: 'Password',
      SUBMIT: 'Sign In',
      ERROR: 'Invalid credentials'
    },
    EXPERIENCE_LIST: {
      TITLE: 'Experiences',
      SUBTITLE: 'Nothing decorative,<span class="text-dorado"> only real achievements.</span>'
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
      CASES: 'Impacto Comprobado',
      CASES_LABEL: 'Impacto Comprobado',
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
      HERO_LINE_1: 'Tu equipo no necesita más desarrolladores.',
      HERO_LINE_2: 'Necesita un catalizador de fases.',
      HERO_SUB: 'Rompo sistemas que superaron su caos pero aún no están listos para la estabilidad.',
      HERO_EXPLORE: 'Agenda una Consulta Catalizadora'
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
      TITLE: 'Impacto Comprobado',
      ITEMS: [
        {
          ID: 'startup',
          TITLE: 'Escalado de Startup',
          SUMMARY: 'De 5 a 50 sin perder coherencia.',
          DETAIL: 'Historia detallada de un startup que creció con arquitectura resiliente.'
        },
        {
          ID: 'family',
          TITLE: 'Digitalización de Empresa Familiar',
          SUMMARY: 'De lo artesanal a lo escalable, preservando su esencia.',
          DETAIL: 'Transición digital sin perder la tradición.'
        },
        {
          ID: 'fusion',
          TITLE: 'Fusión Cultural y de Sistemas',
          SUMMARY: 'Unimos lo que parecía imposible: tecnología y equipos.',
          DETAIL: 'Unión de stacks tecnológicos y culturas.'
        }
      ]
    },
    BETWEEN: {
      TITLE: 'Qué ocurre entre el inicio y la estructura',
      SUBTITLE: 'Transformación • Catálisis • Emergencia',
      PILLARS: {
        DETECTION: 'DETECCIÓN',
        ANALYSIS: 'ANÁLISIS',
        CATALYSIS: 'CATÁLISIS'
      },
      CTA_BUTTON: 'Iniciar Diagnóstico Sistémico',
      CTA_COMMENT: '// Evaluación de compatibilidad enzima-sustrato',
      // Versión balanceada en español del diagrama catalítico
      LINES: [
        'Tu startup superó el MVP sumando capas de gente y procesos.',
        'Ahora la velocidad se detiene y las decisiones se congelan.',
        'Eso no es agotamiento: es entropía narrativa sistémica tomando control.',
        'Otra reunión no solucionará el colapso estructural subyacente aquí.',
        'Solo un choque catalítico puede realinear tu historia organizacional.',
        'La crisis se convierte en oportunidad al abrazar la disonancia necesaria.'
      ],
      DIAGRAM: {
        CHAOS: 'CAOS',
        CATALYST: 'CATALIZADOR',
        ORDER: 'ORDEN',
        TITLE: 'PROCESO DE TRANSFORMACIÓN SISTÉMICA',
        WEEKS: ['Semana 0-1', 'Semanas 2-8', 'Semana 9+'],
        LABELS: { 
          CHAOS: 'CRISIS SISTÉMICA', 
          CATALYST: 'INTERVENCIÓN CATALÍTICA', 
          ORDER: 'NUEVO EQUILIBRIO' 
        },
        DESCRIPTIONS: [
          'Sistema en estado crítico requiere intervención externa',
          'Introducción de disonancia productiva y reconfiguración',
          'Estabilización en nuevo nivel de complejidad y capacidad'
        ],
        FOOTER: '// Transformación irreversible con capacidad sistémica emergente'
      },
      ENTROPY_DEFAULT: '(No eligió operación)'
    },
    SERVICES_DETAIL: {
      TITLE: 'Catalyst Engineering por Bernard Uriza',
      OFFERINGS: [
        { 
          ICON: '🔍', 
          TITLE: 'Diagnóstico Simbólico de Sistemas', 
          DESC: 'Lectura profunda de la cultura del equipo, contratos tácitos y decisiones técnicas que esconden estructuras de ego.' 
        },
        { 
          ICON: '🧠', 
          TITLE: 'Disrupción Narrativa y Arquitectónica', 
          DESC: 'Reestructura no solo tu stack tecnológico, sino tus mitos organizacionales.' 
        },
        { 
          ICON: '💥', 
          TITLE: 'Fractura como Estrategia', 
          DESC: 'Ingeniero colapsos seguros. Rompo las partes que te frenan en silencio.' 
        },
        { 
          ICON: '🚪', 
          TITLE: 'Salida Diseñada', 
          DESC: 'Me marcho cuando ya no soy necesario. No crezco con tu organización; la evoluciono.' 
        }
      ],
      TOOLS_TITLE: 'Herramientas Utilizadas',
      TOOLS: 'Retrospectivas con GPT • Auditorías de arquitectura • Hackeo de señales • Resurrección de legados • Mapeo emocional'
    },
    CTA: {
      TITLE_LINE_1: 'No te haré sentir cómodo.',
      TITLE_LINE_2: 'Te haré sentir claro.',
      SUBTEXT: 'Agenda un conflicto de claridad de 30 minutos. Sin adornos. Sin frameworks. Solo realidad.',
      BUTTON: 'Iniciar la Disrupción',
      NAME: 'Nombre',
      EMAIL: 'Correo',
      MESSAGE: 'Mensaje',
      SEND: 'Enviar'
    },
    LOGIN: {
      TITLE: 'Iniciar sesión',
      EMAIL: 'Correo',
      PASSWORD: 'Contraseña',
      SUBMIT: 'Entrar',
      ERROR: 'Credenciales inválidas'
    },
    EXPERIENCE_LIST: {
      TITLE: 'Experiencias',
      SUBTITLE: 'Nada decorativo,<span class="text-dorado"> solo logros reales.</span>'
    }
  }
};

@Injectable({ providedIn: 'root' })
export class I18nService {
  readonly lang = signal<'en' | 'es'>('en');
  
  // Computed properties for better reactivity
  readonly t = computed(() => LANGUAGES[this.lang()]);
  readonly currentLang = computed(() => this.lang());
  readonly isEnglish = computed(() => this.lang() === 'en');
  readonly isSpanish = computed(() => this.lang() === 'es');
  
  // Public methods
  switchLang = (): void => {
    this.lang.set(this.lang() === 'en' ? 'es' : 'en');
  };
  
  setLang = (language: 'en' | 'es'): void => {
    this.lang.set(language);
  };
  
  // Utility method for getting specific translations
  getText = (path: string): string => {
    const keys = path.split('.');
    let current: any = this.t();
    
    for (const key of keys) {
      current = current?.[key];
      if (current === undefined) {
        console.warn(`Translation key not found: ${path}`);
        return path;
      }
    }
    
    return current;
  };
}