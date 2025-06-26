import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

  constructor(private ai: AiService) {}

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
