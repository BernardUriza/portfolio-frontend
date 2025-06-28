import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ContextInfo } from './game-chat.models';

@Injectable({ providedIn: 'root' })
export class ContextTrackingService {
  private stack: ContextInfo[] = [];
  private contextSubject = new BehaviorSubject<ContextInfo | null>(null);
  readonly context$ = this.contextSubject.asObservable();

  push(context: ContextInfo): void {
    this.stack.push(context);
    this.contextSubject.next(context);
  }

  getCurrent(): ContextInfo | null {
    return this.stack.length ? this.stack[this.stack.length - 1] : null;
  }
}
