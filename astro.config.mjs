import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Troque pela URL pública do site antes do deploy.
  site: "https://helena-template.pages.dev",
  integrations: [sitemap({ filter: (page) => !page.includes("/admin") })],
  output: "static",
  prefetch: {
    prefetchAll: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
