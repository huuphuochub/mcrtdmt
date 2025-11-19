/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Giữ domains cho backward compatibility (Next.js 12)
    domains: ['res.cloudinary.com', 'encrypted-tbn0.gstatic.com'],
  },
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      // reduce number of watchers, avoid heavy directories
      ignored: [
        '**/node_modules/**',
        '**/.next/**',
        '**/logs/**',
        '**/dist/**',
        '**/coverage/**',
      ],
      // slow down polling when WATCHPACK_POLLING=true
      // (env is set in docker-compose)
      poll: process.env.WATCHPACK_POLLING ? Number(process.env.WATCHPACK_POLLING_INTERVAL || 1000) : undefined,
      aggregateTimeout: 300,
    };
    return config;
  },
};

export default nextConfig;
