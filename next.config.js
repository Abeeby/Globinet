/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true, // Nécessaire pour l'export statique
  },
  output: 'export', // Active l'export statique
  trailingSlash: true, // Ajoute un slash à la fin des URLs
  distDir: 'out', // Dossier de sortie pour l'export
}

module.exports = nextConfig
