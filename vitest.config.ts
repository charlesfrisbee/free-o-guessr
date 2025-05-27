// import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import {
  defineWorkersProject,
  readD1Migrations,
} from "@cloudflare/vitest-pool-workers/config";
import path from "node:path";

// export default defineConfig({
//   plugins: [tsconfigPaths(), react()],
//   test: {
//     environment: "jsdom",
//   },
// });

export default defineWorkersProject(async () => {
  // Read all migrations in the `migrations` directory
  const migrationsPath = path.join(__dirname, "drizzle", "migrations");
  const migrations = await readD1Migrations(migrationsPath);

  return {
    plugins: [tsconfigPaths(), react()],
    test: {
      setupFiles: ["./tests/unit/apply-migrations.ts"],
      poolOptions: {
        workers: {
          main: "./tests/unit/minimal-worker.ts",
          singleWorker: true,
          wrangler: {
            configPath: "./wrangler.jsonc",
            // environment: "production",
          },
          miniflare: {
            // Add a test-only binding for migrations, so we can apply them in a
            // setup file
            bindings: { TEST_MIGRATIONS: migrations },
          },
        },
      },
    },
  };
});
