// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://larsgraubner.com",

  fonts: [
    {
      provider: fontProviders.local(),
      name: "Inter",
      cssVariable: "--font-inter",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/inter-latin.woff2"],
            weight: "300 600",
            style: "normal",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Source Serif 4",
      cssVariable: "--font-source-serif",
      fallbacks: ["Georgia", "serif"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/source-serif-4-600-latin.woff2"],
            weight: 600,
            style: "normal",
          },
        ],
      },
    },
  ],

  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
});
