export type FlavorStatus = 'SOLD_OUT' | 'LIVE' | 'UPCOMING' | 'LOCKED';

export interface Flavor {
  id: string;
  name: string;
  description: string;
  image: string; // Path to asset
  status: FlavorStatus;
  dropDate: string; // ISO date or display string
  soldOutTime?: string; // e.g., "42 minutes"
  colors: {
    primary: string; // e.g., for text
    secondary: string; // e.g., for borders
    background: string; // e.g., for gradients
  };
  stats: {
    crunch: number;
    sweetness: string;
    rarity: string;
  };
  price: number;
}

export const FLAVORS: Flavor[] = [
  {
    id: 'nebula-neapolitan',
    name: 'Nebula Neapolitan',
    description: 'Three distinct flavors of the cosmos: Strawberry Supernova, Vanilla Void, and Chocolate Comet.',
    image: '/assets/product-neapolitan-hero.png',  
    status: 'SOLD_OUT',
    dropDate: '2025-11-28',
    soldOutTime: '4m 20s',
    colors: {
      primary: 'text-pink-400',
      secondary: 'border-pink-600',
      background: 'from-pink-900 to-black',
    },
    stats: {
      crunch: 60,
      sweetness: 'MAX',
      rarity: 'LEGENDARY',
    },
    price: 20,
  },
  {
    id: 'galactic-green-tea',
    name: 'Galactic Green Tea',
    description: 'A cosmic blend of matcha and stardust, with mocha mochi chunks.',
    image: '/assets/product-greentea-hero.png',
    status: 'LIVE',
    dropDate: '2025-12-05',
    colors: {
      primary: 'text-green-400',
      secondary: 'border-green-600',
      background: 'from-green-900 to-black',
    },
    stats: {
      crunch: 85,
      sweetness: 'SUBTLE',
      rarity: 'MYTHIC',
    },
    price: 20,
  },
  {
    id: 'dark-matter-dark-chocolate',
    name: 'Dark Matter Chocolate',
    description: 'Absorbs all light. 99% Cacao. Infinite density.',
    image: '/assets/product-darkchocolate-hero.png',
    status: 'UPCOMING',
    dropDate: '2025-12-12',
    colors: {
      primary: 'text-purple-400',
      secondary: 'border-purple-600',
      background: 'from-purple-900 to-black',
    },
    stats: {
      crunch: 99,
      sweetness: 'VOID',
      rarity: 'ANOMALY',
    },
    price: 25,
  }
];

export const CURRENT_FLAVOR_ID = 'galactic-green-tea';

export const getCurrentFlavor = (): Flavor => {
  return FLAVORS.find(f => f.status === 'LIVE') || FLAVORS[0];
};

export const getPastFlavors = (): Flavor[] => {
  return FLAVORS.filter(f => f.status === 'SOLD_OUT');
};

export const getUpcomingFlavors = (): Flavor[] => {
  return FLAVORS.filter(f => f.status === 'UPCOMING' || f.status === 'LOCKED');
};

export const getFlavorById = (id: string): Flavor | undefined => {
  return FLAVORS.find(f => f.id === id);
};