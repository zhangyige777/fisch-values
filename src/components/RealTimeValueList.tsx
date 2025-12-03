'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatCurrency, getRarityColor } from '@/lib/utils';
import { dataService } from '@/lib/data-service';
import { Search, Filter, TrendingUp, TrendingDown, Minus, RefreshCw } from 'lucide-react';

interface Item {
  id: string;
  name: string;
  category: 'fish' | 'rod' | 'bait';
  baseValue: number;
  rarity: string;
  currentPrice?: number;
  priceChange?: number;
  mutations?: Record<string, number>;
  description?: string;
}

export function RealTimeValueList() {
  const [items, setItems] = useState<Item[]>([]);
  const [filter, setFilter] = useState<'all' | 'fish' | 'rod' | 'bait'>('all');
  const [sortBy, setSortBy] = useState<'value' | 'name' | 'rarity'>('value');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    loadRealTimeData();

    // 设置定期更新
    const interval = setInterval(loadRealTimeData, 60000); // 每分钟更新一次

    return () => clearInterval(interval);
  }, []);

  const loadRealTimeData = async () => {
    setIsLoading(true);
    try {
      // 并行加载所有数据
      const [latestFish, latestRods] = await Promise.all([
        dataService.getLatestFish(),
        dataService.getLatestRods()
      ]);

      // 获取实时价格
      const allItems = [...latestFish, ...latestRods];
      const itemIds = allItems.map(item => item.id);
      const realTimePrices = await dataService.getRealTimePrices(itemIds);

      // 合并数据和价格
      const mergedItems: Item[] = allItems.map(item => ({
        ...item,
        category: latestFish.some(f => f.id === item.id) ? 'fish' : 'rod',
        currentPrice: realTimePrices.get(item.id) || item.baseValue,
        priceChange: item.baseValue ?
          ((realTimePrices.get(item.id) || item.baseValue) - item.baseValue) / item.baseValue * 100 : 0
      }));

      setItems(mergedItems);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error loading real-time data:', error);
    }
    setIsLoading(false);
  };

  const filteredItems = items
    .filter(item => filter === 'all' || item.category === filter)
    .filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.rarity.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'value':
          return (b.currentPrice || 0) - (a.currentPrice || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rarity':
          const rarityOrder = { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5, mythic: 6 };
          return (rarityOrder[b.rarity as keyof typeof rarityOrder] || 0) -
                 (rarityOrder[a.rarity as keyof typeof rarityOrder] || 0);
        default:
          return 0;
      }
    });

  const getPriceChangeIcon = (change: number) => {
    if (Math.abs(change) < 0.01) return <Minus className="h-4 w-4 text-gray-400" />;
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-400" />;
    return <TrendingDown className="h-4 w-4 text-red-400" />;
  };

  const calculateMaxValue = (item: any) => {
    if (item.category === 'fish' && item.mutations) {
      const maxMultiplier = Math.max(...Object.values(item.mutations).filter((v): v is number => typeof v === 'number'));
      return (item.currentPrice || item.baseValue || 0) * maxMultiplier;
    }
    return item.currentPrice || item.baseValue || 0;
  };

  return (
    <div className="space-y-6">
      {/* 更新信息 */}
      <div className="flex items-center justify-between bg-slate-800/50 rounded-lg p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-400' : 'bg-green-400'} animate-pulse`}></div>
            <span className="text-sm text-gray-300">
              {isLoading ? 'Updating...' : 'Live Data'}
            </span>
          </div>
          <span className="text-sm text-gray-400">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
        </div>
        <button
          onClick={loadRealTimeData}
          className="flex items-center gap-2 px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* 搜索和过滤器 */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[300px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search fish, rods, items..."
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

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
            By Value
          </button>
          <button
            onClick={() => setSortBy('name')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              sortBy === 'name'
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            By Name
          </button>
          <button
            onClick={() => setSortBy('rarity')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              sortBy === 'rarity'
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            By Rarity
          </button>
        </div>
      </div>

      {/* 数值列表 */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-900/50">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Item</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Rarity</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-300">Base Value</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-300">Current Price</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-300">24h Change</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-300">Max Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <Link
                      href={`/${item.category}/${item.id}`}
                      className="hover:text-cyan-400 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">
                          {item.category === 'fish' ? '🐟' : item.category === 'rod' ? '🎣' : '🪱'}
                        </span>
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-gray-400 capitalize">{item.category}</div>
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getRarityColor(item.rarity)}`}>
                      {item.rarity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono">
                    {formatCurrency(item.baseValue)}
                  </td>
                  <td className="px-6 py-4 text-right font-mono">
                    <div className="font-medium text-cyan-400">
                      {formatCurrency(item.currentPrice || item.baseValue)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-1">
                      {getPriceChangeIcon(item.priceChange || 0)}
                      <span className={`text-sm font-medium ${
                        (item.priceChange || 0) > 0 ? 'text-green-400' :
                        (item.priceChange || 0) < 0 ? 'text-red-400' : 'text-gray-400'
                      }`}>
                        {item.priceChange ? `${item.priceChange.toFixed(1)}%` : '0.0%'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-purple-400">
                    {formatCurrency(calculateMaxValue(item))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredItems.length === 0 && (
          <div className="px-6 py-12 text-center text-gray-400">
            No items found matching your criteria.
          </div>
        )}
      </div>

      {/* 统计信息 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-cyan-400">{filteredItems.length}</div>
          <div className="text-sm text-gray-400">Total Items</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400">
            {filteredItems.filter(i => (i.priceChange || 0) > 0).length}
          </div>
          <div className="text-sm text-gray-400">Gaining</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-400">
            {filteredItems.filter(i => (i.priceChange || 0) < 0).length}
          </div>
          <div className="text-sm text-gray-400">Dropping</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">
            {filteredItems.filter(i => i.rarity === 'legendary' || i.rarity === 'mythic').length}
          </div>
          <div className="text-sm text-gray-400">Legendary+</div>
        </div>
      </div>
    </div>
  );
}