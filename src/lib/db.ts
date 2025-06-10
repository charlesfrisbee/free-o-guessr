import { panorama } from "@/db/schema";
import { drizzle } from "drizzle-orm/d1";

export const getDb = async () => {
  try {
    const { env } = (
      await import("@opennextjs/cloudflare")
    ).getCloudflareContext();

    if (!env?.DB) {
      throw new Error("Database binding not found. Please check your Cloudflare configuration.");
    }

    const db = drizzle(env.DB, { schema: { panorama } });

    return db;
  } catch (error) {
    console.error("Failed to get database connection:", error);
    throw new Error("Unable to connect to database. Please try again later.");
  }
};
