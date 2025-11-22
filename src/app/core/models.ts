export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl?: string;
  description?: string;
  vendor?: string;
  stock?: number;
  sellerId?: number;
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


export interface CartLine { product: Product; qty: number; }
export type Cart = CartLine[];
