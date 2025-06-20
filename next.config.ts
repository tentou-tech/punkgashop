import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  reactStrictMode: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
}
const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
