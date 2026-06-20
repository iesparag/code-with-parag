import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'vercel.com',
      'example.com',
      'another-example.com',
    ],
  },
};

export default nextConfig;
