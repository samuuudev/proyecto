import { Component } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jugadores-manager',
  imports: [CommonModule, FormsModule],
  templateUrl: './jugadores-manager.html',
  styleUrls: ['./jugadores-manager.scss'],
  standalone: true
})
export class JugadoresManager {

  users: any[] = [];

  newUser = {
    username: '',
    email: '',
    dni: '',
    password: '',
    rol: 'jugador'
  };

  search = {
    username: '',
    email: '',
    dni: '',
    rol: ''
  };

  editingUser: any = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: data => this.users = data,
      error: err => console.error('Error cargando usuarios:', err)
    });
  }

  addUser(): void {
    if (!this.newUser.username || !this.newUser.email || !this.newUser.dni || !this.newUser.password) return;

    this.userService.addUser(this.newUser).subscribe({
      next: () => {
        this.loadUsers();
        this.newUser = { username: '', email: '', dni: '', password: '', rol: '' };
      },
      error: err => console.error('Error agregando usuario:', err)
    });
  }

  // Abrir modal de edición
  editUser(user: any): void {
    this.editingUser = { ...user }; // Clonamos para no mutar la lista directamente
  }

  // Guardar cambios del usuario editado
  updateUser(): void {
    if (!this.editingUser || !this.editingUser._id) return;

    this.userService.updateUser(this.editingUser._id, this.editingUser).subscribe({
      next: () => {
        this.loadUsers();
        this.editingUser = null;
      },
      error: err => console.error('Error actualizando usuario:', err)
    });
  }

  // Cerrar modal sin guardar
  closeEditModal(): void {
    this.editingUser = null;
  }

  deleteUser(id: string): void {
    if (!confirm('¿Seguro que deseas eliminar este usuario?')) return;

    this.userService.deleteUser(id).subscribe({
      next: () => this.loadUsers(),
      error: err => console.error('Error eliminando usuario:', err)
    });
  }
}
