import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ command }) => ({
  // Local dev serves from root; production builds target the GitHub Pages subpath
  base: command === 'build' ? '/seafood-sifu/' : '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Seafood Sifu',
        short_name: 'Seafood Sifu',
        description:
          'Identify seafood from Singapore wet markets by photo, learn their IUCN status, how to prepare them, and the best local recipes.',
        theme_color: '#0f4c5c',
        background_color: '#f3f7f7',
        display: 'standalone',
        scope: '/seafood-sifu/',
        start_url: '/seafood-sifu/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
      },
    }),
  ],
}))
