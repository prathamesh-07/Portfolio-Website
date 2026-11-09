import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/", // Root deployment; change to "/<repo-name>/" for sub-path hosting
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "three-vendor": ["three", "@react-three/fiber", "@react-three/drei"],
          "motion-vendor": ["framer-motion"],
        },
      },
    },
    target: "es2020",
  },
  server: {
    open: false,
  },
});
