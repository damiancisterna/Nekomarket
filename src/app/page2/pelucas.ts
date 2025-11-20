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

  private api = inject(ProductApiService);

  pelucas: Product[] = [];

  ngOnInit(): void {
    // trae solo productos de categoría "Pelucas"
    this.api.getByCategory('Pelucas')
      .subscribe(data => this.pelucas = data);
  }
}
