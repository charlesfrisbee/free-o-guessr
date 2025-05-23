// app/actions/get-random-pano.ts
"use server";

import { panorama } from "@/db/schema";
import { getDb } from "@/lib/db";
import { gt, max } from "drizzle-orm";

export async function getRandomPano() {
  const db = await getDb();

  // 1) MAX(id)
  const [maxId] = await db.select({ value: max(panorama.id) }).from(panorama);

  if (!maxId.value) {
    return null;
  }

  // 2) pick random between 1 and maxId
  const candidate = Math.floor(Math.random() * maxId.value) + 1;

  // 3) find first row with id ≥ candidate
  const [row] = await db
    .select()
    .from(panorama)
    .where(gt(panorama.id, candidate))
    .limit(1);

  if (row) {
    return { lat: row.lat, lng: row.lng, googlePanoId: row.googlePanoId };
  }

  // 4) fallback to lowest ID (in case of gaps)
  const [first] = await db
    .select()
    .from(panorama)
    .orderBy(panorama.id)
    .limit(1);

  return { lat: first.lat, lng: first.lng, googlePanoId: first.googlePanoId };
}
