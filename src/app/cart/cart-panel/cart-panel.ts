import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, NgIf, NgFor, AsyncPipe } from '@angular/common';
import { UiStore } from '../../core/ui.store';
import { CartService } from '../../core/cart.service';

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

  close() { this.ui.closeCart(); }
  inc(id: string) { this.cart.inc(id); }
  dec(id: string) { this.cart.dec(id); }
  remove(id: string) { this.cart.remove(id); }
  clear() { this.cart.clear(); }
}
