import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JugadoresService {
  private baseUrl = 'http://localhost:3000/api/jugadores';

  constructor(private http: HttpClient) {}

  getJugadorByUserId(userId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${userId}`);
  }

  createJugador(jugador: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, jugador);
  }

  getAllJugadores(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

}
