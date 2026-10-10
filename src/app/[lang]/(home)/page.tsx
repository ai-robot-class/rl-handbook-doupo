'use client';

import Link from 'next/link';
import { memo, useState, use } from 'react';
import { HeroCanvas } from '@/components/HeroCanvas';
import { MapTransitionLink } from '@/components/MapTransitionLink';
import { getLangFromPath, type UILang } from '@/lib/ui';

const SectionTitle = memo(function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-heading font-semibold text-sm uppercase mb-6"
      style={{
        letterSpacing: '0.1em',
        color: 'var(--color-fd-muted-foreground)',
      }}
    >
      {children}
    </h2>
  );
});

type Lang = UILang;

const texts: Record<Lang, {
  heroTitle: string;
  heroSubtitle: string;
  cta: string;
  ctaAria: string;
  abstractTitle: string;
  abstractText: string;
  chapterContentsTitle: string;
  comingSoon: string;
  authorTitle: string;
  authorRole: string;
  acknowledgementsTitle: string;
  acknowledgementsText: string;
  acknowledgementsSpecialThanksBefore: string;
  acknowledgementsSpecialThanksAfter: string;
  contributorsLabel: string;
}> = {
  en: {
    heroTitle: 'RL Handbook',
    heroSubtitle: 'A comprehensive guide to Reinforcement Learning',
    cta: 'Lock in',
    ctaAria: 'Open RL Handbook documentation',
    abstractTitle: 'Abstract',
    abstractText: 'This handbook gives a comprehensive, up-to-date guide to reinforcement learning and sequential decision making. Starting from bandits and Markov decision processes, it progresses through value-based methods, policy gradients, actor-critic architectures, and model-based approaches. Advanced topics include imitation learning, offline RL, curiosity-driven exploration, and multi-agent systems. The material balances mathematical rigor with runnable code examples, and is designed to serve as an open, continuously updated resource for students, researchers, and engineers entering or working in the field.',
    chapterContentsTitle: 'Chapter Contents',
    comingSoon: 'Coming soon',
    authorTitle: 'Project Maintainer',
    authorRole: 'Open-source reinforcement learning education',
    acknowledgementsTitle: 'Acknowledgements',
    acknowledgementsText: 'Thanks also to everyone improving this edition through feedback, corrections, and new material:',
    acknowledgementsSpecialThanksBefore: 'This edition is adapted from',
    acknowledgementsSpecialThanksAfter: ' under the original license and attribution.',
    contributorsLabel: 'contributors',
  },
  zh: {
    heroTitle: '斗破苍穹 × 强化学习手册',
    heroSubtitle: '从乌坦城的一缕斗气，到智能体的最优策略',
    cta: '踏上修炼之路',
    ctaAria: '打开斗破苍穹 × 强化学习手册',
    abstractTitle: '斗气大陆上的强化学习',
    abstractText: '把萧炎视为智能体，把斗气大陆视为环境：境界、资源与敌情构成状态，修炼、战斗与取舍构成动作，成长与代价则成为奖励。环境会按转移概率变化，眼前的河东河西并不代表永远；萧炎必须在一次次试炼中更新策略，药老则以价值评估与规划辅助他看见长期回报。教程从斗之气一路讲到斗圣级系统边界，但境界只代表理解层次，不是算法排行榜。每个重要表达式先给中文名称与用途，再用数字例、对比例和失败反例拆开讲解；标准术语、数学公式与可运行代码仍保持严格。本项目是非官方、非商业的同人教学改编。',
    chapterContentsTitle: '修炼路线',
    comingSoon: '即将推出',
    authorTitle: '项目维护与改编',
    authorRole: '强化学习开源教学',
    acknowledgementsTitle: '致谢',
    acknowledgementsText: '也感谢所有通过反馈、纠正和新素材持续改进本版本的贡献者：',
    acknowledgementsSpecialThanksBefore: '本教程基于',
    acknowledgementsSpecialThanksAfter: '改编，并保留原项目许可证与署名。',
    contributorsLabel: '贡献者',
  },
};

