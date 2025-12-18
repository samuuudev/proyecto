import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.html',
  styleUrl: './registro.scss',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, RouterLink]
})
export class RegistroComponent {
  username = "";
  password = "";
  email = "";
  dni = "";
  equipo = "";
  posicion = "";

  constructor(private authService: AuthService, private router: Router) {}

  registrar() {
    console.log("Registro con: ", this.username, this.password, this.email, this.dni);
    this.authService.register(this.username, this.password, this.email, this.dni, this.equipo, this.posicion).subscribe({
      next: (res) => {
        console.log("Respuesta del servidor:", res);
        window.alert("Registro exitoso: " + JSON.stringify(res));
        this.router.navigate(["/jugador"]);
      },
      error: (err) => {
        console.error("Error en el registro del usuario:", err);
        window.alert("Error al registrar: " + err.message);
      }
    });
  }
}
