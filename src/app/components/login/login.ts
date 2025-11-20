import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [FormsModule, CommonModule, HttpClientModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

 login() {
  console.log('Intentando login con:', this.username, this.password);
  this.authService.login(this.username, this.password).subscribe({
    next: res => console.log('Login exitoso', res),
    error: err => console.error('Error en login', err)
  });
  }

}