const chaptersEn: {
  title: string;
  slug: string;
  pages: { title: string; slug: string }[];
  comingSoon?: boolean;
}[] = [
  {
    title: 'Introduction',
    slug: '00-introduction',
    pages: [
      { title: 'Introduction', slug: 'introduction' },
      { title: 'What is Reinforcement Learning?', slug: 'what-is-reinforcement-learning' },
      { title: 'Taxonomy of RL Methods', slug: 'taxonomy' },
    ],
  },
  {
    title: 'Value-Based',
    slug: '01-value-based',
    pages: [
      { title: 'Multi-Armed Bandits', slug: 'multi-armed-bandits' },
      { title: 'Markov Decision Processes', slug: 'mdp' },
      { title: 'Dynamic Programming', slug: 'dynamic-programming' },
      { title: 'Monte Carlo and Temporal-Difference Prediction', slug: 'monte-carlo-and-temporal-difference' },
      { title: 'Sarsa and Q-Learning', slug: 'sarsa-and-q-learning' },
      { title: 'Deep Q-Networks', slug: 'dqn' },
      { title: 'DQN Improvements', slug: 'dqn-improvements' },
    ],
  },
  {
    title: 'On-Policy Policy-Based',
    slug: '02-on-policy-policy-based',
    pages: [
      { title: 'Policy Gradient and REINFORCE', slug: 'policy-gradient-and-reinforce' },
      { title: 'Actor-Critic, A2C and A3C', slug: 'actor-critic-a2c-a3c' },
      { title: 'TRPO', slug: 'trpo' },
      { title: 'PPO', slug: 'ppo' },
    ],
  },
  {
    title: 'Off-Policy Policy-Based',
    slug: '03-off-policy-policy-based',
    pages: [
      { title: 'Off-Policy Policy-Based Framework', slug: 'off-policy-policy-improvement-framework' },
      { title: 'DDPG', slug: 'ddpg' },
      { title: 'TD3 and SAC', slug: 'td3-and-sac' },
    ],
  },
  {
    title: 'Model-Based',
    slug: '04-model-based',
    comingSoon: true,
    pages: [
      { title: 'Dyna and Learned Models', slug: 'dyna-and-learned-models' },
      { title: 'Model Predictive Control', slug: 'model-predictive-control' },
      { title: 'AlphaZero and MuZero', slug: 'alphazero-and-muzero' },
    ],
  },
  {
    title: 'Advanced Topics',
    slug: '05-advanced-topics',
    comingSoon: true,
    pages: [
      { title: 'RLHF and Language Models', slug: 'rl-sequence-generation-and-rlhf' },
      { title: 'Imitation Learning', slug: 'imitation-learning' },
      { title: 'Offline RL', slug: 'offline-rl' },
      { title: 'Exploration', slug: 'exploration' },
      { title: 'Goal-Conditioned RL', slug: 'goal-conditioned-rl' },
      { title: 'Multi-Agent RL', slug: 'multi-agent-rl' },
    ],
  },
];

const chaptersZh: typeof chaptersEn = [
  {
    title: '序章：少年与决策',
    slug: '00-introduction',
    pages: [
      { title: '引言：从乌坦城出发', slug: 'introduction' },
      { title: '什么是强化学习？——萧炎如何从反馈中成长', slug: 'what-is-reinforcement-learning' },
      { title: '药老的强化学习修炼路线图', slug: 'taxonomy' },
    ],
  },
  {
    title: '第一卷：基于值的修炼之路',
    slug: '01-value-based',
    pages: [
      { title: '多臂赌博机：萧炎的 k 座聚气台', slug: 'multi-armed-bandits' },
      { title: '马尔可夫决策过程：萧炎的三年成长', slug: 'mdp' },
      { title: '动态规划：药老的云岚山教学棋盘', slug: 'dynamic-programming' },
      { title: '药老的历练复盘：蒙特卡洛与时序差分预测', slug: 'monte-carlo-and-temporal-difference' },
      { title: '萧炎的下一招：Sarsa 与 Q-Learning', slug: 'sarsa-and-q-learning' },
      { title: '纳戒中的经验：深度 Q 网络 (DQN)', slug: 'dqn' },
      { title: '药老的改良卷：Double、Dueling、PER 与 Rainbow', slug: 'dqn-improvements' },
    ],
  },
  {
    title: '同策略修炼：当场悟法 (On-Policy)',
    slug: '02-on-policy-policy-based',
    pages: [
      { title: '策略梯度与 REINFORCE：历练回报如何改变出招概率', slug: 'policy-gradient-and-reinforce' },
      { title: 'Actor-Critic、A2C 与 A3C：萧炎出招，药老点评', slug: 'actor-critic-a2c-a3c' },
      { title: 'TRPO：信赖域内稳固根基', slug: 'trpo' },
      { title: 'PPO：裁剪步幅，稳中求进', slug: 'ppo' },
    ],
  },
  {
    title: '异策略修炼：纳戒旧卷宗 (Off-Policy)',
    slug: '03-off-policy-policy-based',
    pages: [
      { title: '异策略改进框架：从纳戒旧卷宗中复盘', slug: 'off-policy-policy-improvement-framework' },
      { title: 'DDPG：连续斗气控制', slug: 'ddpg' },
      { title: 'TD3 与 SAC：双重评判与最大熵探索', slug: 'td3-and-sac' },
    ],
  },
  {
    title: '第四卷：药老的模型与推演',
    slug: '04-model-based',
    comingSoon: true,
    pages: [
      { title: 'Dyna：在真实历练与药老推演之间', slug: 'dyna-and-learned-models' },
      { title: '模型预测控制：每一步都重新推演', slug: 'model-predictive-control' },
      { title: 'AlphaZero 与 MuZero：棋局搜索与学得模型', slug: 'alphazero-and-muzero' },
    ],
  },
  {
    title: '第五卷：更广阔的斗气大陆',
    slug: '05-advanced-topics',
    comingSoon: true,
    pages: [
      { title: '模仿学习：先观摩强者，再走自己的路', slug: 'imitation-learning' },
      { title: '离线 RL：只凭纳戒旧卷，能否学出新策略？', slug: 'offline-rl' },
      { title: '序列生成与 RLHF：让输出接受偏好评审', slug: 'rl-sequence-generation-and-rlhf' },
      { title: '探索：离开熟路，才可能遇见异火', slug: 'exploration' },
      { title: '目标条件 RL：同一套策略，不同的修炼目标', slug: 'goal-conditioned-rl' },
      { title: '多智能体 RL：当斗气大陆不止一个决策者', slug: 'multi-agent-rl' },
    ],
  },
];

