import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UiStore {
  private _cartOpen$ = new BehaviorSubject<boolean>(false);
  cartOpen$ = this._cartOpen$.asObservable();

  openCart()  { this._cartOpen$.next(true); }
  closeCart() { this._cartOpen$.next(false); }
  toggleCart(){ this._cartOpen$.next(!this._cartOpen$.value); }
}
