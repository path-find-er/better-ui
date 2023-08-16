import { resolve, join } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const root = process.cwd();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {},
  },
  build: {
    emptyOutDir: true,
    outDir: join(root, "dist"),
    lib: {
      formats: ["iife"],
      entry: resolve(__dirname, "./index.tsx"),
      name: "Vite/React/TailwindCSS Plugin",
    },
    rollupOptions: {
      output: {
        entryFileNames: "index.global.js",
        extend: true,
      },
    },
  },
});
