import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TraceService {
  trace(...args: any[]): void {
    console.debug('[TRACE]', ...args);
  }
}
