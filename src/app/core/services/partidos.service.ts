import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PartidosService {
  baseUrl = 'http://localhost:3000/api/partidos';

  constructor(private http: HttpClient) {}

  getPartidos() {
    return this.http.get(this.baseUrl);
  }

  addPartido(partido: any) {
    return this.http.post(this.baseUrl, partido);
  }

  updatePartido(id: string, partido: any) {
    return this.http.put(`${this.baseUrl}/${id}`, partido);
  }

  deletePartido(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
