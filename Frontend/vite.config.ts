import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/foods": "http://localhost:8001",
      "/drinks": "http://localhost:8001",
      "/login": "http://localhost:8001",
      "/logout": "http://localhost:8001",
      "/verify-token": "http://localhost:8001",
      "/accounts": "http://localhost:8001",
      "/confirm-order": "http://localhost:8001",
      "/order-list": "http://localhost:8001",
    },
  },
});
