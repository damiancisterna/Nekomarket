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


export interface CartLine { product: Product; qty: number; }
export type Cart = CartLine[];
