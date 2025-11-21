import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionTitleComponent } from '../sections/section-title/section-title';
import { ProductCard } from '../ui/product-card/product-card';
import { Product } from '../core/models';
import { ProductApiService } from '../core/ProductApiService';

@Component({
  selector: 'app-pelucas-page',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent, ProductCard],
  templateUrl: './pelucas.html',
  styleUrls: ['./pelucas.css']
})
export class PelucasPageComponent implements OnInit {

  pelucas: Product[] = [];

  private api = inject(ProductApiService);

  ngOnInit(): void {
    this.api.getByCategory('Pelucas').subscribe({
      next: (data) => {
        this.pelucas = data;
        // console.log('Pelucas', data);
      },
      error: (err) => {
        console.error('Error cargando pelucas', err);
      }
    });
  }
}
