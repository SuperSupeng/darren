import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
const projectRoot = new URL('.', import.meta.url).pathname;

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    globalNotFound: true,
  },
  turbopack: {
    root: projectRoot,
  },
  async redirects() {
    return [
      {
        source: '/:locale(en|zh)/work',
        destination: '/:locale/projects',
        permanent: true,
      },
      {
        source: '/:locale(en|zh)/build',
        destination: '/:locale/projects',
        permanent: true,
      },
      {
        source: '/field-notes',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:locale(en|zh)/field-notes',
        destination: '/:locale/blog',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
