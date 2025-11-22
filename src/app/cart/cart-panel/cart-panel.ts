import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, NgIf, NgFor, AsyncPipe } from '@angular/common';
import { UiStore } from '../../core/ui.store';
import { CartService } from '../../core/cart.service';
import { SellerDashboardService } from '../../core/seller-dashboard.service';
import { AuthService } from '../../core/auth.service';
import { firstValueFrom } from 'rxjs';

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
  sellerDashboard = inject(SellerDashboardService);

  close()  { this.ui.closeCart(); }
  inc(id: string)    { this.cart.inc(id); }
  dec(id: string)    { this.cart.dec(id); }
  remove(id: string) { this.cart.remove(id); }
  clear()            { this.cart.clear(); }

  async pagar(): Promise<void> {
    const user = this.auth.user;

    if (!user) {
      alert('Debes iniciar sesión para pagar');
      return;
    }

    if (user.role !== 'comprador') {
      alert('Solo los compradores pueden pagar');
      return;
    }

    // foto del carrito
    const items = await firstValueFrom(this.cart.cart$);

    if (!items || !items.length) {
      alert('Tu carrito está vacío');
      return;
    }

    // crear una orden por cada línea
    for (const item of items) {
      const p        = item.product;
      const cantidad = item.qty;
      const total    = p.price * cantidad;
      const sellerId = (p as any).sellerId ?? 1; // Ana por defecto

      // 👇 AQUÍ va el POST REAL
      await firstValueFrom(
        this.sellerDashboard.crearOrden({
          producto:  p.name,
          fecha:     new Date().toISOString().slice(0, 10),
          total,
          estado:    'Pagada',
          buyerId:   user.id,
          sellerId,
          productId: p.id,
          cantidad,
        })
      );
    }

    alert('Compra registrada 🎉');
    this.cart.clear();
    this.ui.closeCart();
  }
}
