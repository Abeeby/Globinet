/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
    // Utiliser unoptimized seulement pour Hostinger (export statique)
    // Pour Vercel, on laisse l'optimisation activée
    unoptimized: process.env.BUILD_TARGET === 'static',
  },
  // Configuration conditionnelle selon la cible de build
  ...(process.env.BUILD_TARGET === 'static' && {
    output: 'export',
    trailingSlash: true,
  }),
}

module.exports = nextConfig