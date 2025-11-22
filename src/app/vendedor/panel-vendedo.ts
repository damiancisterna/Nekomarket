// src/app/vendedor/panel-vendedor.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../core/auth.service';
import {
  SellerDashboardService,
  Orden,
} from '../core/seller-dashboard.service';

interface Retiro {
  id: number;
  fecha: string;
  monto: number;
  estado: 'Solicitado' | 'En proceso' | 'Completado';
}

interface Mensaje {
  id: number;
  de: string;
  asunto: string;
  fecha: string;
  leido: boolean;
}

interface Reclamo {
  id: number;
  comprador: string;
  motivo: string;
  fecha: string;
  estado: 'Abierto' | 'En revisión' | 'Resuelto';
}

@Component({
  selector: 'app-panel-vendedor',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatButtonModule,
  ],
  templateUrl: './panel-vendedo.html',
  styleUrls: ['./panel-vendedo.scss'],
})
export class PanelVendedorComponent implements OnInit {

  resumen = {
    ventasHoy: 0,
    ventasMes: 0,
    totalComisiones: 0,
    saldoDisponible: 0,
  };

  // 👇 AQUÍ se cargan las órdenes desde json-server
  ventas: Orden[] = [];

  // mocks de ejemplo que ya tenías
  retiros: Retiro[] = [
    { id: 1, fecha: '2025-11-15', monto: 50000, estado: 'Completado' },
    { id: 2, fecha: '2025-11-22', monto: 30000, estado: 'Solicitado' },
  ];

  mensajes: Mensaje[] = [
    { id: 1, de: 'comprador1@correo.cl', asunto: 'Duda sobre talla', fecha: '2025-11-20', leido: false },
    { id: 2, de: 'comprador2@correo.cl', asunto: 'Consulta envío', fecha: '2025-11-19', leido: true },
  ];

  reclamos: Reclamo[] = [
    { id: 1, comprador: 'comprador1', motivo: 'Producto dañado', fecha: '2025-11-18', estado: 'En revisión' },
  ];

  constructor(private sellerService: SellerDashboardService) {}

  ngOnInit(): void {
    this.sellerService.getOrdenes().subscribe({
      next: (ordenes) => {
        this.ventas = ordenes;

        const totalMes = ordenes.reduce((acc, o) => acc + o.total, 0);
        this.resumen.ventasMes = totalMes;
        this.resumen.ventasHoy = ordenes.length;
        this.resumen.totalComisiones = Math.round(totalMes * 0.1);
        this.resumen.saldoDisponible = totalMes - this.resumen.totalComisiones;

        console.log('Órdenes cargadas', ordenes);
      },
      error: (err) => {
        console.error('Error cargando órdenes', err);
      },
    });
  }

  cambiarEstado(orden: Orden, nuevoEstado: string): void {
    console.log('Click en cambiarEstado', orden.id, nuevoEstado);
    this.sellerService.actualizarEstado(orden.id!, nuevoEstado).subscribe({
      next: () => {
        orden.estado = nuevoEstado;
        console.log('Estado actualizado a', nuevoEstado);
      },
      error: (err) => {
        console.error('Error actualizando estado', err);
      },
    });
  }
}
