// app/actions/get-random-pano.ts
"use server";

import { panorama } from "@/db/schema";
import { getDb } from "@/lib/db";
import { gt, max } from "drizzle-orm";

export async function getRandomPano() {
  const startTime = Date.now();
  
  // Only import logger in non-test environments
  let logger: any = null;
  if (process.env.NODE_ENV !== 'test') {
    try {
      logger = (await import("@/lib/axiom/server")).logger;
    } catch {
      // Ignore if import fails
    }
  }
  
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
    const duration = Date.now() - startTime;
    logger?.info('Random panorama fetched', {
      action: 'panorama_fetched',
      panoramaId: row.id,
      googlePanoId: row.googlePanoId,
      location: { lat: row.lat, lng: row.lng },
      queryDuration: duration,
      queryMethod: 'random_selection',
    });
    
    return { lat: row.lat, lng: row.lng, googlePanoId: row.googlePanoId };
  }

  // 4) fallback to lowest ID (in case of gaps)
  const [first] = await db
    .select()
    .from(panorama)
    .orderBy(panorama.id)
    .limit(1);

  const duration = Date.now() - startTime;
  logger?.info('Random panorama fetched (fallback)', {
    action: 'panorama_fetched',
    panoramaId: first.id,
    googlePanoId: first.googlePanoId,
    location: { lat: first.lat, lng: first.lng },
    queryDuration: duration,
    queryMethod: 'fallback_first',
  });

  return { lat: first.lat, lng: first.lng, googlePanoId: first.googlePanoId };
}
