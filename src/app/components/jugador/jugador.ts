import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PartidosService } from '../../core/services/partidos.service';

@Component({
  selector: 'app-jugador',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './jugador.html',
  styleUrls: ['./jugador.scss'],
})
export class Jugador implements OnInit {
  currentUser: any = null;
  equipo: string | null = null;
  partidos: any[] = [];
  cargando = true;
  error = '';

  constructor(private partidosService: PartidosService) {}

  ngOnInit(): void {
    try {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    } catch (e) {
      this.currentUser = null;
    }

    // Buscar posible campo de equipo en el usuario (diferentes nombres posibles)
    this.equipo = this.currentUser?.equipo || this.currentUser?.team || this.currentUser?.teamName || this.currentUser?.club || null;

    this.partidosService.getPartidos().subscribe({
      next: (res: any) => {
        this.cargando = false;
        const lista = Array.isArray(res) ? res : (res && res.data) || [];
        if (!this.equipo) {
          this.partidos = [];
        } else {
          this.partidos = lista.filter((p: any) => p.equipoA === this.equipo || p.equipoB === this.equipo);
        }
      },
      error: (err: any) => {
        this.cargando = false;
        this.error = 'Error cargando partidos';
        console.error('Error getPartidos:', err);
      }
    });
  }

}
