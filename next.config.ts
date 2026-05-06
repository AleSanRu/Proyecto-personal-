import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    cacheComponents: false,  // Desactivar cacheComponents
  },
  // Esto evita el prerenderizado de páginas que dependen de auth
  output: 'standalone',
};

export default nextConfig;