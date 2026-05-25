import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app'; // 🌟 Corregido de App a AppComponent
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient()
  ]
}).catch(err => console.error(err));