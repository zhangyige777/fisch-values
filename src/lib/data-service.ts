import { sampleFish, sampleRods, sampleBait, sampleLocations, workingCodes } from '@/data/sample-data';

// 数据更新服务
export class DataService {
  private static instance: DataService;
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  private constructor() {}

  static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  // 缓存数据
  private setCache(key: string, data: any, ttl: number = 300000): void { // 默认5分钟
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  // 获取缓存数据
  private getCache(key: string): any | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    if (Date.now() - cached.timestamp > cached.ttl) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  // 从API获取最新代码
  async getLatestCodes(): Promise<any[]> {
    const cacheKey = 'latest_codes';
    const cached = this.getCache(cacheKey);

    if (cached) {
      return cached;
    }

    try {
      const response = await fetch('/api/data?type=codes');
      if (!response.ok) {
        throw new Error('Failed to fetch codes');
      }

      const result = await response.json();
      const codes = result.data || workingCodes;

      // 合并新数据和本地数据
      const mergedCodes = this.mergeData(workingCodes, codes, 'code');
      this.setCache(cacheKey, mergedCodes);

      return mergedCodes;
    } catch (error) {
      console.error('Error fetching latest codes:', error);
      return workingCodes;
    }
  }

  // 从API获取最新鱼数据
  async getLatestFish(): Promise<any[]> {
    const cacheKey = 'latest_fish';
    const cached = this.getCache(cacheKey);

    if (cached) {
      return cached;
    }

    try {
      const response = await fetch('/api/data?type=fish');
      if (!response.ok) {
        throw new Error('Failed to fetch fish data');
      }

      const result = await response.json();
      const fish = result.data || sampleFish;

      const mergedFish = this.mergeData(sampleFish, fish, 'id');
      this.setCache(cacheKey, mergedFish);

      return mergedFish;
    } catch (error) {
      console.error('Error fetching latest fish data:', error);
      return sampleFish;
    }
  }

  // 从API获取最新鱼竿数据
  async getLatestRods(): Promise<any[]> {
    const cacheKey = 'latest_rods';
    const cached = this.getCache(cacheKey);

    if (cached) {
      return cached;
    }

    try {
      const response = await fetch('/api/data?type=rods');
      if (!response.ok) {
        throw new Error('Failed to fetch rods data');
      }

      const result = await response.json();
      const rods = result.data || sampleRods;

      const mergedRods = this.mergeData(sampleRods, rods, 'id');
      this.setCache(cacheKey, mergedRods);

      return mergedRods;
    } catch (error) {
      console.error('Error fetching latest rods data:', error);
      return sampleRods;
    }
  }

  // 智能合并数据
  private mergeData(localData: any[], remoteData: any[], key: string): any[] {
    const merged = [...localData];
    const existingKeys = new Set(localData.map(item => item[key]));

    remoteData.forEach(remoteItem => {
      if (!existingKeys.has(remoteItem[key])) {
        merged.push(remoteItem);
      } else {
        // 更新现有数据
        const index = merged.findIndex(item => item[key] === remoteItem[key]);
        if (index !== -1) {
          merged[index] = { ...merged[index], ...remoteItem };
        }
      }
    });

    return merged;
  }

  // 获取实时价格数据
  async getRealTimePrices(fishIds: string[]): Promise<Map<string, number>> {
    const prices = new Map<string, number>();

    // 模拟实时价格计算（基于市场供需）
    fishIds.forEach(id => {
      const fish = sampleFish.find(f => f.id === id);
      if (fish) {
        // 添加随机波动
        const variation = 0.9 + Math.random() * 0.2; // -10% 到 +10%
        const realTimePrice = Math.round(fish.baseValue * variation);
        prices.set(id, realTimePrice);
      }
    });

    return prices;
  }

  // 清除所有缓存
  clearCache(): void {
    this.cache.clear();
  }

  // 获取缓存统计
  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

// 导出单例实例
export const dataService = DataService.getInstance();