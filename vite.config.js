import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/", // Root deployment; change to "/<repo-name>/" for sub-path hosting
  plugins: [react()],
  build: {
    modulePreload: {
      resolveDependencies: (filename, deps) => {
        // Never preload three-vendor or DesktopHomePage on initial load (only load lazily on desktop 3D)
        return deps.filter(
          (dep) => !dep.includes("three-vendor") && !dep.includes("DesktopHomePage")
        );
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("node_modules/three") ||
            id.includes("node_modules/@react-three") ||
            id.includes("node_modules/maath")
          ) {
            return "three-vendor";
          }
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/react-dom") ||
            id.includes("node_modules/react-router-dom") ||
            id.includes("node_modules/scheduler")
          ) {
            return "react-vendor";
          }
          if (id.includes("node_modules/framer-motion")) {
            return "motion-vendor";
          }
        },
      },
    },
    target: "es2020",
  },
  server: {
    open: false,
  },
});
