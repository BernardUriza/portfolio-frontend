import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appConfig } from './app/app.config';
import { provideHttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from './app/app'; // o la ruta donde exportes tu factory
import { HttpClient } from '@angular/common/http';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    provideHttpClient(),
    provideAnimations(),
    {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    },
    TranslateModule
    ,
    ...(appConfig.providers || [])
  ]
}).catch(err => console.error(err));
