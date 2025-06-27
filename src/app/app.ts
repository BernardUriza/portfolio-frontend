import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { Carousel } from './components/carousel/carousel';
import { Between } from './components/between/between';
import { About } from './components/about/about';
import { Cases } from './components/cases/cases';
import { Services } from './components/services/services';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';
import { Banner } from './components/banner/banner';
import { GameChatComponent } from './components/game-chat/game-chat';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GameChatService } from './components/game-chat/game-chat.service';
import { routeAnimations } from './app.animations';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [
    Header,
    Hero,
    Banner,
    Carousel,
    Between,
    About,
    Cases,
    Services,
    Contact,
    GameChatComponent,
    Footer,
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  standalone: true,
  animations: [routeAnimations] 
})
export class App {
  mostrarLogin = false;
  mostrarRouterRoboticArea = true;
  
  constructor(private router: Router, private gameChat: GameChatService) {
    // Detecta la ruta actual y muestra el modal si es /login
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.mostrarLogin = this.router.url === '/login';
      }
    });
    // inicia el seguimiento de rutas y clics para el chat
    this.gameChat.trackRouteChanges(this.router);
    this.gameChat.trackClicks();
  }
  abrirLogin() {
    this.router.navigate(['/login']);
  }

  cerrarLogin() {
    // Vuelve a la home o la ruta anterior
    this.router.navigate(['/']);
  }
}
