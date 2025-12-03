// Fisch Game Data Types

export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic' | 'exotic';
export type Category = 'fish' | 'rod' | 'bait' | 'item' | 'location';

export interface Fish {
  id: string;
  name: string;
  category: 'fish';
  rarity: Rarity;
  baseValue: number;
  fishStats: {
    minWeight: number;
    maxWeight: number;
    preferredBait?: string[];
    locations: string[];
    weather?: string[];
    season?: string[];
    time?: 'day' | 'night' | 'both';
  };
  mutations: {
    shiny: number;      // 1.85x
    albino: number;     // 1.1x
    sparkling: number;  // 1.85x
    colossal: number;   // 2.0x
    mythic: number;     // 4.5x
    mythical: number;   // 4.5x
    heavenly: number;   // 6.0x
    [key: string]: number;
  };
  description: string;
  tips?: string[];
}

export interface Rod {
  id: string;
  name: string;
  category: 'rod';
  rarity: Rarity;
  baseValue?: number;
  rodStats: {
    maxKg: number;
    lureSpeed: number;  // percentage
    luck: number;       // percentage
    control: number;
    resilience: number;
  };
  passiveAbility?: {
    name: string;
    description: string;
    multiplier?: number;
  };
  requirements?: {
    level?: number;
    quest?: string;
    cost?: number;
  };
  description: string;
  bestUseCase?: string;
}

export interface Bait {
  id: string;
  name: string;
  category: 'bait';
  rarity: Rarity;
  baseValue: number;
  effect: {
    preferredLuck: number;
    speedModifier?: number;
    specialEffect?: string;
  };
  bestFor: string[];
  source: string;
  description: string;
}

export interface Location {
  id: string;
  name: string;
  category: 'location';
  description: string;
  fishAvailable: string[];
  weatherEffects?: {
    rain?: string[];
    fog?: string[];
    clear?: string[];
    aurora?: string[];
  };
  requirements?: {
    level?: number;
    item?: string;
    quest?: string;
    cost?: number;
  };
  tips?: string[];
}

export interface Enchant {
  id: string;
  name: string;
  rarity: Rarity;
  effect: string;
  multiplier?: number;
  description: string;
  applicableTo: 'rod' | 'all';
}

export type GameItem = Fish | Rod | Bait | Location;

// Calculator Types
export interface CalculatorInput {
  rodId: string;
  locationId: string;
  weather?: string;
  timeOfDay?: 'day' | 'night';
  baitId?: string;
}

export interface CalculatorResult {
  hourlyProfit: number;
  profitPerCast: number;
  castsPerHour: number;
  successRate: number;
  lineSnapRisk: number;
  bestFish: {
    name: string;
    value: number;
    catchRate: number;
  };
  tips: string[];
}

// Value List Types
export interface ValueListItem {
  id: string;
  name: string;
  category: Category;
  rarity: Rarity;
  baseValue: number;
  maxValue: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}