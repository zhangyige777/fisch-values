// 后台数据同步服务
import { dataService } from './data-service';

class BackgroundSyncService {
  private static instance: BackgroundSyncService;
  private syncInterval: NodeJS.Timeout | null = null;
  private isOnline = typeof window !== 'undefined' ? navigator.onLine : true;

  private constructor() {
    // 监听网络状态变化
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        this.isOnline = true;
        this.sync();
      });
      window.addEventListener('offline', () => {
        this.isOnline = false;
      });
    }
  }

  static getInstance(): BackgroundSyncService {
    if (!BackgroundSyncService.instance) {
      BackgroundSyncService.instance = new BackgroundSyncService();
    }
    return BackgroundSyncService.instance;
  }

  // 启动自动同步
  start(intervalMinutes: number = 5): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
    }

    const intervalMs = intervalMinutes * 60 * 1000;

    // 立即执行一次同步
    this.sync();

    // 设置定期同步
    this.syncInterval = setInterval(() => {
      this.sync();
    }, intervalMs);

    console.log(`Background sync started with ${intervalMinutes} minute intervals`);
  }

  // 停止自动同步
  stop(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
      console.log('Background sync stopped');
    }
  }

  // 执行同步
  async sync(): Promise<void> {
    if (!this.isOnline) {
      console.log('Device offline, skipping sync');
      return;
    }

    try {
      console.log('Starting background data sync...');

      // 并行同步所有数据
      const syncPromises = [
        this.syncWithRetry('codes', () => dataService.getLatestCodes()),
        this.syncWithRetry('fish', () => dataService.getLatestFish()),
        this.syncWithRetry('rods', () => dataService.getLatestRods())
      ];

      const results = await Promise.allSettled(syncPromises);

      // 记录同步结果
      results.forEach((result, index) => {
        const type = ['codes', 'fish', 'rods'][index];
        if (result.status === 'fulfilled') {
          console.log(`✅ ${type} synced successfully`);
        } else {
          console.error(`❌ ${type} sync failed:`, result.reason);
        }
      });

      // 保存最后同步时间
      this.setLastSyncTime();

      // 触发自定义事件通知前端
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('dataSynced', {
          detail: { timestamp: Date.now(), results }
        }));
      }
    } catch (error) {
      console.error('Background sync failed:', error);
    }
  }

  // 带重试的同步
  private async syncWithRetry<T>(
    type: string,
    syncFn: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<T> {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await syncFn();
      } catch (error) {
        if (i === maxRetries - 1) throw error;

        console.warn(`${type} sync attempt ${i + 1} failed, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; // 指数退避
      }
    }
    throw new Error(`${type} sync failed after ${maxRetries} attempts`);
  }

  // 获取最后同步时间
  getLastSyncTime(): Date | null {
    if (typeof localStorage === 'undefined') return null;

    const timestamp = localStorage.getItem('last_sync_time');
    return timestamp ? new Date(parseInt(timestamp)) : null;
  }

  // 设置最后同步时间
  private setLastSyncTime(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('last_sync_time', Date.now().toString());
    }
  }

  // 检查是否需要同步
  needsSync(maxAgeMinutes: number = 10): boolean {
    const lastSync = this.getLastSyncTime();
    if (!lastSync) return true;

    const maxAge = maxAgeMinutes * 60 * 1000;
    return Date.now() - lastSync.getTime() > maxAge;
  }

  // 获取同步状态
  getSyncStatus(): {
    isRunning: boolean;
    lastSync: Date | null;
    needsSync: boolean;
    isOnline: boolean;
  } {
    return {
      isRunning: !!this.syncInterval,
      lastSync: this.getLastSyncTime(),
      needsSync: this.needsSync(),
      isOnline: this.isOnline
    };
  }

  // 手动强制同步
  async forceSync(): Promise<void> {
    // 清除缓存以强制获取最新数据
    dataService.clearCache();
    await this.sync();
  }
}

// 导出单例
export const backgroundSync = BackgroundSyncService.getInstance();

// 在页面加载时自动启动（仅在客户端）
if (typeof window !== 'undefined') {
  // 等待页面加载完成
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      backgroundSync.start(5); // 5分钟间隔
    });
  } else {
    backgroundSync.start(5);
  }
}