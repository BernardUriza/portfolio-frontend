import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateService, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  ]
}).then(appRef => {
  const translate = appRef.injector.get(TranslateService);
  translate.addLangs(['en', 'es']);
  translate.setDefaultLang('en');
  const browserLang = translate.getBrowserLang() || 'en';
  translate.use(browserLang.match(/en|es/) ? browserLang : 'en');
});
