import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

function vendorChunk(id) {
  if (!id.includes("node_modules")) return undefined;

  /* Three/WebGL reste totalement hors du bundle d'accueil grâce aux routes lazy. */
  if (id.includes("/three/") || id.includes("/@react-three/")) {
    return "vendor-three";
  }

  if (id.includes("/framer-motion/")) return "vendor-motion";
  if (id.includes("/styled-components/")) return "vendor-styled";
  if (id.includes("/lucide-react/")) return "vendor-icons";
  if (id.includes("/react-router") || id.includes("/@remix-run/")) {
    return "vendor-router";
  }
  if (
    id.includes("/react/") ||
    id.includes("/react-dom/") ||
    id.includes("/scheduler/")
  ) {
    return "vendor-react";
  }

  return undefined;
}

export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    /* On garde le seuil Vite : s'il revient, il signale un vrai gros chunk. */
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: vendorChunk,
      },
    },
  },
});
