/**
 * @vitest-environment node
 */
import { getRandomPano } from "@/actions/get-random-pano";
import { panorama } from "@/db/schema";
import { env } from "cloudflare:test";
import { drizzle } from "drizzle-orm/d1";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const db = drizzle(env.DB, { schema: { panorama } }); // a fresh DB handle
// stub getDb so getRandomPano() uses our `db`:
vi.mock("@/lib/db", () => ({
  getDb: async () => db,
}));

afterEach(async () => {
  // clear the table after each test
  await db.delete(panorama);
});

describe("getRandomPano()", () => {
  beforeEach(async () => {
    // clear the table before each test
    await db.delete(panorama).execute();
  });

  it("returns null when empty", async () => {
    const result = await getRandomPano();
    expect(result).toBeNull();
  });

  it("returns the only row when exactly one exists", async () => {
    await db
      .insert(panorama)
      .values({ lat: 10, lng: 20, googlePanoId: "only-one" });
    const result = await getRandomPano();
    expect(result).toEqual({ lat: 10, lng: 20, googlePanoId: "only-one" });
  });

  it("picks an id ≥ candidate when candidate < max", async () => {
    await db.insert(panorama).values({ lat: 1, lng: 2, googlePanoId: "a" });
    await db.insert(panorama).values({ lat: 3, lng: 4, googlePanoId: "b" });

    const spy = vi.spyOn(Math, "random").mockReturnValue(0);
    const result = await getRandomPano();
    spy.mockRestore();

    expect(result).toEqual({ lat: 3, lng: 4, googlePanoId: "b" });
  });

  it("falls back to the first row when candidate ≥ max", async () => {
    await db.insert(panorama).values({ lat: 5, lng: 6, googlePanoId: "x" });
    await db.insert(panorama).values({ lat: 7, lng: 8, googlePanoId: "y" });

    const spy = vi.spyOn(Math, "random").mockReturnValue(0.9999);
    const result = await getRandomPano();
    spy.mockRestore();

    expect(result).toEqual({ lat: 5, lng: 6, googlePanoId: "x" });
  });
});
