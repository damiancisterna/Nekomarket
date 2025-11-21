import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Header } from '../../layout/header/header';
import { Nav } from '../../layout/nav/nav';
import { HeroComponent } from '../../sections/hero/hero';
import { SectionTitleComponent } from '../../sections/section-title/section-title';
import { ProductCard } from '../../ui/product-card/product-card';
import { CategoryCard } from '../../ui/category-card/category-card';
import { Footer } from '../../layout/footer/footer';
import { CartPanel } from '../../cart/cart-panel/cart-panel';

import { Product } from '../../core/models';
import { ProductApiService } from '../../core/ProductApiService';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    Header, Nav, HeroComponent,
    SectionTitleComponent, ProductCard,
    CategoryCard, Footer, CartPanel
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit {

  products: Product[] = [];

  private api = inject(ProductApiService);

  ngOnInit(): void {
    this.api.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        // console.log('Productos para Ofertas de hoy', data);
      },
      error: (err) => {
        console.error('Error cargando productos desde json-server', err);
      }
    });
  }
}
