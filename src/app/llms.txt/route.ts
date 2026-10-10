import { source } from '@/lib/source';
import { absoluteUrl } from '@/lib/site';
import { llms } from 'fumadocs-core/source';

export const revalidate = false;

export function GET() {
  const index = llms(source).index();
  const withAbsoluteLinks = index.replace(/\]\((\/[^)]+)\)/g, (_match, path: string) => {
    return `](${absoluteUrl(path)})`;
  });

  return new Response(withAbsoluteLinks, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
