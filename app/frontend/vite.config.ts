import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { viteSourceLocator } from '@metagptx/vite-plugin-source-locator';
import { atoms } from '@metagptx/web-sdk/plugins';

// ... (Keep your existing escapeHtmlAttr and environment logic)

export default defineConfig(({ mode }) => ({
  plugins: [
    viteSourceLocator({ prefix: 'mgx' }),
    react(),
    atoms(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: parseInt(process.env.VITE_PORT || '3000'),
    proxy: {
      '/api': { target: `http://localhost:8000`, changeOrigin: true },
    },
    watch: { usePolling: true, interval: 600 },
  },
  build: {
    // 1. Ensure production-grade minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production', // Automatically remove logs in production
        drop_debugger: mode === 'production',
      },
    },
    // 2. Rollup optimizations
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'ui-vendor': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-label',
            '@radix-ui/react-select',
            '@radix-ui/react-slot',
            '@radix-ui/react-toast',
          ],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'utils-vendor': [
            'axios',
            'clsx',
            'tailwind-merge',
            'class-variance-authority',
            'lucide-react',
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    // 3. Ensure sourcemaps are only generated for development or debugging
    sourcemap: mode !== 'production',
  },
}));
