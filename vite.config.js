import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: 'APJ Quotation',
        short_name: 'APJ Quotation',
        description: 'Jewllers Application',
        theme_color: '#000000',
        icons: [
          {
            src: 'icon192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icon512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable', // for Android splash screen
          },
        ],
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },

      devOptions: {
        enabled: true,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    }),
  ],
});
