import { NextResponse } from 'next/server';

// 模拟外部API数据源
const EXTERNAL_APIS = {
  codes: {
    url: 'https://api.fischgame.com/v1/codes',
    // 备用数据源
    fallback: [
      { code: 'FISCH2024', reward: '10,000 C$', status: 'active', expires: '2024-12-31' },
      { code: 'FISHINGPRO', reward: '5,000 C$', status: 'active', expires: '2024-12-25' },
    ]
  },
  fish: {
    url: 'https://api.fischgame.com/v1/fish',
    fallback: []
  },
  rods: {
    url: 'https://api.fischgame.com/v1/rods',
    fallback: []
  }
};

// 缓存配置
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟
const cache = new Map<string, { data: any; timestamp: number }>();

async function fetchWithCache(key: string, fetcher: () => Promise<any>) {
  const cached = cache.get(key);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const data = await fetcher();
    cache.set(key, { data, timestamp: Date.now() });
    return data;
  } catch (error) {
    console.error(`Failed to fetch ${key}:`, error);
    return cached?.data || null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  if (!type || !EXTERNAL_APIS[type as keyof typeof EXTERNAL_APIS]) {
    return NextResponse.json({ error: 'Invalid data type' }, { status: 400 });
  }

  const config = EXTERNAL_APIS[type as keyof typeof EXTERNAL_APIS];

  const data = await fetchWithCache(type, async () => {
    // 尝试从外部API获取数据
    try {
      const response = await fetch(config.url, {
        headers: {
          'User-Agent': 'Fisch-Values-Tool/1.0',
          'Accept': 'application/json',
        },
        next: { revalidate: CACHE_DURATION / 1000 }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // 如果外部API失败，使用备用数据
      console.warn(`Using fallback data for ${type}`);
      return config.fallback;
    }
  });

  if (!data) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }

  return NextResponse.json({
    data,
    lastUpdated: cache.get(type)?.timestamp || Date.now(),
    source: 'api'
  });
}

// 定期清理缓存
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of cache.entries()) {
    if (now - value.timestamp > CACHE_DURATION) {
      cache.delete(key);
    }
  }
}, CACHE_DURATION);