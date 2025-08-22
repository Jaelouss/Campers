import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "@svgr/rollup";

export default defineConfig({
  plugins: [react(), svgr({ icon: true })],
  resolve: {
    alias: {
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@assets": "/src/assets",
      "@constants": "/src/constants",
      "@UI": "/src/components/UI",
      "@type": "/src/types",
      "@api": "/src/api/campersApi.ts",
      "@store": "/src/store/",
      "@hooks": "/src/hooks/",
      "@utils": "/src/utils/",
    },
  },
});
