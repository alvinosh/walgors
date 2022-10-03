import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { ViteRsw } from 'vite-plugin-rsw';
import sveltePreprocess from 'svelte-preprocess';
// https://vitejs.dev/config/
export default defineConfig({
  base: '/walgors/',
  plugins: [
    ViteRsw(),
    svelte({
      preprocess: sveltePreprocess({
        scss: { includePaths: ['src/lib/styles/'] }
      })
    })
  ],
  build: {
    outDir: './docs'
  }
});
