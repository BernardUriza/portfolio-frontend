import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { Carousel } from './components/carousel/carousel';
import { About } from './components/about/about';
import { Cases } from './components/cases/cases';
import { Services } from './components/services/services';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';
import { AuthService } from './core/auth/auth.service'; 
import { LoginComponent } from './features/login/login.component'; 
@Component({
  selector: 'app-root',
  imports: [
    Header,
    Hero,
    Carousel,
    About,
    Cases,
    Services,
    Contact,
    Footer,
    LoginComponent 
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  standalone: true
})
export class App {
  constructor(public authService: AuthService) {}
}