import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root: '.',
  publicDir: 'public',

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/scripts/components'),
      '@services': resolve(__dirname, 'src/scripts/services'),
      '@core': resolve(__dirname, 'src/scripts/core'),
      '@config': resolve(__dirname, 'src/scripts/config'),
      '@types': resolve(__dirname, 'src/types'),
      '@data': resolve(__dirname, 'src/data'),
      '@styles': resolve(__dirname, 'src/styles'),
    },
  },

  build: {
    outDir: 'dist',
    sourcemap: true,
    target: 'es2022',
  },

  server: {
    port: 3000,
    open: true,
  },
});
