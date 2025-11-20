import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './app/components/login/login';
import 'zone.js'; 

bootstrapApplication(LoginComponent, {
  providers: [
    provideRouter([]),
    provideHttpClient()
  ]
}).catch(err => console.error(err));
