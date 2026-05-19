import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core'; // ✨ Nombre oficial sin 'Experimental'
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(), // ✨ Activado oficialmente
    provideRouter(routes),
    provideHttpClient()
  ]
};