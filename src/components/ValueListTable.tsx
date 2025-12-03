'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, getRarityColor } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus, ExternalLink } from 'lucide-react';
import { sampleFish, sampleRods } from '@/data/sample-data';

export function ValueListTable() {
  const [sortBy, setSortBy] = useState<'value' | 'rarity' | 'category'>('value');
  const [filter, setFilter] = useState<'all' | 'fish' | 'rod' | 'bait'>('all');

  // Combine all items
  const allItems = [
    ...sampleFish.map(f => ({ ...f, trend: 'stable' as const, lastUpdated: new Date() })),
    ...sampleRods.map(r => ({ ...r, trend: 'stable' as const, lastUpdated: new Date() }))
  ];

  // Filter items
  const filteredItems = allItems.filter(item =>
    filter === 'all' || item.category === filter
  );

  // Sort items
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'value') return (b.baseValue || 0) - (a.baseValue || 0);
    if (sortBy === 'rarity') {
      const rarityOrder = { common: 0, uncommon: 1, rare: 2, epic: 3, legendary: 4, mythic: 5, exotic: 6 };
      return rarityOrder[b.rarity as keyof typeof rarityOrder] - rarityOrder[a.rarity as keyof typeof rarityOrder];
    }
    return a.name.localeCompare(b.name);
  });

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-400" />;
      default:
        return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  const calculateMaxValue = (item: any) => {
    if (item.category === 'fish' && item.mutations) {
      const maxMultiplier = Math.max(...Object.values(item.mutations).filter((v): v is number => typeof v === 'number'));
      return (item.baseValue || 0) * maxMultiplier;
    }
    return item.baseValue || 0;
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            All Items
          </button>
          <button
            onClick={() => setFilter('fish')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'fish'
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            Fish
          </button>
          <button
            onClick={() => setFilter('rod')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'rod'
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            Rods
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setSortBy('value')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              sortBy === 'value'
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            Highest Value
          </button>
          <button
            onClick={() => setSortBy('rarity')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              sortBy === 'rarity'
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            Rarest
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-700">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Item Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Rarity
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-300">
                  Base Value
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-300">
                  Max Value
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-300">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {sortedItems.slice(0, 50).map((item) => (
                <tr key={item.id} className="hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <Link
                      href={`/${item.category}s/${item.id}`}
                      className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium"
                    >
                      {item.name}
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-300 capitalize">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium capitalize ${getRarityColor(item.rarity)}`}>
                      {item.rarity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-gray-300">
                    {formatCurrency(item.baseValue || 0)}
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-green-400">
                    {formatCurrency(calculateMaxValue(item))}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {getTrendIcon(item.trend)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Show more indicator */}
        {sortedItems.length > 50 && (
          <div className="p-4 text-center">
            <p className="text-gray-400 text-sm">
              Showing 50 of {sortedItems.length} items
            </p>
          </div>
        )}
      </div>
    </div>
  );
}