import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { AiService } from '../../features/ai/ai.service';

export interface GameChatAgent {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface GameChatMessage {
  agent: GameChatAgent;
  text: string;
  from: 'user' | 'bot';
}

@Injectable({ providedIn: 'root' })
export class GameChatService {
  private openSubject = new BehaviorSubject<boolean>(false);
  open$ = this.openSubject.asObservable();

  private messagesSubject = new BehaviorSubject<GameChatMessage[]>([]);
  messages$ = this.messagesSubject.asObservable();

  agents: GameChatAgent[] = [
    { id: 'guide', name: 'Guide', color: 'dorado', icon: '🤖' }
  ];

  constructor(private ai: AiService) {
    // Mensaje inicial predefinido
    const welcome: GameChatMessage = {
      agent: this.agents[0],
      text: '¡Bienvenido! ¿En qué puedo ayudarte hoy?',
      from: 'bot'
    };
    this.messagesSubject.next([welcome]);
  }

  trackClicks() {
    document.addEventListener('click', (evt: Event) => {
      const el = evt.target as HTMLElement | null;
      if (!el) return;
      const desc = el.getAttribute('data-testid') || el.getAttribute('aria-label') || el.tagName.toLowerCase();
      this.sendTrace(`click:${desc}`);
    });
  }

  trackRouteChanges(router: Router) {
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
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

  sendMessage(agent: GameChatAgent, text: string) {
    const userMsg: GameChatMessage = { agent, text, from: 'user' };
    this.messagesSubject.next([...this.messagesSubject.value, userMsg]);

    this.ai.sendChatMessage(text).subscribe({
      next: reply => {
        const botMsg: GameChatMessage = { agent, text: reply, from: 'bot' };
        this.messagesSubject.next([...this.messagesSubject.value, botMsg]);
      },
      error: () => {
        const botMsg: GameChatMessage = { agent, text: 'Error contacting AI', from: 'bot' };
        this.messagesSubject.next([...this.messagesSubject.value, botMsg]);
      }
    });
  }
}
