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
  readonly fallbackMessage = 'Transforming ideas...';
  readonly dynamicMessage$ = inject(StackTrailService).trail$.pipe(
    tap(trail => this.trace.trace('trail emission', trail)),
    switchMap(trail => {
      if (!trail.length) {
        this.trace.trace('fallback no trail');
        return of(this.fallbackMessage);
      }
      return concat(
        of(this.fallbackMessage).pipe(tap(() => this.trace.trace('fallback start'))),
        this.aiService.generateDynamicMessage(trail).pipe(
          catchError(err => {
            this.trace.trace('ai error', err);
            return of(this.fallbackMessage);
          })
        )
      );
    }),
    tap(msg => this.trace.trace('dynamic emission', msg)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(private aiService: AiService, private trace: TraceService) {}
}
