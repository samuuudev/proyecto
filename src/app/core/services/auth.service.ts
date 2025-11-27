import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/login';
  private registroUrl = "http://localhost:3000/api/registro"
  private currentUser: any = null;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { username, password}).pipe(
      tap((response: any) => {
        if (response.user) {
          this.currentUser = response.user;
          localStorage.setItem('currentUser', JSON.stringify(response.user));
        }
      })
    );
  }

  register(username: string, password:string, email: string, dni: string): Observable<any> {
    return this.http.post(this.registroUrl, { username, password, email, dni})
  }
}
