// vitest.ui.config.ts
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    include: ["tests/unit/ui/**/*.spec.*"],
    environment: "jsdom",
    setupFiles: "tests/unit/ui/setupTests.ts",
  },
});
