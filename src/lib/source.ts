import { enDocs, meta } from 'collections/server';
import { zhDocs } from 'collections/dynamic';
import { type InferPageType, loader, type StaticSource } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { i18n } from '@/lib/i18n';
import { absoluteUrl, withBasePath } from '@/lib/site';

// English pages are compiled at build time (async chunks); translated pages
// are compiled at runtime (dynamic collections). All locales are merged into
// one source so `source.getPage(slug, lang)` keeps working.
type PageData = (typeof enDocs)[number] | (typeof zhDocs)[number];
type MetaData = (typeof meta)[number];

const files: StaticSource<{ pageData: PageData; metaData: MetaData }>['files'] = [
  ...enDocs.map((entry) => ({
    type: 'page' as const,
    path: entry.info.path,
    absolutePath: entry.info.fullPath,
    data: entry,
  })),
  ...zhDocs.map((entry) => ({
    type: 'page' as const,
    path: entry.info.path,
    absolutePath: entry.info.fullPath,
    data: entry,
  })),
  ...meta.map((entry) => ({
    type: 'meta' as const,
    path: entry.info.path,
    absolutePath: entry.info.fullPath,
    data: entry,
  })),
];

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: '/docs',
  source: { files } as StaticSource<{ pageData: PageData; metaData: MetaData }>,
  i18n,
  plugins: [lucideIconsPlugin()],
  pageTree: {
    transformers: [
      {
        // Chapters are folders containing only index.mdx (plus colocated assets
        // like example.py and figures/). Without this, Fumadocs renders them
        // with an expand chevron as if they had nested pages.
        folder(node) {
          if (node.children.length === 0 && node.index) {
            node.collapsible = false;
          }
          return node;
        },
      },
    ],
  },
});

export function getPageImage(page: InferPageType<typeof source>) {
  // Include the locale as the first segment so OG image URLs distinguish
  // between languages (e.g. /og/docs/en/... vs /og/docs/zh/...).
  // `next/og.js` (used by the OG route) renders PNG, hence the .png extension.
  const segments = [page.locale, ...page.slugs, 'image.png'];

  return {
    segments,
    // Keep this app-root relative. Metadata callers turn it into an absolute
    // URL with `absoluteUrl()`, whose site URL already includes the Pages path.
    url: `/og/docs/${segments.join('/')}`,
  };
}

export function getLLMPageUrl(page: InferPageType<typeof source>) {
  const segments = [page.locale, ...page.slugs, 'content.md'];

  return {
    segments,
    url: withBasePath(`/llms.mdx/docs/${segments.join('/')}`),
  };
}

export async function getLLMText(page: InferPageType<typeof source>) {
  let text: string;

  if (page.locale === i18n.defaultLanguage) {
    await page.data.load();
    text = await page.data.getText('processed');
  } else {
    // Translated pages are compiled at runtime without postprocessing, so
    // `processed` markdown is unavailable — read the raw file instead (no
    // runtime MDX compilation involved).
    text = await page.data.getText('raw');
  }

  // The website uses a named component so JSX images receive the Pages
  // basePath. Export plain HTML with absolute asset URLs for portable Markdown
  // copies and LLM endpoints.
  const assetRoot = absoluteUrl('/docs-assets/');
  const portable = text
    .replaceAll('<BasePathImage', '<img')
    .replaceAll('src="/docs-assets/', `src="${assetRoot}`)
    .replaceAll('](/docs-assets/', `](${assetRoot}`)
    .replace(/\]\((\/[^)\s]+)([^)]*)\)/g, (_match, path: string, suffix: string) => {
      return `](${absoluteUrl(path)}${suffix})`;
    })
    .replace(/href="(\/[^"#]+)"/g, (_match, path: string) => {
      return `href="${absoluteUrl(path)}"`;
    });

  return `# ${page.data.title}\n\n${portable}`;
}
