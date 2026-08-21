/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep your existing images configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  
  // Keep your existing TypeScript and ESLint settings
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // --- NEW ADDITIONS (safe to add) ---
  
  // Generate unique build ID to prevent chunk loading errors
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },

  // Headers for better caching
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Enable SWC minification (faster builds, no impact on existing code)
  swcMinify: true,

  // Compress responses (no impact on existing code)
  compress: true,

  // Remove "X-Powered-By" header for security (no impact on existing code)
  poweredByHeader: false,

  // React Strict Mode (helps catch issues, no impact on existing code)
  reactStrictMode: true,
};

export default nextConfig;