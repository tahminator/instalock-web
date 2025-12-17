import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3050",
        changeOrigin: true,
      },
    },
  },
  publicDir: "../../packages/ui/public",
  resolve: {
    alias: {
      "@instalock/ui": path.resolve(__dirname, "../../packages/ui/"),
      "@tabler/icons-react": "@tabler/icons-react/dist/esm/icons/index.mjs",
    },
  },
});
