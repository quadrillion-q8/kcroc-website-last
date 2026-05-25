import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { viteSourceLocator } from '@metagptx/vite-plugin-source-locator';
import { atoms } from '@metagptx/web-sdk/plugins';

function escapeHtmlAttr(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

process.env.VITE_APP_TITLE ??= process.env.OVERVIEW_TITLE ?? 'shadcnui';
process.env.VITE_APP_DESCRIPTION ??= process.env.OVERVIEW_DESCRIPTION ?? 'Atoms Generated Project';
process.env.VITE_APP_TITLE = escapeHtmlAttr(process.env.VITE_APP_TITLE);
process.env.VITE_APP_DESCRIPTION = escapeHtmlAttr(process.env.VITE_APP_DESCRIPTION);
process.env.VITE_APP_LOGO_URL ??= process.env.OVERVIEW_LOGO_URL ?? 'https://public-frontend-cos.metadl.com/mgx/img/favicon_atoms.ico';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    viteSourceLocator({
      prefix: 'mgx', // 前缀用于标识源代码位置，不能修改
    }),
    react(),
    atoms(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0', // 监听所有网络接口
    port: parseInt(process.env.VITE_PORT || '3000'),
    proxy: {
      '/api': {
        target: `http://localhost:8000`,
        changeOrigin: true,
      },
    },
    watch: { usePolling: true, interval: 600 },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
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
  },
}));
