// Sample data for Fisch Values Calculator
// This will be replaced with real game data

import { Fish, Rod, Bait, Location } from '@/types/game';

export const sampleFish: Fish[] = [
  {
    id: 'inferno-hide',
    name: 'Inferno Hide',
    category: 'fish',
    rarity: 'mythic',
    baseValue: 8500,
    fishStats: {
      minWeight: 80,
      maxWeight: 200,
      preferredBait: ['truffle-worm', 'squid'],
      locations: ['volcanic-vents'],
      weather: ['clear', 'fog'],
      season: ['summer'],
      time: 'both'
    },
    mutations: {
      shiny: 1.85,
      albino: 1.1,
      sparkling: 1.85,
      colossal: 2.0,
      mythic: 4.5,
      mythical: 4.5,
      heavenly: 6.0
    },
    description: 'A rare fish found only in volcanic regions, known for its heat-resistant scales.',
    tips: [
      'Use Truffle Worm bait for best results',
      'Best caught during clear weather',
      'Can be found in Volcanic Vents at any time'
    ]
  },
  {
    id: 'trident-fish',
    name: 'Trident Fish',
    category: 'fish',
    rarity: 'legendary',
    baseValue: 3200,
    fishStats: {
      minWeight: 50,
      maxWeight: 150,
      preferredBait: ['fish-head', 'squid'],
      locations: ['atlantis', 'deep-sea'],
      weather: ['clear', 'aurora'],
      season: ['winter'],
      time: 'day'
    },
    mutations: {
      shiny: 1.85,
      albino: 1.1,
      sparkling: 1.85,
      colossal: 2.0,
      mythic: 4.5,
      mythical: 4.5,
      heavenly: 6.0
    },
    description: 'A majestic fish resembling Poseidon\'s trident, found only in the deepest waters.',
    tips: [
      'Only spawns in Atlantis and Deep Sea areas',
      'Best caught during daytime with clear weather',
      'Fish Head bait increases spawn rate'
    ]
  },
  {
    id: 'megalodon',
    name: 'Megalodon',
    category: 'fish',
    rarity: 'mythic',
    baseValue: 12500,
    fishStats: {
      minWeight: 500,
      maxWeight: 2000,
      preferredBait: ['truffle-worm', 'whale-bait'],
      locations: ['open-ocean', 'deep-sea'],
      weather: ['fog', 'storm'],
      season: ['autumn'],
      time: 'night'
    },
    mutations: {
      shiny: 1.85,
      albino: 1.1,
      sparkling: 1.85,
      colossal: 2.0,
      mythic: 4.5,
      mythical: 4.5,
      heavenly: 6.0
    },
    description: 'The legendary prehistoric shark, extremely rare and dangerous to catch.',
    tips: [
      'Requires a rod with at least 2000kg max capacity',
      'Best caught during foggy nights',
      'Truffle Worm bait is essential'
    ]
  }
];

export const sampleRods: Rod[] = [
  {
    id: 'trident-rod',
    name: 'Trident Rod',
    category: 'rod',
    rarity: 'legendary',
    baseValue: 45000,
    rodStats: {
      maxKg: 5000,
      lureSpeed: 20,
      luck: 100,
      control: 80,
      resilience: 90
    },
    passiveAbility: {
      name: 'Atlantean',
      description: '35% chance to stun fish for 3 seconds',
      multiplier: 3.0
    },
    requirements: {
      level: 50,
      quest: 'Poseidon\'s Challenge',
      cost: 45000
    },
    description: 'A legendary rod bestowed by Poseidon himself, perfect for catching deep sea treasures.',
    bestUseCase: 'Deep sea fishing, legendary fish'
  },
  {
    id: 'heaven-rod',
    name: 'Heaven\'s Rod',
    category: 'rod',
    rarity: 'mythic',
    baseValue: 85000,
    rodStats: {
      maxKg: 3000,
      lureSpeed: 30,
      luck: 225,
      control: 70,
      resilience: 60
    },
    passiveAbility: {
      name: 'Heavenly',
      description: '35% chance to grant 6x value multiplier',
      multiplier: 6.0
    },
    requirements: {
      level: 100,
      quest: 'Ascension Trial'
    },
    description: 'A divine rod that brings heavenly luck to those who wield it.',
    bestUseCase: 'Maximizing fish value and mutations'
  },
  {
    id: 'aurora-rod',
    name: 'Aurora Rod',
    category: 'rod',
    rarity: 'legendary',
    baseValue: 65000,
    rodStats: {
      maxKg: 3500,
      lureSpeed: 40,
      luck: 150,
      control: 85,
      resilience: 75
    },
    passiveAbility: {
      name: 'Aurora',
      description: 'Grants massive bonuses during aurora weather',
      multiplier: 10.0
    },
    requirements: {
      level: 75,
      quest: 'Northern Lights Mystery'
    },
    description: 'Harnesses the power of the aurora borealis to catch rare fish.',
    bestUseCase: 'Fishing during aurora weather events'
  }
];

