import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve, join } from "path";

const root = process.cwd();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: false,
    outDir: join(root, "dist"),
    lib: {
      formats: ["iife"],
      entry: resolve(__dirname, "./background.ts"),
      name: "Vite/React/TailwindCSS Plugin",
    },
    rollupOptions: {
      output: {
        entryFileNames: "background.global.js",
        extend: true,
      },
    },
  },
});
