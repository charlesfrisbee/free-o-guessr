export const dynamic = "force-dynamic"; // disable build-time prerender

import GameView from "@/components/GameView";
import { panorama } from "@/db/schema";
import { getDb } from "@/lib/db";

export default async function Home() {
  const db = await getDb(); // now runs at request-time on edge
  const rows = await db.select().from(panorama).all();

  console.log(rows);

  return (
    <main className="h-screen">
      <GameView />
    </main>
  );
}
