import 'katex/dist/katex.min.css';
import './global.css';
import type { Metadata } from 'next';
import { repositoryUrl, siteAuthor, siteUrl } from '@/lib/site';

const title = '斗破苍穹 × 强化学习手册';
const description = '用《斗破苍穹》的人物、故事与成长路线讲透强化学习。';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // Language layouts own their localized title templates. Keeping the root
  // title plain avoids applying two templates to language home pages.
  title,
  description,
  applicationName: title,
  authors: [{ name: siteAuthor, url: repositoryUrl }],
  creator: siteAuthor,
  publisher: siteAuthor,
  keywords: [
    '斗破苍穹强化学习手册',
    '强化学习',
    'reinforcement learning',
    'deep reinforcement learning',
    'policy gradients',
    'actor-critic',
    'model-based reinforcement learning',
    'RLHF',
    'Markov decision processes',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: title,
    title,
    description,
    locale: 'zh_CN',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return children;
}
