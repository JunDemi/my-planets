import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Gallery source URLs are stable, so keep optimized variants available between visits.
    minimumCacheTTL: 86_400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rgetctxtwapeoceduxrw.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
