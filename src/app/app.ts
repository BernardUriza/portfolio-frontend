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
import { CommonModule } from '@angular/common';
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
    CommonModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  standalone: true
})
export class App {
  constructor(public authService: AuthService) {}
    mostrarLogin = false; // Valor por defecto, cambia según tu lógica

  // Si quieres mostrar el login al hacer clic en algún botón, agrega el método:
  abrirLogin() {
    this.mostrarLogin = true;
  }

  cerrarLogin() {
    this.mostrarLogin = false;
  }
}