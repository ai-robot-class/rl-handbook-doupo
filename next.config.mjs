import { createMDX } from 'fumadocs-mdx/next';
import withBundleAnalyzer from '@next/bundle-analyzer';
import path from 'node:path';

const withMDX = createMDX();

function normalizeBasePath(value) {
  if (!value || value === '/') return '';
  return `/${value.replace(/^\/+|\/+$/g, '')}`;
}

const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);

/** @type {import('next').NextConfig} */
const config = {
  // GitHub Pages serves this repository as a static project site. The workflow
  // supplies its repository sub-path through NEXT_PUBLIC_BASE_PATH.
  output: 'export',
  basePath,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  // `shiki` is used by fumadocs-mdx's dynamic (runtime-compiled) collections
  // for code highlighting. Keep it external so it is loaded natively at
  // runtime instead of being bundled into the server build.
  serverExternalPackages: ['shiki'],
  // Replace `next-themes` (which injects an inline <script> that triggers the
  // React 19 "Encountered a script tag" warning on client navigations) with a
  // drop-in implementation that avoids rendering scripts inside components.
  webpack: (webpackConfig) => {
    webpackConfig.resolve.alias = {
      ...webpackConfig.resolve.alias,
      'next-themes': path.resolve(process.cwd(), 'src/lib/theme.tsx'),
    };
    return webpackConfig;
  },
  turbopack: {
    resolveAlias: {
      'next-themes': './src/lib/theme.tsx',
    },
  },
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

const analyzed = withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })(
  withMDX(config)
);

export default analyzed;
