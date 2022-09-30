import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { ViteRsw } from "vite-plugin-rsw";
import sveltePreprocess from "svelte-preprocess";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    ViteRsw(),
    svelte({
      preprocess: sveltePreprocess(),
    }),
  ],
});