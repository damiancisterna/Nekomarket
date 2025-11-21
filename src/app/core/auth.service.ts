// src/app/core/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, throwError } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'vendedor' | 'comprador' | 'admin';
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly KEY = 'neko:user';
  private readonly baseUrl = 'http://localhost:3000'; // json-server

  private _user$ = new BehaviorSubject<User | null>(this.load());
  /** stream para escuchar cambios de sesión */
  user$ = this._user$.asObservable();

  /** usuario actual (o null) */
  get user(): User | null {
    return this._user$.value;
  }

  /** true si hay alguien logueado */
  get isLoggedIn(): boolean {
    return !!this._user$.value;
  }

  /** helpers por rol */
  get isSeller(): boolean {
    return this.user?.role === 'vendedor';
  }

  get isBuyer(): boolean {
    return this.user?.role === 'comprador';
  }

  constructor(private http: HttpClient) {}

  /**
   * Login contra json-server:
   * busca en /users?email=...&password=...
   */
  login(email: string, password: string): Observable<User> {
    if (!email || !password) {
      return throwError(() => new Error('Debes ingresar email y contraseña'));
    }

    return this.http
      .get<User[]>(`${this.baseUrl}/users`, {
        params: { email, password }
      })
      .pipe(
        map(users => {
          if (!users.length) {
            throw new Error('Credenciales inválidas');
          }
          const user = users[0];
          this.commit(user);   // guarda en memoria + localStorage
          return user;
        })
      );
  }

  /** Cierra sesión */
  logout(): void {
    this.commit(null);
  }

  // ================== Helpers internos ==================

  private commit(user: User | null): void {
    this._user$.next(user);

    if (user) {
      localStorage.setItem(this.KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.KEY);
    }
  }

  private load(): User | null {
    try {
      const raw = localStorage.getItem(this.KEY);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  }
}
