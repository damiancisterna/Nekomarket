import { Component, Input, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, NgIf, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { CartService } from '../../core/cart.service';
import { Product } from '../../core/models';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, NgIf, AsyncPipe],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.scss'],
})
export class ProductCard {
  private cart = inject(CartService);

  private _product!: Product;

  @Input({ required: true })
  set product(p: Product) {
    this._product = p;
    this.qty$ = this.cart.qty$(p.id);
  }

  get product(): Product {
    return this._product;
  }

  qty$!: Observable<number>;
  maxPerSku = this.cart.getMaxPerSku();

  add() { this.cart.add(this.product); }
  inc() { this.cart.inc(this.product.id); }
  dec() { this.cart.dec(this.product.id); }
}
