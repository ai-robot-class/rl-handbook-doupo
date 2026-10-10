import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import type { ComponentProps } from 'react';

import { BellmanPlayground } from '@/components/bellman-playground/BellmanPlayground';
import { withBasePath } from '@/lib/site';

const DefaultMdxImage = defaultMdxComponents.img;

function MdxImage(props: ComponentProps<typeof DefaultMdxImage>) {
  const src =
    typeof props.src === 'string' ? withBasePath(props.src) : props.src;
  return <DefaultMdxImage {...props} src={src} />;
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    img: MdxImage,
    // Explicit JSX <img> tags bypass MDX's lowercase element mapping. Content
    // uses this named component so repository Pages paths are still prefixed.
    BasePathImage: MdxImage,
    BellmanPlayground,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
