import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'q8s8tyn5i5.ufs.sh',
        port: '',
      },
    ],
  },
};

export default nextConfig;
