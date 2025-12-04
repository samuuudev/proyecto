import { Routes } from '@angular/router';

// se hace un import por cada componente que tenga
import { LoginComponent } from './components/login/login';
import { RegistroComponent } from './components/registro/registro';
import { Admin } from './components/admin/admin-view/admin-view';
import { Jugador } from './components/jugador/jugador';

// Imports de los componentes admin
import { ArbitrosManager } from './components/admin/arbitros-manager/arbitros-manager';
import { JugadoresManager } from './components/admin/jugadores-manager/jugadores-manager';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'admin', component: Admin },
  { path: 'jugador', component: Jugador },
  { path: "usuariosManager", component: JugadoresManager},
  { path: "arbitrosManager", component: ArbitrosManager },
];
