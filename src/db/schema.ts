// src/db/schema.ts
import { sql } from "drizzle-orm";
import { integer, real, sqliteTable } from "drizzle-orm/sqlite-core";

export const panorama = sqliteTable("panorama", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  lat: real("lat").notNull(),
  lng: real("lng").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(strftime('%s','now') * 1000)`), // <- ms epoch
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(strftime('%s','now') * 1000)`),
  googlePanoId: integer("map_id").notNull(),
});
