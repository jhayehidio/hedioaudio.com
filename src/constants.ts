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
    id: '1',
    name: 'SMART EQ ASSIST',
    type: 'plugin',
    price: 49,
    description: 'AI-driven frequency balancer that identifies and fixes masking issues in seconds.',
    image: 'https://picsum.photos/seed/eq/800/800',
    category: 'Plugin'
  },
  {
    id: '2',
    name: 'AUTO-GAIN STAGER',
    type: 'plugin',
    price: 29,
    description: 'Maintain perfect headroom across your entire mix with one click.',
    image: 'https://picsum.photos/seed/gain/800/800',
    category: 'Workflow',
    free: true
  },
  {
    id: '3',
    name: 'MIDNIGHT PIANO',
    type: 'beat',
    price: 25,
    description: 'Emotional piano ballad with cinematic strings and soft pop percussion.',
    image: 'https://picsum.photos/seed/piano/800/800',
    audioPreview: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: '4',
    name: 'SUNSET POP',
    type: 'beat',
    price: 30,
    description: 'Radio-ready pop instrumental featuring bright keys and a driving rhythm.',
    image: 'https://picsum.photos/seed/pop/800/800',
    audioPreview: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    id: '5',
    name: 'SMART DE-ESSER',
    type: 'plugin',
    price: 39,
    description: 'Intelligent sibilance control that preserves vocal character while removing harshness.',
    image: 'https://picsum.photos/seed/deesser/800/800',
    category: 'Plugin'
  },
  {
    id: '6',
    name: 'STARDUST BALLAD',
    type: 'beat',
    price: 20,
    description: 'A soulful piano-led ballad perfect for emotional storytelling.',
    image: 'https://picsum.photos/seed/ballad/800/800',
    audioPreview: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  }
];
