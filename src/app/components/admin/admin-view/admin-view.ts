import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

// Importar los componentes de gestión
import { JugadoresManager } from '../jugadores-manager/jugadores-manager';
import { ArbitrosManager } from '../arbitros-manager/arbitros-manager';
import { PartidosManager } from '../partidos-manager/partidos-manager';


@Component({
  selector: 'app-admin',
  imports: [CommonModule, JugadoresManager, ArbitrosManager, PartidosManager],
  templateUrl: './admin-view.html',
  styleUrl: './admin-view.scss',
  standalone: true
})
export class Admin {
  seccionActiva: 'usuarios' | 'arbitros' | 'partidos' = 'usuarios';

  mostrar(seccion: 'usuarios' | 'arbitros' | 'partidos') {
    this.seccionActiva = seccion;
  }
}
