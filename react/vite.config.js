import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

function htmlBaseUrlPlugin() {
  let base = '/';
  return {
    name: 'html-base-url',
    configResolved(config) {
      base = config.base || '/';
    },
    transformIndexHtml(html) {
      return html.replace(/%BASE_URL%/g, base);
    },
  };
}

export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss(), htmlBaseUrlPlugin()],
});
