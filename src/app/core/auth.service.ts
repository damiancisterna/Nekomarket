import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  id: string;
  email: string;
  role: 'buyer' | 'seller' | 'admin';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly KEY = 'neko:user';
  private _user$ = new BehaviorSubject<User | null>(this.load());
  user$ = this._user$.asObservable();

  get user(): User | null { return this._user$.value; }
  get isLoggedIn(): boolean { return !!this._user$.value; }

  async login(email: string, password: string) {
    // STUB: valida “algo” y crea un usuario fake
    if (!email || !password) throw new Error('Credenciales requeridas');
    const user: User = { id: crypto.randomUUID(), email, role: 'buyer' };
    this.commit(user);
  }

  logout() {
    this.commit(null);
  }

  // Helper
  private commit(user: User | null) {
    this._user$.next(user);
    if (user) localStorage.setItem(this.KEY, JSON.stringify(user));
    else localStorage.removeItem(this.KEY);
  }
  private load(): User | null {
    try { return JSON.parse(localStorage.getItem(this.KEY) || 'null'); }
    catch { return null; }
  }
}
