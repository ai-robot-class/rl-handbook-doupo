'use client';

import { usePathname } from 'next/navigation';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { getLangFromPath, t } from '@/lib/ui';

export const gitConfig = {
  user: 'ai-robot-class',
  repo: 'rl-handbook-doupo',
  branch: 'main',
};

export function useBaseOptions(): BaseLayoutProps {
  const pathname = usePathname();
  // Both languages use real URL prefixes so navigation works on static hosts.
  const lang = getLangFromPath(pathname);
  const prefix = `/${lang}`;

  return {
    nav: {
      title: lang === 'zh' ? '斗破苍穹 × 强化学习手册' : 'RL Handbook',
      url: prefix,
    },
    links: [
      {
        text: t(lang, 'nav.map'),
        url: `${prefix}/map`,
        type: 'main',
      },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
