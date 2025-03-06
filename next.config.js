/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  async rewrites() {
    return [];
  },
  // Server configuration
  server: {
    port: 3005,
  },
}

module.exports = nextConfig; 