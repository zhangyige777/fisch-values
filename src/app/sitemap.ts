import { MetadataRoute } from 'next';
import { sampleFish, sampleRods, sampleLocations } from '@/data/sample-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fischvalues.online';

  // 静态页面
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/fisch-codes`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculator`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tier-list`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  // 动态生成鱼页面
  const fishPages = sampleFish.map((fish) => ({
    url: `${baseUrl}/fish/${fish.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 动态生成鱼竿页面
  const rodPages = sampleRods.map((rod) => ({
    url: `${baseUrl}/rod/${rod.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 动态生成地点页面
  const locationPages = sampleLocations.map((location) => ({
    url: `${baseUrl}/location/${location.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...fishPages, ...rodPages, ...locationPages];
}