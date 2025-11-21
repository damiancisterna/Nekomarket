import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Product } from './models';

export interface CartLine { product: Product; qty: number; }
export type Cart = CartLine[];

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly STORAGE_KEY = 'neko:cart';
  private readonly MAX_PER_SKU = 20;

  getMaxPerSku(): number { return this.MAX_PER_SKU; }

  private _cart$ = new BehaviorSubject<Cart>(this.load());
  cart$  = this._cart$.asObservable();

  count$ = this.cart$.pipe(map(lines => lines.reduce((a, l) => a + l.qty, 0)));
  total$ = this.cart$.pipe(map(lines => lines.reduce((a, l) => a + l.qty * l.product.price, 0)));

  // Stream con la cantidad de un producto (0 si no está)
  qty$(productId: string): Observable<number> {
    return this.cart$.pipe(
      map(lines => lines.find(x => x.product.id === productId)?.qty ?? 0)
    );
  }

  add(product: Product, inc = 1): void {
    const cart = structuredClone(this._cart$.value) as Cart;
    const i = cart.findIndex(l => l.product.id === product.id);
    if (i === -1) cart.push({ product, qty: Math.min(this.MAX_PER_SKU, Math.max(1, inc)) });
    else cart[i].qty = Math.min(this.MAX_PER_SKU, cart[i].qty + Math.max(1, inc));
    this.commit(cart);
  }

  setQty(productId: string, qty: number): void {
    const cart = structuredClone(this._cart$.value) as Cart;
    const i = cart.findIndex(l => l.product.id === productId);
    if (i === -1) return;
    const n = Math.floor(Number(qty) || 0);
    const clamp = Math.max(0, Math.min(this.MAX_PER_SKU, n));
    if (clamp === 0) cart.splice(i, 1); else cart[i].qty = clamp;
    this.commit(cart);
  }

  inc(productId: string): void {
    const line = this._cart$.value.find(l => l.product.id === productId);
    if (!line) return;
    this.add(line.product, 1);
  }

  dec(productId: string): void {
    const cart = structuredClone(this._cart$.value) as Cart;
    const i = cart.findIndex(l => l.product.id === productId);
    if (i === -1) return;
    cart[i].qty = cart[i].qty - 1;
    if (cart[i].qty <= 0) cart.splice(i, 1);
    this.commit(cart);
  }

  remove(productId: string): void {
    this.commit(this._cart$.value.filter(l => l.product.id !== productId));
  }

  clear(): void { this.commit([]); }

  private commit(cart: Cart): void {
    this._cart$.next(cart);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
  }
  private load(): Cart {
    try { return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]'); }
    catch { return []; }
  }
}
