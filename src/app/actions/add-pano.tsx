"use server";

import { panorama } from "@/db/schema";
import { getDb } from "@/lib/db";
import { AddPanoInput, AddPanoSchema } from "@/schemas/panorama";

export async function addPano(addPanoInput: AddPanoInput) {
  const addPanoParsedInput: AddPanoInput = AddPanoSchema.parse(addPanoInput);

  const db = await getDb();
  await db.insert(panorama).values(addPanoParsedInput);
}
