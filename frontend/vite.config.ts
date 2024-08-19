import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
  build: {
    outDir: 'dist',
    copyPublicDir: true,
  },
  base: './',
  envDir: 'root',
  envPrefix: 'VITE_',
  appType: 'spa'
});
