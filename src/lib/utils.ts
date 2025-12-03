import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format currency for Fisch (C$)
export function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `C$${(value / 1000000).toFixed(1)}M`
  }
  if (value >= 1000) {
    return `C$${(value / 1000).toFixed(0)}K`
  }
  return `C$${value.toLocaleString()}`
}

// Calculate maximum possible value of an item
export function calculateMaxValue(baseValue: number, mutations: Record<string, number>): number {
  // Find the highest mutation multiplier
  const highestMultiplier = Math.max(...Object.values(mutations));

  // Apply legendary rod passive (up to 8x for Ethereal Prism Rod)
  const maxRodMultiplier = 8;

  return baseValue * highestMultiplier * maxRodMultiplier;
}

// Format rarity with color
export function getRarityColor(rarity: string): string {
  const colors = {
    common: 'text-gray-400',
    uncommon: 'text-green-400',
    rare: 'text-blue-400',
    epic: 'text-purple-400',
    legendary: 'text-orange-400',
    mythic: 'text-red-400',
    exotic: 'text-yellow-400',
  };
  return colors[rarity as keyof typeof colors] || 'text-gray-400';
}

// Format date
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}