import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://www.olliepinto.com",
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
