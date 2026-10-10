import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { absoluteUrl } from '@/lib/site';

export const dynamic = 'force-static';

function canonicalRoute(path: string): string {
  return absoluteUrl(path.endsWith('/') ? path : `${path}/`);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const entries: MetadataRoute.Sitemap = [
    {
      url: canonicalRoute('/en'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: canonicalRoute('/zh'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: canonicalRoute('/en/map'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: canonicalRoute('/zh/map'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];

  // Add docs pages for every language. `page.url` already includes an explicit
  // locale prefix (for example, /en/docs/... and /zh/docs/...).
  const enPages = source.getPages('en');
  const zhPages = source.getPages('zh');

  for (const page of enPages) {
    entries.push({
      url: canonicalRoute(page.url),
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    });
  }

  for (const page of zhPages) {
    entries.push({
      url: canonicalRoute(page.url),
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    });
  }

  return entries;
}
