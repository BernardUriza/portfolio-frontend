import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  standalone: true,
})
export class Header {
  constructor(private router: Router) {}

  scrollTo(section: string, event: Event) {
    event.preventDefault();
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }

  go(route: string) {
    this.router.navigate([route]);
  }

  isActive(route: string) {
    return this.router.url.includes(route);
  }
}
