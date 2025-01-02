import { defineConfig } from 'vite';

/** @type { import('vite').UserConfig } */
export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: './public/index.html',
      copy: {
        targets: [
          { src: 'public', dest: 'dist' },
        ]
      }
    },
  },
  server: {
    open: '/index.html',
    port: 3000,
    host: '0.0.0.0'
  }
})