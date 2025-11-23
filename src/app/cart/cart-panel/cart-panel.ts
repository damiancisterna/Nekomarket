import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, NgIf, NgFor, AsyncPipe } from '@angular/common';

import { UiStore } from '../../core/ui.store';
import { CartService } from '../../core/cart.service';
import { AuthService } from '../../core/auth.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';   // 👈 OJO: el Router CORRECTO

@Component({
  selector: 'app-cart-panel',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, AsyncPipe, CurrencyPipe],
  templateUrl: './cart-panel.html',
  styleUrls: ['./cart-panel.scss'],
})
export class CartPanel {
  ui   = inject(UiStore);
  cart = inject(CartService);
  auth = inject(AuthService);
  router = inject(Router);

  close()  { this.ui.closeCart(); }
  inc(id: string)    { this.cart.inc(id); }
  dec(id: string)    { this.cart.dec(id); }
  remove(id: string) { this.cart.remove(id); }
  clear()            { this.cart.clear(); }

  async pagar(): Promise<void> {
    console.log('[CartPanel] click en Pagar');

    const user = this.auth.user;

    if (!user) {
      alert('Debes iniciar sesión para pagar');
      return;
    }

    if (user.role !== 'comprador') {
      alert('Solo los compradores pueden pagar');
      return;
    }

    // Revisar que el carrito tenga algo
    const items = await firstValueFrom(this.cart.cart$);
    if (!items || !items.length) {
      alert('Tu carrito está vacío');
      return;
    }

    // 👉 Aquí ya NO creamos órdenes.
    // Solo cerramos el panel y vamos a /checkout
    this.ui.closeCart();
    this.router.navigate(['/checkout']);
  }
}
