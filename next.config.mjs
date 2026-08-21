/** @type {import('next').NextConfig} */
const nextConfig = {

  output: 'export',

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    unoptimized: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  trailingSlash: true,
};

export default nextConfig;
