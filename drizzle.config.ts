// drizzle.config.ts
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle/migrations",

  // D1 uses the SQLite dialect, so pick a SQLite-class driver.
  // Any of these work: "sqlite", "better-sqlite3", "libsql", "turso".
  // If you plan to introspect a local file, point dbCredentials.url at it.
  dialect: "sqlite",

  dbCredentials: {
    /** Path to a throw-away local file for drizzle-kit’s internal connection.
     *  It isn’t used by Cloudflare – only by the CLI while generating SQL. */
    url: "file:./local.db",
  },
} satisfies Config;
