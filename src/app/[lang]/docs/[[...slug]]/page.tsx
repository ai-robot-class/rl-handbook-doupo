import { getLLMPageUrl, getPageImage, source } from '@/lib/source';
import { JsonLd } from '@/components/JsonLd';
import { ArticleFeedback } from '@/components/ArticleFeedback';
import { EngagedReaderPrompt } from '@/components/EngagedReaderPrompt';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import { getLangFromPath, t, type UILang } from '@/lib/ui';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { absoluteUrl, repositoryUrl, siteAuthor, siteName } from '@/lib/site';

// `createRelativeLink` only rewrites links that start with "./" (relative to the
// source file path). Absolute `/docs/...` links — the form we use in content —
// are passed through untouched. Both languages use explicit URL prefixes on
// the static site, so add the active locale to `/docs`-rooted links.
function createLocalizedLink(
  source: typeof import('@/lib/source').source,
  page: { locale?: string },
) {
  const RelativeLink = createRelativeLink(source, page as never);
  const prefix = page.locale ? `/${page.locale}` : '';
  const LocalizedLink: typeof RelativeLink = async ({ href, ...props }) => {
    const localized =
      href && href.startsWith('/docs') ? `${prefix}${href}` : href;
    return <RelativeLink href={localized ?? undefined} {...props} />;
  };
  return LocalizedLink;
}
export default async function Page(props: PageProps<'/[lang]/docs/[[...slug]]'>) {
  const params = await props.params;
  const lang = params.lang as string;
  const page = source.getPage(params.slug, lang);
  if (!page) notFound();

  const { body: MDX, toc } = await page.data.load();
  const pageUrl = absoluteUrl(page.url);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.data.title,
    description: page.data.description,
    url: pageUrl,
    author: {
      '@type': 'Organization',
      name: siteAuthor,
      url: repositoryUrl,
    },
    datePublished: '2026',
    publisher: {
      '@type': 'Organization',
      name: siteName,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
  } satisfies Record<string, unknown>;

  return (
    <DocsPage
      toc={toc}
      full={page.data.full}
      tableOfContent={{ enabled: !page.data.full && toc.length > 0 }}
      breadcrumb={{ enabled: true, includePage: true }}
    >
      <div className="grid grid-cols-1 gap-y-3 xl:grid-cols-[minmax(0,1fr)_auto] xl:gap-x-4">
        <DocsTitle className="min-w-0 sm:row-start-2 xl:col-start-1 xl:row-start-1">
          {page.data.title}
        </DocsTitle>
        <DocsDescription className="mb-0 sm:row-start-3 xl:col-span-2 xl:row-start-2">
          {page.data.description}
        </DocsDescription>
        <div
          className="hidden items-center justify-end gap-2 sm:flex sm:row-start-1 xl:col-start-2 xl:row-start-1 xl:justify-start"
          style={{ transform: 'translateY(-2px)' }}
        >
          <MarkdownCopyButton
            markdownUrl={getLLMPageUrl(page).url}
            className="copy-btn inline-flex h-9 shrink-0 items-center gap-2 whitespace-nowrap rounded-sm px-3 font-heading text-xs font-medium cursor-pointer"
            style={{
              color: 'var(--color-fd-muted-foreground)',
              border: '1px solid var(--color-fd-border)',
              background: 'transparent',
            }}
          >
            {t(lang as UILang, 'article.copyMarkdown')}
          </MarkdownCopyButton>
          <ArticleFeedback url={pageUrl} title={page.data.title} />
        </div>
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createLocalizedLink(source, page),
          })}
        />
      </DocsBody>
      <EngagedReaderPrompt url={pageUrl} title={page.data.title} />
      <JsonLd id={`article-json-ld-${(params.slug ?? ['index']).join('-')}`} data={articleSchema} />
    </DocsPage>
  );
}

export const dynamicParams = false;

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<'/[lang]/docs/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  const lang = params.lang as string;
  const page = source.getPage(params.slug, lang);
  if (!page) notFound();

  const canonicalUrl = absoluteUrl(page.url);
  const imageUrl = absoluteUrl(getPageImage(page).url);
  const keywords = [
    page.data.title,
    `${page.data.title} reinforcement learning`,
    `${page.data.title} RL`,
    'RL Handbook',
    'reinforcement learning',
  ];

  return {
    title: page.data.title,
    description: page.data.description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      url: canonicalUrl,
      images: imageUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: page.data.title,
      description: page.data.description,
      images: [imageUrl],
    },
  };
}
