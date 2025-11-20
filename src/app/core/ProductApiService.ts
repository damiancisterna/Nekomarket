import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './models';

@Injectable({ providedIn: 'root' })
export class ProductApiService {

  private readonly baseUrl = 'http://localhost:3000'; // donde corre json-server

  constructor(private http: HttpClient) { }

  /** Trae todos los productos (para "Ofertas de hoy") */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  /** Trae productos filtrados por categoría */
  getByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`, {
      params: { category }
    });
  }
}
