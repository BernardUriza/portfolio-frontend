import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StackTrailService {
  private trailSubject = new BehaviorSubject<string[]>([]);
  readonly trail$ = this.trailSubject.asObservable();

  addStack(stack: string) {
    const trail = this.trailSubject.getValue();
    if (!trail.includes(stack)) {
      this.trailSubject.next([...trail, stack]);
    }
  }

  getTrail(): string[] {
    return this.trailSubject.getValue();
  }

  clearTrail() {
    this.trailSubject.next([]);
  }
}
