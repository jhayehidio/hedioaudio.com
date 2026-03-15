export interface Product {
  id: string;
  name: string;
  type: 'plugin' | 'beat';
  price: number;
  description: string;
  image: string;
  category?: string;
  audioPreview?: string;
  free?: boolean;
  polarCheckoutUrl?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'noisy-player',
    name: 'NoisyPlayer',
    type: 'plugin',
    price: 0,
    free: true,
    description: 'Turns reference tracks into shaped white noise for instant, surgical EQ matching without the wait.',
    image: '/images/NoisyPlayer.png',
    category: 'Surgical EQ',
    polarCheckoutUrl: ''
  },
  {
    id: 'beat-placeholder',
    name: 'Coming Soon',
    type: 'beat',
    price: 25,
    description: 'A premium beat currently in production. Check back soon for details.',
    image: 'https://picsum.photos/seed/beat/800/800',
    category: 'Hip Hop',
    polarCheckoutUrl: ''
  }
];
