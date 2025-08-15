import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/roll-craft/", // Add base URL for GitHub Pages
  server: {
    host: true,
    port: 5173,
  },
});
