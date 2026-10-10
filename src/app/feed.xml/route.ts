import { source } from '@/lib/source';
import { absoluteUrl, siteUrl } from '@/lib/site';

export const dynamic = 'force-static';

export async function GET() {
  const pages = source.getPages();

  const items = pages
    .map((page) => {
      const url = absoluteUrl(page.url);
      return `
    <item>
      <title>${escapeXml(page.data.title)}</title>
      <link>${escapeXml(url)}</link>
      <description>${escapeXml(page.data.description ?? '')}</description>
      <guid>${escapeXml(url)}</guid>
    </item>`;
    })
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>RL Handbook</title>
    <link>${siteUrl}</link>
    <description>A comprehensive guide to Reinforcement Learning</description>
    <language>en</language>
    <atom:link href="${escapeXml(absoluteUrl('/feed.xml'))}" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
