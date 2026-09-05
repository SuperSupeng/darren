import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
const projectRoot = new URL('.', import.meta.url).pathname;

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  turbopack: {
    root: projectRoot,
  },
};

export default withNextIntl(nextConfig);
