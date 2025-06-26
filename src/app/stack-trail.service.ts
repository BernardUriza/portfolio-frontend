import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TraceService } from './core/trace.service';

@Injectable({ providedIn: 'root' })
export class StackTrailService {
  private trailSubject = new BehaviorSubject<string[]>([]);
  readonly trail$ = this.trailSubject.asObservable();

  constructor(private trace: TraceService) {}

  addStack(stack: string) {
    const trail = this.trailSubject.getValue();
    if (!trail.includes(stack)) {
      const next = [...trail, stack];
      this.trace.trace('stack add', next);
      this.trailSubject.next(next);
    } else {
      this.trace.trace('stack already present', stack);
    }
  }

  getTrail(): string[] {
    const current = this.trailSubject.getValue();
    this.trace.trace('stack get', current);
    return current;
  }

  clearTrail() {
    this.trace.trace('stack clear');
    this.trailSubject.next([]);
  }
}
