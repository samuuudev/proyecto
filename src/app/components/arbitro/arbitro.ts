import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PartidosService } from '../../core/services/partidos.service';

@Component({
  selector: 'app-arbitro',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './arbitro.html',
  styleUrls: ['./arbitro.scss'],
})
export class Arbitro implements OnInit {
  partidos: any[] = [];
  cargando = true;
  editId: string | null = null;
  form: any = { scoreA: 0, scoreB: 0, estado: '' };
  error = '';

  constructor(private partidosService: PartidosService) {}

  ngOnInit(): void {
    this.loadPartidos();
  }

  loadPartidos() {
    this.cargando = true;
    this.partidosService.getPartidos().subscribe({
      next: (res: any) => {
        this.cargando = false;
        this.partidos = Array.isArray(res) ? res : (res && res.data) || [];
      },
      error: (err: any) => {
        this.cargando = false;
        this.error = 'Error cargando partidos';
        console.error('Error getPartidos:', err);
      }
    });
  }

  startEdit(partido: any) {
    this.editId = partido._id || partido.id;
    this.form = { scoreA: partido.scoreA || 0, scoreB: partido.scoreB || 0, estado: partido.estado || '' };
  }

  cancelar() {
    this.editId = null;
    this.form = { scoreA: 0, scoreB: 0, estado: '' };
  }

  guardar(partido: any) {
    const id = partido._id || partido.id;
    const payload = { ...partido, scoreA: this.form.scoreA, scoreB: this.form.scoreB, estado: this.form.estado };
    this.partidosService.updatePartido(id, payload).subscribe({
      next: (res: any) => {
        this.editId = null;
        this.loadPartidos();
      },
      error: (err: any) => {
        console.error('Error actualizando partido:', err);
        window.alert('Error al actualizar partido');
      }
    });
  }

}
