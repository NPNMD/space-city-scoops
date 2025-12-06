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
    id: 'comet-cookies-cream',
    name: 'Comet Cookies & Cream',
    description: 'Chunks of dark matter cookies floating in a milky way cream.',
    image: '/assets/product-cookies-hero.png',
    status: 'SOLD_OUT',
    dropDate: '2025-10-24',
    soldOutTime: '1h 12m',
    colors: {
      primary: 'text-blue-400',
      secondary: 'border-blue-600',
      background: 'from-blue-900 to-black',
    },
    stats: {
      crunch: 75,
      sweetness: 'HIGH',
      rarity: 'COMMON',
    },
    price: 18,
  },
  {
    id: 'galactic-graham-slam',
    name: 'Galactic Graham Slam',
    description: 'Honey graham cracker meteors crashing into marshmallow nebulae.',
    image: '/assets/product-graham-hero.png',
    status: 'SOLD_OUT',
    dropDate: '2025-11-07',
    soldOutTime: '3h 45m',
    colors: {
      primary: 'text-yellow-400',
      secondary: 'border-yellow-600',
      background: 'from-yellow-900 to-black',
    },
    stats: {
      crunch: 90,
      sweetness: 'HIGH',
      rarity: 'RARE',
    },
    price: 22,
  },
  {
    id: 'nebula-neapolitan',
    name: 'Nebula Neapolitan',
    description: 'Three distinct flavors of the cosmos: Strawberry Supernova, Vanilla Void, and Chocolate Comet.',
    image: '/assets/product-neapolitan-hero.png',
    status: 'SOLD_OUT',
    dropDate: '2025-11-21',
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
    dropDate: '2025-12-19',
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
  },
  {
    id: 'praline-planet',
    name: 'Praline Planet',
    description: 'Caramelized pecan moons orbiting a creamy vanilla core.',
    image: '/assets/product-praline-hero.png',
    status: 'UPCOMING',
    dropDate: '2026-01-02',
    colors: {
      primary: 'text-orange-400',
      secondary: 'border-orange-600',
      background: 'from-orange-900 to-black',
    },
    stats: {
      crunch: 70,
      sweetness: 'MAX',
      rarity: 'LEGENDARY',
    },
    price: 24,
  },
  {
    id: 'strawberry-supernova',
    name: 'Strawberry Supernova',
    description: 'Explosive strawberry clusters in a pink dwarf star field.',
    image: '/assets/product-strawberry-hero.png',
    status: 'UPCOMING',
    dropDate: '2026-01-16',
    colors: {
      primary: 'text-red-400',
      secondary: 'border-red-600',
      background: 'from-red-900 to-black',
    },
    stats: {
      crunch: 40,
      sweetness: 'MED',
      rarity: 'COMMON',
    },
    price: 18,
  },
  {
    id: 'meteor-mint-chip',
    name: 'Meteor Mint Chip',
    description: 'Frozen mint atmosphere bombarded by chocolate meteorites.',
    image: '/assets/product-mint-hero.png',
    status: 'UPCOMING',
    dropDate: '2026-01-30',
    colors: {
      primary: 'text-teal-400',
      secondary: 'border-teal-600',
      background: 'from-teal-900 to-black',
    },
    stats: {
      crunch: 65,
      sweetness: 'SUBTLE',
      rarity: 'RARE',
    },
    price: 20,
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