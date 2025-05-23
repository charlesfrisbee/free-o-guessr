import { panorama } from "@/db/schema";
import { drizzle } from "drizzle-orm/d1";

export const getDb = async () => {
  const { env } = (
    await import("@opennextjs/cloudflare")
  ).getCloudflareContext();

  const db = drizzle(env.DB, { schema: { panorama } });

  return db;
};
