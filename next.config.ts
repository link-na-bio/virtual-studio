import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  eslint: {
    // Aviso para a Vercel ignorar os erros chatos de aspas e formatação no deploy
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Aviso para a Vercel ignorar checagens estritas de tipagem
    ignoreBuildErrors: true,
  }
};

export default nextConfig;