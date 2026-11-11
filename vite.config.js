import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { LOADER_CSS, LOADER_INNER_HTML, LOADER_ROUTES } from "./src/components/shared/loaderShared.js";

function syncLoaderPlugin() {
  return {
    name: "sync-loader-html",
    transformIndexHtml(html) {
      const routesVal = JSON.stringify(LOADER_ROUTES);
      let res = html;
      res = res.replace(/var allowedRoutes = .*?;/, `var allowedRoutes = ${routesVal};`);
      res = res.replace(
        /<style id="critical-loader-css">[\s\S]*?<\/style>/,
        `<style id="critical-loader-css">${LOADER_CSS}</style>`
      );
      res = res.replace(
        /<div id="app-loader"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/,
        `<div id="app-loader" role="status" aria-label="Loading">${LOADER_INNER_HTML}</div>`
      );
      return res;
    },
  };
}

export default defineConfig({
  base: "/", // Root deployment; change to "/<repo-name>/" for sub-path hosting
  plugins: [react(), syncLoaderPlugin()],
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
