import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { escapeHtml, renderGuide } from './src/guide-render.js';

export default defineConfig({
  base: './',
  plugins: [
    {
      name: 'registration-guide',
      transformIndexHtml: {
        order: 'pre',
        handler(html) {
          if (!html.includes('<!-- guide-content -->')) return html;
          const content = JSON.parse(
            readFileSync(new URL('./src/contenu.json', import.meta.url), 'utf8')
          );
          return html
            .replace('__GUIDE_TITLE__', () => escapeHtml(content.guideInscription.meta.titre))
            .replace('__GUIDE_DESCRIPTION__', () =>
              escapeHtml(content.guideInscription.meta.description)
            )
            .replace('<!-- guide-content -->', () => renderGuide(content));
        },
      },
      handleHotUpdate({ file, server }) {
        if (file.endsWith('/src/contenu.json')) {
          server.ws.send({ type: 'full-reload' });
        }
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        accueil: fileURLToPath(new URL('./index.html', import.meta.url)),
        guide: fileURLToPath(new URL('./guide-inscription.html', import.meta.url)),
      },
    },
  },
});
