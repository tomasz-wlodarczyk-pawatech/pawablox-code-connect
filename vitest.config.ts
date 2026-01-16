import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['packages/**/src/**/*.test.{ts,tsx}'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules', '**/*.stories.tsx', '**/*.figma.tsx', '**/dist/**'],
    },
  },
  resolve: {
    alias: {
      '@tomasz-wlodarczyk-pawatech/tokens': resolve(__dirname, 'packages/tokens'),
      '@tomasz-wlodarczyk-pawatech/components': resolve(__dirname, 'packages/components/src'),
    },
  },
});
