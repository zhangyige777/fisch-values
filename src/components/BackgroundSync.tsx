'use client';

import { useEffect } from 'react';

export function BackgroundSync() {
  useEffect(() => {
    // 动态导入后台同步服务以避免SSR问题
    import('../lib/background-sync').then(({ backgroundSync }) => {
      // 启动后台同步
      backgroundSync.start(5); // 每5分钟同步一次

      // 监听数据同步事件
      const handleDataSynced = (event: CustomEvent) => {
        console.log('Data synced at:', new Date(event.detail.timestamp));
      };

      window.addEventListener('dataSynced', handleDataSynced as EventListener);

      // 清理函数
      return () => {
        window.removeEventListener('dataSynced', handleDataSynced as EventListener);
        backgroundSync.stop();
      };
    });
  }, []);

  // 这个组件不渲染任何内容，只是管理后台同步
  return null;
}