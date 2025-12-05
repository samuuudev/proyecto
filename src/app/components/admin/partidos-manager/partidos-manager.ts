import { Component, OnInit } from '@angular/core';
import { PartidosService } from '../../../core/services/partidos.service'; // Asegúrate que la ruta al servicio sea correcta
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Define una interfaz para la estructura de un Partido (opcional, pero buena práctica)
interface Partido {
  _id?: string;
  equipoA: string;
  equipoB: string;
  fecha: string; // Usamos string para manejar el input datetime-local
  mapa: 'Bind' | 'Haven' | 'Split' | 'Ascent' | 'Icebox';
  scoreA: number;
  scoreB: number;
  estado: 'pendiente' | 'en curso' | 'finalizado';
}

@Component({
  selector: 'app-partidos-manager',
  // Necesitas importar CommonModule para directivas como *ngFor, *ngIf, etc.
  // FormsModule para el two-way binding con [(ngModel)]
  // HttpClientModule, aunque es mejor en App/Root, lo incluimos para este ejemplo si el servicio no está en Root
  imports: [CommonModule, FormsModule, HttpClientModule],
  standalone: true, // Si estás usando Angular Standalone Components
  templateUrl: './partidos-manager.html',
  styleUrl: './partidos-manager.scss',
  // Es mejor usar 'providedIn: root' en el servicio, pero si no, inclúyelo aquí:
  // providers: [PartidosService] 
})
export class PartidosManager implements OnInit {

  // Lista de partidos
  partidos: Partido[] = [];

  // Objeto para el formulario (edición o nuevo)
  partidoSeleccionado: Partido = this.crearPartidoVacio();

  // Mensajes de feedback
  mensaje: string = '';

  constructor(private partidosService: PartidosService) {}

  ngOnInit(): void {
    this.cargarPartidos();
  }

  /**
   * Crea un objeto Partido con valores iniciales para limpiar el formulario.
   */
  crearPartidoVacio(): Partido {
    // Inicializa la fecha con la hora local actual en formato de string para datetime-local
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    const fechaString = now.toISOString().slice(0, 16); // Formato YYYY-MM-DDThh:mm

    return {
      equipoA: '',
      equipoB: '',
      fecha: fechaString,
      mapa: 'Bind',
      scoreA: 0,
      scoreB: 0,
      estado: 'pendiente',
    };
  }

  /**
   * ⚽ Carga la lista de todos los partidos desde el servicio.
   */
  cargarPartidos(): void {
    this.partidosService.getPartidos().subscribe({
      next: (data: any) => {
        // Asegúrate de que los datos recibidos coincidan con la interfaz Partido[]
        this.partidos = data as Partido[];
      },
      error: (err) => {
        this.mensaje = 'Error al cargar los partidos.';
        console.error(err);
      }
    });
  }

  /**
   * 💾 Gestiona si se crea un partido nuevo o se actualiza uno existente.
   */
  guardarPartido(): void {
    this.mensaje = ''; // Limpiar mensajes anteriores
    
    // Asegurarse que los scores sean números
    this.partidoSeleccionado.scoreA = Number(this.partidoSeleccionado.scoreA);
    this.partidoSeleccionado.scoreB = Number(this.partidoSeleccionado.scoreB);

    if (this.partidoSeleccionado._id) {
      // Actualizar
      this.partidosService.updatePartido(this.partidoSeleccionado._id, this.partidoSeleccionado).subscribe({
        next: () => {
          this.mensaje = 'Partido actualizado con éxito.';
          this.cargarPartidos();
          this.resetearFormulario();
        },
        error: (err) => {
          this.mensaje = 'Error al actualizar el partido.';
          console.error(err);
        }
      });
    } else {
      // Crear nuevo
      this.partidosService.addPartido(this.partidoSeleccionado).subscribe({
        next: () => {
          this.mensaje = 'Partido creado con éxito.';
          this.cargarPartidos();
          this.resetearFormulario();
        },
        error: (err) => {
          this.mensaje = 'Error al crear el partido.';
          console.error(err);
        }
      });
    }
  }

  /**
   * 📝 Carga los datos de un partido para editar.
   */
  cargarPartidoParaEdicion(partido: Partido): void {
    // Clona el objeto para evitar modificar la lista directamente si la edición falla.
    // Además, ajusta el formato de la fecha si es necesario.
    const partidoEditado: Partido = { ...partido };
    if (partidoEditado.fecha) {
        // La BBDD puede devolver un ISO string, el input de HTML necesita el formato YYYY-MM-DDThh:mm
        const date = new Date(partidoEditado.fecha);
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        partidoEditado.fecha = date.toISOString().slice(0, 16);
    }
    
    this.partidoSeleccionado = partidoEditado;
    this.mensaje = `Editando partido entre ${partido.equipoA} y ${partido.equipoB}.`;
  }

  /**
   * 🗑️ Elimina un partido por su ID.
   */
  eliminarPartido(id: string | undefined): void {
    if (!id || !confirm('¿Estás seguro de que quieres eliminar este partido?')) {
      return;
    }

    this.partidosService.deletePartido(id).subscribe({
      next: () => {
        this.mensaje = 'Partido eliminado con éxito.';
        this.cargarPartidos();
        this.resetearFormulario();
      },
      error: (err) => {
        this.mensaje = 'Error al eliminar el partido.';
        console.error(err);
      }
    });
  }

  /**
   * 🔄 Reinicia el formulario al estado de "Crear Nuevo".
   */
  resetearFormulario(): void {
    this.partidoSeleccionado = this.crearPartidoVacio();
    this.mensaje = '';
  }
}