import { panorama } from "@/db/schema";
import { env } from "cloudflare:test";
import { drizzle } from "drizzle-orm/d1";
import { expect, it } from "vitest";

it("can write & read D1", async () => {
  const db = drizzle(env.DB, { schema: { panorama } });
  await db.insert(panorama).values({ lat: 1, lng: 2, googlePanoId: "3" });
  await db.insert(panorama).values({ lat: 2, lng: 2, googlePanoId: "abcd" });

  const results = await db.select().from(panorama).orderBy(panorama.id).all();
  console.log(results);
  expect(results).toHaveLength(2);
  expect(results[0].lat).toBe(1);
  expect(results[0].lng).toBe(2);
  expect(results[0].googlePanoId).toBe("3");
  expect(results[1].lat).toBe(2);
  expect(results[1].googlePanoId).toBe("abcd");
});
