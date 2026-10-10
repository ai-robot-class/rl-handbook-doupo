const DEFAULT_SITE_URL = 'https://course.a-real.me/rl-handbook-doupo';

export const siteName = 'RL Handbook';
export const siteAuthor = 'AI Robot Class';
export const repositoryUrl =
  'https://github.com/ai-robot-class/rl-handbook-doupo';

function normalizeBasePath(value: string | undefined): string {
  if (!value || value === '/') return '';
  return `/${value.replace(/^\/+|\/+$/g, '')}`;
}

function normalizeSiteUrl(value: string): string {
  return value.replace(/\/+$/g, '');
}

export const basePath = normalizeBasePath(
  process.env.NEXT_PUBLIC_BASE_PATH,
);

export const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL,
);

/** Prefix an application-root path for a GitHub Pages project site. */
export function withBasePath(path: string): string {
  if (!path || !path.startsWith('/') || path.startsWith('//')) return path;
  if (!basePath || path === basePath || path.startsWith(`${basePath}/`)) {
    return path;
  }
  return path === '/' ? `${basePath}/` : `${basePath}${path}`;
}

/** Resolve an application path against the public production site URL. */
export function absoluteUrl(path = ''): string {
  if (/^https?:\/\//i.test(path)) return path;
  if (!path || path === '/') return `${siteUrl}/`;

  let pathname = path.startsWith('/') ? path : `/${path}`;
  // Some URL producers already return a browser-facing path with basePath.
  // siteUrl also includes that path on a GitHub project site, so remove one
  // copy before joining the two values.
  if (basePath && (pathname === basePath || pathname.startsWith(`${basePath}/`))) {
    pathname = pathname.slice(basePath.length) || '/';
  }

  return pathname === '/' ? `${siteUrl}/` : `${siteUrl}${pathname}`;
}
