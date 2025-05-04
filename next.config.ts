const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  assetPrefix: isProd ? '/iesparag.github.io/' : '',
  basePath: isProd ? '/iesparag.github.io' : '',
  output: 'export'
};

export default nextConfig;