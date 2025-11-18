export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  stock?: number;
}

export interface CartLine { product: Product; qty: number; }
export type Cart = CartLine[];
