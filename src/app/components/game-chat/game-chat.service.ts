import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { AiService } from '../../features/ai/ai.service';
import { ChatContextService } from '../../features/ai/chat-context.service';
import {
  AgentInfo,
  AgentType,
  ChatMessage,
  ContextInfo,
} from './game-chat.models';
import { ContextTrackingService } from './context-tracking.service';


@Injectable({ providedIn: 'root' })
export class GameChatService {
  private openSubject = new BehaviorSubject<boolean>(false);
  open$ = this.openSubject.asObservable();

  private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
  messages$ = this.messagesSubject.asObservable();

  agents: AgentInfo[] = [
    {
      type: AgentType.PROJECT_GUIDE,
      name: 'ProjectGuide',
      icon: '🎯',
      color: 'dorado',
      personality: 'technical',
      expertise: ['projects'],
      greetingTemplates: ['¡Hola! Soy ProjectGuide 🎯']
    },
    {
      type: AgentType.TECH_EXPERT,
      name: 'TechBot',
      icon: '🤖',
      color: 'holo-blue',
      personality: 'technical',
      expertise: ['tech'],
      greetingTemplates: ['Hola, soy TechBot 🤖']
    },
    {
      type: AgentType.PORTFOLIO_HOST,
      name: 'Host',
      icon: '🧑‍💼',
      color: 'purpura-profundo',
      personality: 'formal',
      expertise: ['portfolio'],
      greetingTemplates: ['Bienvenido al portfolio']
    },
    {
      type: AgentType.CONTACT_ASSISTANT,
      name: 'ContactBot',
      icon: '✉️',
      color: 'cyber-green',
      personality: 'enthusiastic',
      expertise: ['contact'],
      greetingTemplates: ['¿Quieres enviar un mensaje?']
    }
  ];

  private activeAgent = this.agents[0];

  constructor(
    private ai: AiService,
    private backend: ChatContextService,
    private context: ContextTrackingService
  ) {
    const welcome: ChatMessage = {
      id: crypto.randomUUID(),
      agent: this.activeAgent,
      text: '¡Bienvenido! ¿En qué puedo ayudarte hoy?',
      from: 'bot',
      context: { section: 'home', metadata: {}, timestamp: new Date() },
      isContextual: true,
      timestamp: new Date()
    };
    this.messagesSubject.next([welcome]);

    this.context.context$.subscribe(c => {
      if (c) {
        this.switchAgentForSection(c.section);
      }
    });
  }

  trackClicks() {
    document.addEventListener('click', (evt: Event) => {
      const el = evt.target as HTMLElement | null;
      if (!el) return;
      const desc = el.getAttribute('data-testid') || el.getAttribute('aria-label') || el.tagName.toLowerCase();
      const ctx: ContextInfo = {
        section: 'click',
        metadata: desc,
        timestamp: new Date(),
      };
      this.context.push(ctx);
      this.backend.sendContext({ section: 'click', action: desc, userContext: {} }).subscribe();
      this.sendTrace(`click:${desc}`);
    });
  }

  trackRouteChanges(router: Router) {
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const ctx: ContextInfo = {
          section: event.urlAfterRedirects.replace('/', ''),
          metadata: {},
          timestamp: new Date(),
        };
        this.context.push(ctx);
        this.backend.sendContext({ section: ctx.section, action: 'navigate', userContext: {} }).subscribe();
        this.sendTrace(`route:${event.urlAfterRedirects}`);
      }
    });
  }

  private sendTrace(info: string) {
    this.ai.sendTrace(info).subscribe();
  }

  toggle() {
    this.openSubject.next(!this.openSubject.value);
  }

  sendMessage(agent: AgentInfo, text: string) {
    const current = this.context.getCurrent() || { section: 'home', metadata: {}, timestamp: new Date() };
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      agent,
      text,
      from: 'user',
      context: current,
      isContextual: false,
      timestamp: new Date()
    };
    this.messagesSubject.next([...this.messagesSubject.value, userMsg]);

    this.backend.sendMessage(text, current, agent.type).subscribe({
      next: (reply: any) => {
        const botMsg: ChatMessage = {
          id: crypto.randomUUID(),
          agent,
          text: reply.message || reply,
          from: 'bot',
          context: current,
          isContextual: true,
          timestamp: new Date()
        };
        this.messagesSubject.next([...this.messagesSubject.value, botMsg]);
      },
      error: () => {
        const botMsg: ChatMessage = {
          id: crypto.randomUUID(),
          agent,
          text: 'Error contacting AI',
          from: 'bot',
          context: current,
          isContextual: true,
          timestamp: new Date()
        };
        this.messagesSubject.next([...this.messagesSubject.value, botMsg]);
      }
    });
  }

  private switchAgentForSection(section: string): void {
    switch (section) {
      case 'projects':
        this.activeAgent = this.agents.find(a => a.type === AgentType.PROJECT_GUIDE) || this.activeAgent;
        break;
      case 'contact':
        this.activeAgent = this.agents.find(a => a.type === AgentType.CONTACT_ASSISTANT) || this.activeAgent;
        break;
      default:
        this.activeAgent = this.agents.find(a => a.type === AgentType.PORTFOLIO_HOST) || this.activeAgent;
    }
  }

  closeMessage(id: string) {
    const remaining = this.messagesSubject.value.filter(m => m.id !== id);
    this.messagesSubject.next(remaining);
  }
}
