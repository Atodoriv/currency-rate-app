import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations'
import { ExchangeService } from './core/services/exchange.service';
//import { provideClientHydration } from '@angular/platform-browser';
  import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  CommonModule, provideAnimations(),
  ExchangeService,
  provideHttpClient(withInterceptorsFromDi())]
};
