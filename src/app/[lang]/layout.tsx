import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { i18n } from '@/lib/i18n';
import {
  absoluteUrl,
  repositoryUrl,
  siteAuthor,
  siteName,
  siteUrl,
  withBasePath,
} from '@/lib/site';

const descriptions = {
  en: 'A rigorous reinforcement learning handbook with runnable examples.',
  zh: '用《斗破苍穹》人物与故事讲透强化学习，并保留严谨公式与可运行示例。',
} as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;
  const isChinese = lang === 'zh';
  const title = isChinese
    ? '斗破苍穹 × 强化学习手册'
    : 'RL Handbook: Reinforcement Learning Guide';
  const description = descriptions[isChinese ? 'zh' : 'en'];
  const pageUrl = absoluteUrl(`/${lang}`);

  return {
    metadataBase: new URL(`${siteUrl}/`),
    title: {
      default: title,
      template: `%s | ${isChinese ? '斗破苍穹 × 强化学习手册' : siteName}`,
    },
    description,
    applicationName: siteName,
    authors: [{ name: siteAuthor, url: repositoryUrl }],
    keywords: [
      'RL Handbook',
      '强化学习',
      'reinforcement learning',
      'deep reinforcement learning',
      'policy gradients',
      'actor-critic',
      'Markov decision processes',
      '斗破苍穹',
    ],
    alternates: {
      canonical: pageUrl,
      languages: {
        en: absoluteUrl('/en'),
        'zh-CN': absoluteUrl('/zh'),
      },
    },
    openGraph: {
      type: 'website',
      url: pageUrl,
      siteName,
      title,
      description,
      locale: isChinese ? 'zh_CN' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function Layout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  const isChinese = lang === 'zh';
  const description = descriptions[isChinese ? 'zh' : 'en'];
  const languageUrl = absoluteUrl(`/${lang}`);
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: languageUrl,
    description,
    author: {
      '@type': 'Organization',
      name: siteAuthor,
      url: repositoryUrl,
    },
    inLanguage: isChinese ? 'zh-CN' : 'en',
  } satisfies Record<string, unknown>;
  const bookSchema = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: isChinese
      ? '斗破苍穹 × 强化学习手册'
      : 'RL Handbook: A Comprehensive Guide to Reinforcement Learning',
    author: {
      '@type': 'Organization',
      name: siteAuthor,
      url: repositoryUrl,
    },
    url: languageUrl,
    datePublished: '2026',
    publisher: {
      '@type': 'Organization',
      name: siteAuthor,
    },
    inLanguage: isChinese ? 'zh-CN' : 'en',
  } satisfies Record<string, unknown>;

  return (
    <html lang={lang} suppressHydrationWarning>
      <head />
      <body className="flex flex-col min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:px-4 focus:py-2 focus:font-heading focus:text-sm focus:outline-2 focus:outline-offset-2"
          style={{
            background: 'var(--color-fd-background)',
            color: 'var(--color-fd-foreground)',
            outlineColor: 'var(--color-fd-foreground)',
            border: '1px solid var(--color-fd-border)',
          }}
        >
          {isChinese ? '跳转到内容' : 'Skip to content'}
        </a>
        <RootProvider
          search={{
            options: {
              type: 'static',
              api: withBasePath('/api/search'),
            },
          }}
          i18n={{
            locale: lang,
            locales: [
              { name: 'English', locale: 'en' },
              { name: '中文', locale: 'zh' },
            ],
            translations: isChinese
              ? {
                  'On this page(table of contents)': '本页目录',
                  'Table of Contents(inline table of contents)': '目录',
                  'No Headings(table of contents)': '本节暂无标题',
                }
              : {},
          }}
        >
          <div id="main-content" className="contents">
            {children}
          </div>
        </RootProvider>
        <JsonLd id="website-json-ld" data={websiteSchema} />
        <JsonLd id="book-json-ld" data={bookSchema} />
      </body>
    </html>
  );
}
