import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'c8.alamy.com', 
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com'
      },
      {
        protocol: 'https',
        hostname: 'api.escuelajs.co'
      },
      {
        protocol: 'https',
        hostname: 'cdn-3.expansion.mx'
      }
    ],
  },
};

export default nextConfig;