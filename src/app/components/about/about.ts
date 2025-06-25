import { Component, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { I18nService } from '../../core/i18n.service';
import { AiService } from '../../features/ai/ai.service';
import { CommonModule } from '@angular/common';
import { StackTrailService } from '../../stack-trail.service';
import { TraceService } from '../../core/trace.service';
import { of, concat } from 'rxjs';
import { switchMap, tap, catchError, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class About {
  readonly i18n = inject(I18nService);
  readonly translations = computed(() => this.i18n.t().ABOUT);
  private readonly fallbackMessages = [
    'Transforming ideas...',
    'Shaping concepts...',
    'Refining visions...'
  ];

  private randomFallback(): string {
    const msg = this.fallbackMessages[
      Math.floor(Math.random() * this.fallbackMessages.length)
    ];
    this.trace.trace('fallback chosen', msg);
    return msg;
  }
  readonly dynamicMessage$ = inject(StackTrailService).trail$.pipe(
    tap(trail => this.trace.trace('trail emission', trail)),
    switchMap(trail => {
      if (!trail.length) {
        const msg = this.randomFallback();
        this.trace.trace('fallback no trail');
        return of(msg);
      }
      return concat(
        of(this.randomFallback()).pipe(
          tap(msg => this.trace.trace('fallback start', msg))
        ),
        this.aiService.generateDynamicMessage(trail).pipe(
          catchError(err => {
            this.trace.trace('ai error', err);
            return of(this.randomFallback());
          })
        )
      );
    }),
    tap(msg => this.trace.trace('dynamic emission', msg)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(private aiService: AiService, private trace: TraceService) {}
}
