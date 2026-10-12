import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['apple-touch-icon.png', 'brand/flash/logo.webp'],
      manifest: {
        name: 'ASTRO Match',
        short_name: 'MATCH',
        description: 'La app de ASTRO SDQ. Tattoo Convention, Santo Domingo.',
        lang: 'es',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#0F0707',
        theme_color: '#0F0707',
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'pwa-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,webp,png,ico,ttf,otf}'],
        navigateFallback: 'index.html',
      },
    }),
  ],
})
