import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './models';

@Injectable({ providedIn: 'root' })
export class ProductApiService {

  private readonly baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Para "Ofertas de hoy" (todos los productos)
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  // Para Pelucas, Trajes, etc.
  getByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`, {
      params: { category }
    });
  }
}
