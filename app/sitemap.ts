import type { MetadataRoute } from 'next';
import { publicPaths, siteUrl } from './content/site';
export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths.map(path => ({ url: `${siteUrl}${path === '/' ? '' : path}`, changeFrequency: path === '/properties' ? 'daily' : 'monthly', priority: path === '/' ? 1 : path.startsWith('/services') ? 0.9 : 0.7 }));
}
