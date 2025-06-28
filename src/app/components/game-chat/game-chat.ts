import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameChatService } from './game-chat.service';
import { ChatMessage, AgentInfo } from './game-chat.models';

@Component({
  selector: 'app-game-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game-chat.html',
  styleUrl: './game-chat.scss'
})
export class GameChatComponent {
  private service = inject(GameChatService);
  open$ = this.service.open$;
  messages$ = this.service.messages$;
  text = '';
  agent: AgentInfo = this.service.agents[0];

  visibleIds = signal<string[]>([]);
  allMessages: ChatMessage[] = [];

  constructor() {
    this.messages$.subscribe(msgs => {
      this.allMessages = msgs;
      let delay = 0;
      msgs.forEach(msg => {
        if (!this.visibleIds().includes(msg.id)) {
          setTimeout(() => this.visibleIds.update(ids => [...ids, msg.id]), delay);
          delay += 200;
        }
      });
      const set = new Set(msgs.map(m => m.id));
      this.visibleIds.update(ids => ids.filter(id => set.has(id)));
    });
  }

  trackById(_: number, msg: ChatMessage) {
    return msg.id;
  }

  toggle() {
    this.service.toggle();
  }

  send() {
    const msg = this.text.trim();
    if (!msg) return;
    this.service.sendMessage(this.agent, msg);
    this.text = '';
  }

  close(id: string) {
    this.visibleIds.update(ids => ids.filter(i => i !== id));
    setTimeout(() => this.service.closeMessage(id), 300);
  }
}
