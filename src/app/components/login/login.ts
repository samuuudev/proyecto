import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [FormsModule, CommonModule, HttpClientModule, RouterLink]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

 login() {
  console.log('Intentando login con:', this.username, this.password);
  this.authService.login(this.username, this.password).subscribe({
    next: res => {
      console.log('Login: ', res);
      if (res.user) {
        // if (res.user.rol == "admin") 
        switch (res.user.rol) {
          case "admin":
            this.router.navigate(['/admin']);
            break;
          case "jugador":
            this.router.navigate(["/jugador"]);
            break;
          }

      } else {
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    },
    error: err => {
      console.error('Error en login', err);
      this.errorMessage = 'Error al iniciar sesión';
    }
  });
  }

}
