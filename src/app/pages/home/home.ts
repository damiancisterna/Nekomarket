import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { ProductApiService } from '../../core/ProductApiService';
import { Product } from '../../core/models';
import { ProductCard } from '../../ui/product-card/product-card';
import { HeroComponent } from '../../sections/hero/hero';
import { SectionTitleComponent } from '../../sections/section-title/section-title';
import { CategoryCard } from '../../ui/category-card/category-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ProductCard,
    HeroComponent,
    SectionTitleComponent,
    CategoryCard,
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home implements OnInit {

  private api   = inject(ProductApiService);
  private route = inject(ActivatedRoute);

  products: Product[] = [];

  // solo para mostrar (si quieres) lo que llegó por la URL ?q=
  searchTerm = '';

  ngOnInit(): void {
    // Escuchar cambios en el parámetro ?q= que manda el header
    this.route.queryParamMap.subscribe(params => {
      const q = params.get('q') ?? '';
      this.searchTerm = q;

      if (!q.trim()) {
        // sin texto → muestro todo
        this.cargarTodos();
      } else {
        // con texto → filtro
        this.buscar(q);
      }
    });

    // primera carga por si entran sin ?q=
    this.cargarTodos();
  }

  /** Carga todos los productos sin filtro */
  private cargarTodos(): void {
    this.api.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => console.error('Error cargando productos', err),
    });
  }

  /** Aplica filtro en el FRONT (nombre + categoría) */
  private buscar(q: string): void {
    const term = q.toLowerCase().trim();

    this.api.getProducts().subscribe({
      next: (data) => {
        this.products = data.filter(p =>
          p.name.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term)
        );
        console.log('[HOME] filtro =', term, 'resultados =', this.products.length);
      },
      error: (err) => console.error('Error filtrando productos', err),
    });
  }
}
