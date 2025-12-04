import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

// Importar los componentes de gestión
import { JugadoresManager } from '../jugadores-manager/jugadores-manager';
import { ArbitrosManager } from '../arbitros-manager/arbitros-manager';


@Component({
  selector: 'app-admin',
  imports: [CommonModule, JugadoresManager, ArbitrosManager],
  templateUrl: './admin-view.html',
  styleUrl: './admin-view.scss',
  standalone: true
})
export class Admin {
  seccionActiva: 'usuarios' | 'arbitros' | 'competiciones' = 'usuarios';

  mostrar(seccion: 'usuarios' | 'arbitros' | 'competiciones') {
    this.seccionActiva = seccion;
  }
}
