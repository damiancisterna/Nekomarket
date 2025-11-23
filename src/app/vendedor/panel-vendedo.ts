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

import { ChatService, ChatMessage } from '../core/chat.service';

// 👇 librerías para PDF
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Retiro {
  id: number;
  fecha: string;
  monto: number;
  estado: 'Solicitado' | 'En proceso' | 'Completado';
}

interface Mensaje {
  id: number;
  de: string;
  asunto: string;      // título (ej: nombre del producto)
  fecha: string;
  leido: boolean;
  contenido?: string;  // detalle del mensaje
  producto?: string;   // nombre del producto
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

  // órdenes desde json-server
  ventas: Orden[] = [];

  // datos de ejemplo para retiros
  retiros: Retiro[] = [
    { id: 1, fecha: '2025-11-15', monto: 50000, estado: 'Completado' },
    { id: 2, fecha: '2025-11-22', monto: 30000, estado: 'Solicitado' },
  ];

  // mensajes que vienen desde json-server/messages
  mensajes: Mensaje[] = [];
  mensajeSeleccionado: Mensaje | null = null;

  reclamos: Reclamo[] = [
    { id: 1, comprador: 'comprador1', motivo: 'Producto dañado', fecha: '2025-11-18', estado: 'En revisión' },
  ];

  constructor(
    private sellerService: SellerDashboardService,
    private auth: AuthService,
    private chatService: ChatService,
  ) { }

  ngOnInit(): void {
    // Cargar órdenes (ventas)
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

    // Cargar mensajes del chat
    this.cargarMensajes();
  }

  // Cambiar estado de la orden
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

  // Cargar mensajes recibidos por el vendedor logueado
  private cargarMensajes(): void {
    const user = this.auth.user;
    if (!user) {
      console.warn('No hay usuario logueado, no se cargan mensajes');
      return;
    }

    const sellerId = user.id; // id del vendedor actual

    this.chatService.getMessagesForSeller(sellerId).subscribe({
      next: (msgs: ChatMessage[]) => {
        this.mensajes = msgs.map((m) => ({
          id: m.id ?? 0,
          de: `Comprador #${m.senderId}`,
          asunto: m.productName || 'Consulta',
          fecha: new Date(m.timestamp).toLocaleString('es-CL'),
          leido: false,
          contenido: m.content,
          producto: m.productName,
        }));

        console.log('Mensajes cargados', this.mensajes);
      },
      error: (err) => {
        console.error('Error cargando mensajes', err);
      },
    });
  }

  // Toggle de detalle: mismo botón abre/cierra
  verDetalle(m: Mensaje): void {
    if (this.mensajeSeleccionado && this.mensajeSeleccionado.id === m.id) {
      // si ya está seleccionado, lo deselecciono (cierro panel)
      this.mensajeSeleccionado = null;
    } else {
      // selecciono este mensaje y lo marco leído en la UI
      this.mensajeSeleccionado = m;
      m.leido = true;
    }
  }

  // Limpiar historial de ventas (demo)
  limpiarVentasDemo(): void {
    if (!this.ventas.length) {
      alert('No hay ventas para limpiar.');
      return;
    }

    const ok = confirm(
      'Esto borrará todas las ventas de prueba del sistema (json-server). ¿Seguro que quieres continuar?'
    );
    if (!ok) return;

    const ids = this.ventas
      .map(v => v.id)
      .filter((id): id is number => id !== null && id !== undefined);

    ids.forEach(id => {
      this.sellerService.borrarOrden(id).subscribe({
        error: (err) => console.error('Error borrando orden', id, err),
      });
    });

    this.ventas = [];
    this.resumen = {
      ventasHoy: 0,
      ventasMes: 0,
      totalComisiones: 0,
      saldoDisponible: 0,
    };

    alert('Historial de ventas de demo limpiado ✅');
  }

  // Descargar historial de ventas en PDF
  descargarHistorialPdf(): void {
    if (!this.ventas.length) {
      alert('No hay ventas para exportar.');
      return;
    }

    const doc = new jsPDF();

    // Título
    doc.setFontSize(16);
    doc.text('Historial de ventas - NekoMarket (demo)', 14, 20);

    // Fecha
    doc.setFontSize(10);
    doc.text(`Generado: ${new Date().toLocaleString('es-CL')}`, 14, 28);

    // Tabla
    const body = this.ventas.map((v, index) => [
      index + 1,
      v.producto,
      v.fecha,
      `CLP ${v.total.toLocaleString('es-CL')}`,
      v.estado,
    ]);

    autoTable(doc, {
      startY: 34,
      head: [['#', 'Producto', 'Fecha', 'Total', 'Estado']],
      body,
    });

    doc.save('nekomarket_ventas_demo.pdf');
  }
}
