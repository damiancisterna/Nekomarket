// src/app/pages/home/home.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../layout/header/header';
import { Nav } from '../../layout/nav/nav';
import { HeroComponent } from '../../sections/hero/hero';
import { SectionTitleComponent } from '../../sections/section-title/section-title';
import { ProductCard } from '../../ui/product-card/product-card';
import { CategoryCard } from '../../ui/category-card/category-card';
import { Footer } from '../../layout/footer/footer';
import { CartPanel } from '../../cart/cart-panel/cart-panel';

// OJO: ruta correcta al mock:
import { PRODUCTS } from '../../core/mock-products';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,                 // <- necesario para *ngFor
    Header, Nav, HeroComponent,
    SectionTitleComponent, ProductCard,
    CategoryCard, Footer, CartPanel
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home {
  products = PRODUCTS;            // <- asegura que exista y tenga datos
}
