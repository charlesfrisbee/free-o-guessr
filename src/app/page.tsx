export const dynamic = "force-dynamic"; // disable build-time prerender

import GameView from "@/components/GameView";
import { getRandomPano } from "../actions/get-random-pano";

export default async function Home() {
  const pano = await getRandomPano();

  if (!pano) return null;

  return (
    <main className="h-screen">
      <GameView pano={pano} />
    </main>
  );
}
