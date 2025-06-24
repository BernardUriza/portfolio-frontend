import { Component, computed, inject } from '@angular/core';
import { I18nService } from '../../core/i18n.service';
import { AiService } from '../../features/ai/ai.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {
  readonly i18n = inject(I18nService);
  readonly translations = computed(() => this.i18n.t().ABOUT);
  dynamicMessage: string | null = null;
 
  constructor(private aiService: AiService) {}

  ngOnInit(): void {
    const stack = ['Angular', 'Spring Boot', 'PostgreSQL'];
    this.aiService.generateDynamicMessage(stack).subscribe({
      next: (msg: string) => (this.dynamicMessage = msg),
      error: () => {
        this.dynamicMessage = 'Error loading message';
      }
    });
  }
}
