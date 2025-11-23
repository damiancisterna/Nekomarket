import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './models';

@Injectable({ providedIn: 'root' })
export class ProductApiService {

  private readonly baseUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  /** Obtener todos los productos */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  /** Buscar por texto (q) y/o categoría */
  search(term?: string, category?: string): Observable<Product[]> {
    const params: any = {};

    if (term && term.trim()) params.q = term.trim();
    if (category && category.trim()) params.category = category.trim();

    if (Object.keys(params).length === 0) {
      return this.getProducts();
    }

    return this.http.get<Product[]>(this.baseUrl, { params });
  }

  /** Para páginas como /pelucas */
  getByCategory(category: string): Observable<Product[]> {
    return this.search(undefined, category);
  }
}
