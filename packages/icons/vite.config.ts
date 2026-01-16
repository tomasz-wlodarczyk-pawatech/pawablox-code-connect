import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src/**/*'],
      exclude: ['**/*.test.ts', '**/*.test.tsx', '**/*.stories.tsx'],
      rollupTypes: true,
      outDir: 'dist',
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        loadPaths: [resolve(__dirname, '../tokens')],
      },
    },
  },
  resolve: {
    alias: {
      '@tomasz-wlodarczyk-pawatech/tokens': resolve(__dirname, '../tokens'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'clsx'],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        assetFileNames: 'styles/[name][extname]',
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
  },
});
