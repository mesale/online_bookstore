import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
<<<<<<< HEAD
=======
import process from "node:process";
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_PROXY_TARGET || "http://localhost:8087",
          changeOrigin: true,
        },
      },
    },
  };
});
