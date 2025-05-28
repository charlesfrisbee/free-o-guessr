/**
 * @vitest-environment node
 */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { drizzle } from "drizzle-orm/d1";
import { panorama } from "@/db/schema";
import { env } from "cloudflare:test";
import { addPano } from "@/actions/add-pano";

const db = drizzle(env.DB, { schema: { panorama } });

// 1) Stub getDb before importing addPano
vi.mock("@/lib/db", () => ({
  getDb: async () => db,
}));

describe("addPano()", () => {
  beforeEach(async () => {
    // clear table
    await db.delete(panorama).execute();
  });

  afterEach(async () => {
    // restore any global mocks
    vi.restoreAllMocks();
  });

  it("inserts a new panorama when none exists", async () => {
    const input = { lat: 42, lng: 7, googlePanoId: "NEW123" };
    const result = await addPano(input);

    expect(result).toEqual({ success: true, existing: false });

    const rows = await db.select().from(panorama).all();
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject(input);
  });

  it("does not insert when googlePanoId already exists", async () => {
    const input = { lat: 10, lng: 20, googlePanoId: "DUPLICATE" };
    // pre-seed the table
    await addPano(input);

    const result = await addPano(input);
    expect(result).toEqual({ success: false, existing: true });

    // table still has exactly one row
    const rows = await db.select().from(panorama).all();
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject(input);
  });

  it("inserts case-sensitive distinct IDs separately", async () => {
    // if you want to assert that "abc" vs "ABC" are distinct:
    await db.insert(panorama).values({
      lat: 0,
      lng: 0,
      googlePanoId: "abc",
    });

    // use a different-cased ID
    const result = await addPano({
      lat: 1,
      lng: 1,
      googlePanoId: "ABC",
    });
    expect(result).toEqual({ success: true, existing: false });

    const rows = await db.select().from(panorama).all();
    expect(rows).toHaveLength(2);
  });
});
