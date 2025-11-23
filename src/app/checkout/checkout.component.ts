import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, NgIf, NgFor, AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { CartService, CartLine } from '../core/cart.service';
import { AuthService } from '../core/auth.service';
import { SellerDashboardService, Orden } from '../core/seller-dashboard.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, NgIf, NgFor, AsyncPipe],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  private cart = inject(CartService);
  auth = inject(AuthService);
  private sellerService = inject(SellerDashboardService);
  private router = inject(Router);

  lineas: CartLine[] = [];
  total = 0;

  cargando = false;
  mensajeError = '';

  ngOnInit(): void {
    this.cart.cart$.pipe(first()).subscribe(lines => {
      this.lineas = lines;
      this.total = lines.reduce((acc, l) => acc + l.qty * l.product.price, 0);
    });
  }

  confirmarPago(): void {
    this.mensajeError = '';

    const user = this.auth.user;
    if (!user) {
      this.mensajeError = 'Debes iniciar sesión para pagar.';
      return;
    }

    if (!this.lineas.length) {
      this.mensajeError = 'No hay productos en el carrito.';
      return;
    }

    this.cargando = true;
    const fecha = new Date().toISOString();

    // Creamos una orden por cada línea de carrito
    const peticiones = this.lineas.map(line => {
      const orden: Omit<Orden, 'id'> = {
        producto: line.product.name,
        fecha,
        total: line.product.price * line.qty,
        estado: 'Pendiente',
        buyerId: user.id,
        sellerId: (line.product as any).sellerId ?? 1, // prototipo: sellerId=1
        productId: line.product.id,
        cantidad: line.qty,
      };

      return this.sellerService.crearOrden(orden).toPromise();
    });

    Promise.all(peticiones)
      .then(() => {
        // Vaciar carrito
        this.cart.clear();

        // Navegar a una página de gracias simple
        this.cargando = false;
        this.router.navigate(['/gracias']);
      })
      .catch(err => {
        console.error(err);
        this.cargando = false;
        this.mensajeError = 'Ocurrió un error al registrar la compra.';
      });
  }
}
