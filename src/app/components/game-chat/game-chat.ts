import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameChatService } from './game-chat.service';

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
  agent = this.service.agents[0];

  toggle() {
    this.service.toggle();
  }

  send() {
    const msg = this.text.trim();
    if (!msg) return;
    this.service.sendMessage(this.agent, msg);
    this.text = '';
  }
}
