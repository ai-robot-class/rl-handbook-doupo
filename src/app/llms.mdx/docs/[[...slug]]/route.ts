import { getLLMPageUrl, getLLMText, source } from '@/lib/source';
import { i18n } from '@/lib/i18n';
import { notFound } from 'next/navigation';

export const revalidate = false;
export const dynamicParams = false;

export async function GET(
  _request: Request,
  { params }: RouteContext<'/llms.mdx/docs/[[...slug]]'>,
) {
  const { slug } = await params;
  if (!slug || slug.at(-1) !== 'content.md') notFound();

  const lang = slug[0];
  if (!i18n.languages.includes(lang as never)) notFound();

  const pageSlug = slug.slice(1, -1);

  const page = source.getPage(pageSlug, lang);
  if (!page) notFound();

  return new Response(await getLLMText(page), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    slug: getLLMPageUrl(page).segments,
  }));
}
