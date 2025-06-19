import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  standalone: true,
})
export class Header {
  constructor(private router: Router) {}

  scrollTo(section: string, event?: Event) {
    if (event) event.preventDefault();
    const el = document.getElementById(section);
    if (el) {
      const header = document.querySelector('header');
      const offset = header ? header.clientHeight : 0;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  go(route: string) {
    this.router.navigate([route]).then(() => {
      setTimeout(() => this.scrollTo('main-content'), 50);
    });
  }


  isActive(route: string) {
    return this.router.url.includes(route);
  }
}
