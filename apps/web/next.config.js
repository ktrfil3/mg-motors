const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Trata dependências no monorepo para serveless do Vercel
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },

  // Transpila os pacotes do monorepo
  transpilePackages: ['@troller/ui', '@troller/config'],

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.troller.com.br' },
      { protocol: 'http', hostname: 'localhost' },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Variáveis de ambiente expostas ao cliente
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
  },

  // Headers de segurança
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)',
          },
        ],
      },
    ]
  },

  // Webpack para Three.js
  webpack(config) {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: 'asset/resource',
    })
    return config
  },
}

module.exports = nextConfig
