import productsData from './data/products.json';

export interface License {
  name: string;
  price: number;
  description: string;
  features: string;
  checkoutUrl?: string; // Optional, defaults to product polarCheckoutUrl
}

export interface Product {
  id: string;
  name: string;
  type: 'plugin' | 'beat';
  description: string;
  price: number;
  image: string;
  category?: string;
  free?: boolean;
  polarCheckoutUrl?: string;
  audioPreview?: string;
  youtubeId?: string;
  licenses?: License[];
}

export const PRODUCTS: Product[] = productsData as Product[];
