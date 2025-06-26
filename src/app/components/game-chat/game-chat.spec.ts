import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { GameChatComponent } from './game-chat';
import { GameChatService, GameChatAgent, GameChatMessage } from './game-chat.service';

class MockGameChatService {
  private openSubject = new BehaviorSubject<boolean>(false);
  open$ = this.openSubject.asObservable();

  private messagesSubject: BehaviorSubject<GameChatMessage[]>;
  messages$;

  agents: GameChatAgent[] = [
    { id: 'guide', name: 'Guide', color: 'dorado', icon: '🤖' }
  ];

  constructor() {
    this.messagesSubject = new BehaviorSubject<GameChatMessage[]>([
      { agent: this.agents[0], text: 'Welcome!', from: 'bot' }
    ]);
    this.messages$ = this.messagesSubject.asObservable();
  }

  toggle() {
    this.openSubject.next(!this.openSubject.value);
  }

  sendMessage() {}
}

describe('GameChatComponent', () => {
  let component: GameChatComponent;
  let fixture: ComponentFixture<GameChatComponent>;
  let service: MockGameChatService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameChatComponent],
      providers: [{ provide: GameChatService, useClass: MockGameChatService }]
    }).compileComponents();

    fixture = TestBed.createComponent(GameChatComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(GameChatService) as unknown as MockGameChatService;
    fixture.detectChanges();
  });

  it('should toggle visibility', () => {
    const button: HTMLElement = fixture.nativeElement.querySelector('[data-testid="game-chat-toggle"]');

    expect(fixture.nativeElement.querySelector('[data-testid="game-chat-window"]')).toBeNull();

    button.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[data-testid="game-chat-window"]')).not.toBeNull();

    button.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[data-testid="game-chat-window"]')).toBeNull();
  });

  it('should display initial welcome message', () => {
    service.toggle();
    fixture.detectChanges();
    const messages: HTMLElement = fixture.nativeElement.querySelector('[data-testid="game-chat-messages"]');
    expect(messages.textContent).toContain('Welcome!');
  });
});

