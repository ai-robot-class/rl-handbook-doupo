import type { Metadata } from 'next';
import { AlgorithmMap } from '@/components/map/AlgorithmMap';
import { getLangFromPath, type UILang } from '@/lib/ui';
import { i18n } from '@/lib/i18n';
import { absoluteUrl } from '@/lib/site';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}

const meta: Record<
  UILang,
  { title: string; description: string; ogDescription: string }
> = {
  en: {
    title: 'The Map of RL',
    description:
      'A curated interactive map of reinforcement learning methods, their lineage, and a pathfinder that narrows the field to your problem.',
    ogDescription:
      'A curated interactive map of reinforcement learning methods and how they descend from one another.',
  },
  zh: {
    title: 'RL 图谱',
    description:
      '精选的强化学习方法交互图谱，展示它们之间的谱系，并提供一个能帮你缩小到适用方法的路径查找器。',
    ogDescription:
      '精选的强化学习方法交互图谱，展示各方法如何互相衍生。',
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang: langParam } = await params;
  const lang = getLangFromPath('/' + langParam);
  const m = meta[lang];
  const pageUrl = absoluteUrl(`/${lang}/map`);
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: pageUrl,
      languages: {
        en: absoluteUrl('/en/map'),
        'zh-CN': absoluteUrl('/zh/map'),
      },
    },
    openGraph: {
      title: m.title,
      description: m.ogDescription,
      url: pageUrl,
    },
  };
}

export default function MapPage() {
  return (
    <main className="h-[calc(100dvh-3.5rem)] overflow-hidden">
      <AlgorithmMap />
    </main>
  );
}
