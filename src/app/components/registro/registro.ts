import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Console, error } from 'console';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.html',
  styleUrl: './registro.scss',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule]
})
export class RegistroComponent {
  username = "";
  password = "";
  email = "";

  constructor(private authService: AuthService) {}

 registrar() {
  console.log("Registro con: ", this.username, this.password);
  this.authService.register(this.username, this.password, this.email).subscribe({
    next: res => window.alert("Registro exitoso" + JSON.stringify(res)),
    error: err => console.log("Error en el registro del usuario")
  });
 }

}
