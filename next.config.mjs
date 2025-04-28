import withNextIntl from 'next-intl/plugin';

const withNextIntlConfig = withNextIntl({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
    serverActions: {
      enabled: true
    }
  },
  output: 'standalone'
}

export default withNextIntlConfig(nextConfig);