export default function HomePage({ params: paramsPromise }: { params: Promise<{ lang: string }> }) {
  const params = use(paramsPromise);
  const lang = getLangFromPath('/' + params.lang) as Lang;
  const t = texts[lang];
  const chapters = lang === 'zh' ? chaptersZh : chaptersEn;
  // Both languages use real prefixes so links work on GitHub Pages.
  const prefix = `/${lang}`;

  return (
    <main className="landing-page">
      {/* ===== HERO ===== */}
      <section
        className="relative overflow-hidden grain-overlay flex items-center justify-center"
        style={{ minHeight: '65vh' }}
      >
        <HeroCanvas />

        <div className="relative z-10 w-full max-w-[720px] min-w-0 text-center px-4 sm:px-6">
          <h1
            className="font-heading font-bold leading-none text-[2.5rem] sm:text-[4.5rem]"
            style={{
              letterSpacing: 0,
              color: 'var(--color-fd-foreground)',
            }}
          >
            {t.heroTitle}
          </h1>

          <p
            className="font-body font-light mt-5 mx-auto max-w-[34rem]"
            style={{
              fontSize: '1.15rem',
              lineHeight: 1.6,
              color: 'var(--color-fd-muted-foreground)',
            }}
          >
            {t.heroSubtitle}
          </p>

          <div className="mt-8">
            <Link
              href={`${prefix}/docs/00-introduction/introduction`}
              prefetch={true}
              className="cta-btn inline-block font-heading font-semibold text-sm uppercase rounded-none px-8 py-3 min-h-[44px] leading-[44px]"
              aria-label={t.ctaAria}
              style={{
                letterSpacing: '0.08em',
                background: 'var(--color-fd-primary)',
                color: 'var(--color-fd-primary-foreground)',
              }}
            >
              {t.cta}
            </Link>
          </div>

          <div className="mt-5">
            <MapTransitionLink />
          </div>
        </div>
      </section>

      {/* ===== ABSTRACT ===== */}
      <section className="py-10 sm:py-24 px-4 sm:px-6">
        <div style={{ maxWidth: 700, margin: '0 auto' }}>

          <SectionTitle>{t.abstractTitle}</SectionTitle>
          <p
            className="font-body"
            style={{
              fontSize: '1.05rem',
              lineHeight: 1.8,
              color: 'var(--color-fd-foreground)',
              textWrap: 'pretty',
            }}
          >
            {t.abstractText}
          </p>
        </div>
      </section>

      {/* ===== CHAPTER CONTENTS ===== */}
      <section className="py-10 sm:py-24 px-4 sm:px-6">
        <div style={{ maxWidth: 700, margin: '0 auto' }}>

          <SectionTitle>{t.chapterContentsTitle}</SectionTitle>

          <ol className="mt-10 space-y-10" style={{ listStyle: 'none', padding: 0 }}>
            {chapters.map((chapter, chapterIdx) => {
              const chapterNum = String(chapterIdx + 1).padStart(2, '0');
              return (
                <li key={chapter.slug}>
                  <div className="flex items-baseline gap-4 flex-wrap">
                    <span
                      className="font-heading font-semibold text-sm"
                      style={{
                        color: 'var(--color-fd-muted-foreground)',
                        letterSpacing: '0.05em',
                        minWidth: '2.5rem',
                      }}
                    >
                      {chapterNum}
                    </span>
                    <h3
                      className="font-heading font-semibold"
                      style={{
                        fontSize: '1.05rem',
                        letterSpacing: '-0.01em',
                        color: chapter.comingSoon
                          ? 'var(--color-fd-muted-foreground)'
                          : 'var(--color-fd-foreground)',
                      }}
                    >
                      {chapter.title}
                    </h3>
                    {chapter.comingSoon && (
                      <span
                        className="font-heading text-[0.65rem] uppercase px-2 py-0.5 rounded-sm"
                        style={{
                          letterSpacing: '0.12em',
                          color: 'var(--color-fd-muted-foreground)',
                          border: '1px solid var(--color-fd-border)',
                        }}
                      >
                        {t.comingSoon}
                      </span>
                    )}
                  </div>

                  {!chapter.comingSoon && (
                    <ol
                      className="mt-4 space-y-2.5"
                      style={{
                        listStyle: 'none',
                        padding: 0,
                        marginLeft: '2.5rem',
                        paddingLeft: '1rem',
                        borderLeft: '1px solid var(--color-fd-border)',
                      }}
                    >
                      {chapter.pages.map((page, pageIdx) => (
                        <li key={page.slug} className="flex items-baseline gap-3">
                          <span
                            className="font-heading text-xs shrink-0"
                            style={{
                              color: 'var(--color-fd-muted-foreground)',
                              letterSpacing: '0.05em',
                              minWidth: '2rem',
                            }}
                          >
                            {chapterNum}.{pageIdx + 1}
                          </span>
                          <Link
                            href={`${prefix}/docs/${chapter.slug}/${page.slug}`}
                            prefetch={false}
                            className="font-body icon-link underline-offset-2 hover:underline"
                            style={{
                              fontSize: '0.95rem',
                              lineHeight: 1.5,
                              color: 'var(--color-fd-foreground)',
                            }}
                          >
                            {page.title}
                          </Link>
                        </li>
                      ))}
                    </ol>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ===== AUTHOR ===== */}
      <section className="py-10 sm:py-24 px-4 sm:px-6">
        <div style={{ maxWidth: 700, margin: '0 auto' }}>

          <SectionTitle>{t.authorTitle}</SectionTitle>

          <div>
            <p
              className="font-semibold"
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                color: 'var(--color-fd-foreground)',
              }}
            >
              AI Robot Class
            </p>
            <p
              className="font-body text-sm mt-1"
              style={{ color: 'var(--color-fd-muted-foreground)' }}
            >
              {t.authorRole}
            </p>
            <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mt-3">
              {[
                { label: 'GitHub', href: 'https://github.com/ai-robot-class/rl-handbook-doupo' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-link font-heading text-xs uppercase"
                  style={{
                    letterSpacing: '0.1em',
                    color: 'var(--color-fd-muted-foreground)',
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== ACKNOWLEDGEMENTS ===== */}
      <section className="py-10 sm:py-24 px-4 sm:px-6">
        <div style={{ maxWidth: 700, margin: '0 auto' }}>

          <SectionTitle>{t.acknowledgementsTitle}</SectionTitle>
          <p
            className="font-body"
            style={{
              fontSize: '1.05rem',
              lineHeight: 1.8,
              color: 'var(--color-fd-foreground)',
              textWrap: 'pretty',
            }}
          >
            {t.acknowledgementsSpecialThanksBefore}{' '}
            <a
              href="https://github.com/lubludrova/rl-handbook"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 icon-link"
              style={{ color: 'var(--color-fd-foreground)' }}
            >
              {"Ruslan Ageev's RL Handbook"}
            </a>
            {t.acknowledgementsSpecialThanksAfter}
          </p>
          <p
            className="font-body mt-4"
            style={{
              fontSize: '1.05rem',
              lineHeight: 1.8,
              color: 'var(--color-fd-foreground)',
              textWrap: 'pretty',
            }}
          >
            {t.acknowledgementsText}{' '}
            <a
              href="https://github.com/ai-robot-class/rl-handbook-doupo/graphs/contributors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 icon-link"
              style={{ color: 'var(--color-fd-foreground)' }}
            >
              {t.contributorsLabel}
            </a>
            .
          </p>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer
        className="py-8 px-4 sm:px-6"
        style={{ borderTop: '1px solid var(--color-fd-border)' }}
      >
        <div
          className="flex flex-wrap items-center justify-center gap-10 sm:gap-12 text-sm font-body"
          style={{ color: 'var(--color-fd-muted-foreground)' }}
        >
          <span>&copy; 2026 AI Robot Class</span>
          <a href="https://github.com/ai-robot-class/rl-handbook-doupo" target="_blank" rel="noopener noreferrer" className="icon-link" style={{ lineHeight: 0 }} aria-label="GitHub">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
        </div>
      </footer>
    </main>
  );
}
