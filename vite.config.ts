/// <reference types="vite/client" />
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

const isCloudflareBuild = process.env.CLOUDFLARE === "true";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  server: {
    host: "127.0.0.1",
    port: 8080,
    strictPort: true,
    hmr: { host: "127.0.0.1", port: 8080 },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    ...(isCloudflareBuild ? [cloudflare({ viteEnvironment: { name: "ssr" } })] : [nitro()]),
    tanstackStart(),
    tailwindcss(),
    viteReact(),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          if (
            id.includes("/node_modules/react/") ||
            id.includes("/node_modules/react-dom/") ||
            id.includes("/node_modules/scheduler/")
          ) {
            return "vendor-react";
          }

          if (id.includes("/node_modules/@tanstack/")) {
            return "vendor-tanstack";
          }

          if (id.includes("/node_modules/lucide-react/")) {
            return "vendor-icons";
          }

          if (
            id.includes("/node_modules/date-fns/") ||
            id.includes("/node_modules/lodash/") ||
            id.includes("/node_modules/recharts/") ||
            id.includes("/node_modules/d3-")
          ) {
            return "vendor-utils";
          }

          return "vendor-others";
        },
      },
      checks: {
        moduleLevelDirective: false,
      },
    },
  },
});