export const sampleBait: Bait[] = [
  {
    id: 'truffle-worm',
    name: 'Truffle Worm',
    category: 'bait',
    rarity: 'exotic',
    baseValue: 1200,
    effect: {
      preferredLuck: 300,
      specialEffect: 'Attracts boss-level fish'
    },
    bestFor: ['megalodon', 'kraken', 'colossal-squid'],
    source: 'Volcanic Geodes, Coral Geodes',
    description: 'The ultimate bait for catching the rarest and largest fish.'
  },
  {
    id: 'fish-head',
    name: 'Fish Head',
    category: 'bait',
    rarity: 'uncommon',
    baseValue: 150,
    effect: {
      preferredLuck: 50,
      specialEffect: 'Attracts predatory fish'
    },
    bestFor: ['shark', 'barracuda', 'pike'],
    source: 'Common drops from most fish',
    description: 'A basic but effective bait for predatory fish species.'
  }
];

export const sampleLocations: Location[] = [
  {
    id: 'volcanic-vents',
    name: 'Volcanic Vents',
    category: 'location',
    description: 'Dangerous volcanic waters where only heat-resistant fish can survive.',
    fishAvailable: ['inferno-hide', 'magma-tuna', 'lava-eel'],
    weatherEffects: {
      clear: ['inferno-hide'],
      fog: ['lava-eel']
    },
    requirements: {
      level: 30,
      item: 'heat-resistant-gear'
    },
    tips: [
      'Bring heat-resistant gear or take damage',
      'Best during clear weather',
      'High-value fish spawn frequently'
    ]
  },
  {
    id: 'atlantis',
    name: 'Atlantis',
    category: 'location',
    description: 'The legendary underwater city filled with ancient treasures and rare fish.',
    fishAvailable: ['trident-fish', 'atlantean-swordfish', 'ancient-guardian'],
    weatherEffects: {
      clear: ['trident-fish', 'ancient-guardian'],
      aurora: ['all-fish-double-rate']
    },
    requirements: {
      level: 60,
      quest: 'Unlock Atlantis',
      item: 'diving-gear'
    },
    tips: [
      'Requires diving gear to access',
      'Best fishing during aurora weather',
      'Ancient Guardian is very rare but valuable'
    ]
  }
];

// Working codes for Fisch (to be updated regularly)
export const workingCodes = [
  {
    code: 'FISHMAS2024',
    reward: '5000 C$ + Christmas Rod',
    status: 'active',
    expires: '2024-12-31'
  },
  {
    code: 'AURORA2024',
    reward: '3000 C$ + Aurora Bait x5',
    status: 'active',
    expires: '2024-12-30'
  },
  {
    code: 'TRIDENTPOWER',
    reward: 'Trident Rod',
    status: 'active',
    expires: '2024-12-29'
  },
  {
    code: 'SUMMER2024',
    reward: '2000 C$',
    status: 'expired',
    expires: '2024-11-30'
  }
];