// src/app/vendedor/panel-vendedor.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

interface Venta {
  id: number;
  producto: string;
  fecha: string;
  total: number;
  estado: 'Pagada' | 'Pendiente' | 'Cancelada';
}

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
export class PanelVendedorComponent {
  // Estadísticas mock
  resumen = {
    ventasHoy: 3,
    ventasMes: 125000,
    totalComisiones: 12000,
    saldoDisponible: 50000,
  };

  // Mocks de datos para las tablas
  ventas: Venta[] = [
    { id: 1, producto: 'Peluca Neko Rosa', fecha: '2025-11-20', total: 19990, estado: 'Pagada' },
    { id: 2, producto: 'Traje Cosplay Demon Slayer', fecha: '2025-11-19', total: 34990, estado: 'Pendiente' },
  ];

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
}
