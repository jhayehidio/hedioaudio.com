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
  lemonSqueezyUrl?: string;
  audioPreview?: string;
  youtubeId?: string;
  createdAt?: string;
  licenses?: License[];
  fullDetails?: {
    tagline: string;
    about: string;
    coreValue: string;
    features: { title: string; desc: string }[];
    specs: { format: string; fileSupport: string; workflow: string };
    steps: { title: string; desc: string }[];
  };
}

export const PRODUCTS: Product[] = productsData as Product[];
