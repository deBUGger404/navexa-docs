import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  // Dev: serve at `/` so local URLs look like `http://localhost:5173/docs/overview`.
  // Build: keep `/navexa-doc/` for GitHub Pages (repo pages) deployment.
  base: command === "serve" ? "/" : "/navexa-doc/",
  plugins: [react()],
  server: {
    host: true,
    port: 5173
  }
}));
