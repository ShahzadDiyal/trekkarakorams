/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  typescript: {
    // Type-checked clean via `tsc --noEmit`; build will now fail on real errors.
    ignoreBuildErrors: false,
  },
  eslint: {
    // No eslint config/deps are bundled with this project; skip during `next build`.
    // Add `eslint` + `eslint-config-next` and an eslint.config.mjs to enable.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;