import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT: For GitHub Pages, base must match your repo name.
// Repo: laurandreea10.github.io/clientops/  →  base: "/clientops/"
// If you rename the repo, update this value.
export default defineConfig({
  plugins: [react()],
  base: "/clientops/",
  build: {
    outDir: "dist",
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
});
