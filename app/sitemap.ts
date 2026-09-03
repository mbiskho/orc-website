import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/seo';

/**
 * Static four-page site, so the routes are listed explicitly. Add new routes
 * here as they are created.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${siteUrl}`, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/services`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/use-cases`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/about`, lastModified, changeFrequency: 'yearly', priority: 0.7 },
  ];
}
