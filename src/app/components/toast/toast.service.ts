import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  id: number;
  text: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private counter = 0;
  readonly toasts = signal<ToastMessage[]>([]);

  show(text: string, duration = 3000) {
    const toast = { id: this.counter++, text };
    this.toasts.update(list => [...list, toast]);
    setTimeout(() => {
      this.toasts.update(list => list.filter(t => t.id !== toast.id));
    }, duration);
  }
}
