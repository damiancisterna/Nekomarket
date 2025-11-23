// src/app/core/seller-dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Orden {
    id: number;
    producto: string;
    fecha: string;
    total: number;
    estado: string;
    buyerId: number;
    sellerId: number;
    productId: string;
    cantidad: number;
}

@Injectable({ providedIn: 'root' })
export class SellerDashboardService {
    private api = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    // 👉 trae todas las órdenes
    getOrdenes(): Observable<Orden[]> {
        return this.http.get<Orden[]>(`${this.api}/orden`);
    }

    // 👉 opcional: solo las de un vendedor
    getOrdenesPorVendedor(sellerId: number): Observable<Orden[]> {
        return this.http.get<Orden[]>(`${this.api}/orden`, {
            params: { sellerId: sellerId.toString() },
        });
    }

    // 👉 actualiza el estado de UNA orden
    actualizarEstado(id: number, estado: string) {
        return this.http.patch<Orden>(`${this.api}/orden/${id}`, { estado });
    }
    // crear una orden nueva (por ejemplo al pagar el carrito)
    crearOrden(orden: Omit<Orden, 'id'>) {
        return this.http.post<Orden>(`${this.api}/orden`, orden);
    }
    borrarOrden(id: number) {
  return this.http.delete<void>(`${this.api}/orden/${id}`);
}


}
