import { Routes } from '@angular/router';

// se hace un import por cada componente que tenga
import { LoginComponent } from './components/login/login';
import { RegistroComponent } from './components/registro/registro';
import { Admin } from './components/admin/admin';
import { Jugador } from './components/jugador/jugador';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'admin', component: Admin },
  { path: 'jugador', component: Jugador }
];
