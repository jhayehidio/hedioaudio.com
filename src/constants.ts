export interface License {
  name: string;
  price: number;
  description: string;
  features: string;
  checkoutUrl: string;
}

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
  licenses?: License[];
  youtubeId?: string;
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
    polarCheckoutUrl: 'https://buy.polar.sh/polar_cl_qj9c2FVNuMyevw9RQPwr5Uvou2VrAQtsiHowf1MsrDW'
  },
  {
    id: 'glow',
    name: 'Glow',
    type: 'beat',
    price: 25,
    description: 'Synth Pop Type Beat, Taylor Swift Type Beat.',
    image: '/images/HB00001 Glow.png',
    category: 'Synth Pop',
    youtubeId: '_whI41Rk9v4',
    polarCheckoutUrl: 'https://buy.polar.sh/polar_cl_qj9c2FVNuMyevw9RQPwr5Uvou2VrAQtsiHowf1MsrDW',
    licenses: [
      {
        name: 'Basic License',
        price: 25,
        features: 'MP3 File Only',
        description: 'Perfect for indie artists starting out. Includes full rights for up to 100,000 streams and 10,000 sales/downloads, plus unlimited live performances.',
        checkoutUrl: ''
      },
      {
        name: 'Premium License',
        price: 50,
        features: 'WAV + MP3 Files',
        description: 'High-quality audio and flexible usage. Includes rights for up to 500,000 streams, 50,000 sales/downloads, and unlimited performances.',
        checkoutUrl: ''
      },
      {
        name: 'Premium Plus License',
        price: 100,
        features: 'WAV + MP3 + STEMS',
        description: 'Full production flexibility with stems for mixing and arrangement. Includes up to 1,000,000 streams, 100,000 sales/downloads, and unlimited performances.',
        checkoutUrl: ''
      },
      {
        name: 'Unlimited License',
        price: 150,
        features: 'WAV + MP3 + STEMS',
        description: 'Total freedom. Unlimited streams, sales, and performances worldwide. Keep your creative control forever.',
        checkoutUrl: ''
      },
      {
        name: 'Free Download',
        price: 0,
        features: 'Non-Commercial Use Only',
        description: 'For writing, practice, and demo recording. Not for streaming, release, or monetization. Upgrade to a paid license for full rights.',
        checkoutUrl: ''
      }
    ]
  }
];
