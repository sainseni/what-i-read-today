import path from "path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()], // eslint-disable-line
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "dotenv/config",
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "."),
    },
  },
});
