import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { Carousel } from './components/carousel/carousel';
import { About } from './components/about/about';
import { Cases } from './components/cases/cases';
import { Services } from './components/services/services';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';
import { LoginComponent } from './features/login/login.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { routeAnimations } from './app.animations'; // Importa las animaciones

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
    LoginComponent,
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  standalone: true,
  animations: [routeAnimations] // Aquí se activan
})
export class App {
  mostrarLogin = false;
  abrirLogin() { this.mostrarLogin = true; }
  cerrarLogin() { this.mostrarLogin = false; }
}
