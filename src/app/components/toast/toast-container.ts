import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed bottom-4 right-4 space-y-2 z-50">
      <div *ngFor="let toast of toastService.toasts()" class="bg-dorado text-antracita px-4 py-2 rounded shadow">
        {{ toast.text }}
      </div>
    </div>
  `
})
export class ToastContainerComponent {
  constructor(public toastService: ToastService) {}
}
