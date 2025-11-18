import { Component, Input, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, NgIf, AsyncPipe } from '@angular/common';
import { CartService } from '../../core/cart.service';
import { Observable } from 'rxjs';

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  stock?: number;
}

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
    this.qty$ = this.cart.qty$(p.id);   // <- crea el stream cuando llega el input
  }
  get product() { return this._product; }

  qty$!: Observable<number>;
  maxPerSku = this.cart.getMaxPerSku();

  add() { this.cart.add(this.product); }
  inc() { this.cart.inc(this.product.id); }
  dec() { this.cart.dec(this.product.id); }
}
