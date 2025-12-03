import { useState, useEffect, useCallback } from 'react';
import { dataService } from '@/lib/data-service';

interface RealTimeDataOptions {
  type: 'codes' | 'fish' | 'rods' | 'all';
  updateInterval?: number; // 更新间隔（毫秒）
  enableAutoUpdate?: boolean; // 是否启用自动更新
}

export function useRealTimeData<T = any>({
  type,
  updateInterval = 60000, // 默认1分钟
  enableAutoUpdate = true
}: RealTimeDataOptions) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      let result: T;

      switch (type) {
        case 'codes':
          result = (await dataService.getLatestCodes()) as T;
          break;
        case 'fish':
          result = (await dataService.getLatestFish()) as T;
          break;
        case 'rods':
          result = (await dataService.getLatestRods()) as T;
          break;
        case 'all':
          const [codes, fish, rods] = await Promise.all([
            dataService.getLatestCodes(),
            dataService.getLatestFish(),
            dataService.getLatestRods()
          ]);
          result = { codes, fish, rods } as T;
          break;
        default:
          throw new Error(`Invalid data type: ${type}`);
      }

      setData(result);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      console.error('Error fetching real-time data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [type]);

  // 手动刷新数据
  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  // 清除缓存
  const clearCache = useCallback(() => {
    dataService.clearCache();
  }, []);

  useEffect(() => {
    // 初始加载
    fetchData();

    // 设置自动更新
    if (enableAutoUpdate && updateInterval > 0) {
      const interval = setInterval(fetchData, updateInterval);
      return () => clearInterval(interval);
    }
  }, [fetchData, enableAutoUpdate, updateInterval]);

  return {
    data,
    isLoading,
    error,
    lastUpdated,
    refresh,
    clearCache
  };
}

// 价格监控Hook
export function usePriceMonitor(itemIds: string[], interval = 30000) {
  const [prices, setPrices] = useState<Map<string, number>>(new Map());
  const [priceHistory, setPriceHistory] = useState<Map<string, number[]>>(new Map());
  const [isLoading, setIsLoading] = useState(false);

  const updatePrices = useCallback(async () => {
    setIsLoading(true);
    try {
      const newPrices = await dataService.getRealTimePrices(itemIds);

      // 更新当前价格
      setPrices(newPrices);

      // 更新价格历史（保留最近10个记录）
      setPriceHistory(prev => {
        const newHistory = new Map(prev);
        itemIds.forEach(id => {
          const history = newHistory.get(id) || [];
          const price = newPrices.get(id);
          if (price !== undefined) {
            history.push(price);
            if (history.length > 10) {
              history.shift();
            }
            newHistory.set(id, history);
          }
        });
        return newHistory;
      });
    } catch (error) {
      console.error('Error updating prices:', error);
    } finally {
      setIsLoading(false);
    }
  }, [itemIds]);

  useEffect(() => {
    updatePrices();

    const intervalId = setInterval(updatePrices, interval);
    return () => clearInterval(intervalId);
  }, [updatePrices, interval]);

  const getPriceChange = useCallback((itemId: string): number => {
    const history = priceHistory.get(itemId);
    if (!history || history.length < 2) return 0;

    const oldPrice = history[0];
    const newPrice = history[history.length - 1];
    return ((newPrice - oldPrice) / oldPrice) * 100;
  }, [priceHistory]);

  return {
    prices,
    priceHistory,
    isLoading,
    updatePrices,
    getPriceChange
  };
}

// 代码验证Hook
export function useCodeValidator() {
  const [validatingCode, setValidatingCode] = useState<string | null>(null);

  const validateCode = useCallback(async (code: string): Promise<boolean> => {
    setValidatingCode(code);
    try {
      const codes = await dataService.getLatestCodes();
      const isValid = codes.some(c =>
        c.code.toLowerCase() === code.toLowerCase() &&
        c.status === 'active'
      );
      return isValid;
    } catch (error) {
      console.error('Error validating code:', error);
      return false;
    } finally {
      setValidatingCode(null);
    }
  }, []);

  return {
    validateCode,
    validatingCode
  };
}