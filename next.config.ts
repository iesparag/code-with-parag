import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'vercel.com'
    ],
  },
};

export default nextConfig;
