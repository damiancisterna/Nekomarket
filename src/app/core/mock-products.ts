// src/app/core/mock-products.ts
import { Product } from './models';

export const PRODUCTS: Product[] = [
  {
    id: 'wig-nezuko',
    name: 'Peluca Nezuko',
    category: 'Ofertas',
    price: 12990,
    imageUrl: 'assets/nezuko.webp',
    stock: 18,
  },
  {
    id: 'maid-dress',
    name: 'Traje Maid clásico',
    category: 'Ofertas',
    price: 34990,
    imageUrl: 'assets/traje_maid.webp',
    stock: 9,
  },
  {
    id: 'akatsuki',
    name: 'Capa Akatsuki',
    category: 'Ofertas',
    price: 29990,
    imageUrl: 'assets/capa_akazuki.webp',
    stock: 12,
  },
  {
    id: 'prop-kunai',
    name: 'Set Kunai (3u)',
    category: 'Ofertas',
    price: 8990,
    imageUrl: 'assets/kunai.jpg',
    stock: 25,
  },
  {
    id: 'lens-red',
    name: 'Lentes rojos',
    category: 'Ofertas',
    price: 9990,
    imageUrl: 'assets/lentes_rojos.jpg',
    stock: 30,
  },
  {
    id: 'cloak-hood',
    name: 'Túnica negra',
    category: 'Ofertas',
    price: 25990,
    imageUrl: 'assets/tunica_negra.webp',
    stock: 10,
  },
];
