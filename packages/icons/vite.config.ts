import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: [resolve(__dirname, '../tokens')],
      },
    },
  },
  resolve: {
    alias: {
      '@pawablox/tokens': resolve(__dirname, '../tokens'),
    },
  },
});
