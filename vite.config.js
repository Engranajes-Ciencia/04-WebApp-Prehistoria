import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: '/04-WebApp-Prehistoria/',
  server: {
    fs: {
      // 🔐 Reforzar seguridad: evitar que se lean archivos fuera del directorio del proyecto
      strict: true,
      deny: [".."], // niega acceso a rutas padres
    },
    port: 3000, // Cambia si usas otro puerto
    open: true, // Abre el navegador automáticamente
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
