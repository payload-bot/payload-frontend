import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  fonts: [
    {
      name: "Roboto",
      cssVariable: "--font-roboto",
      provider: fontProviders.fontsource(),
    },
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
