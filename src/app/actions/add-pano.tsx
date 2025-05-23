"use server";

import { panorama } from "@/db/schema";
import { getDb } from "@/lib/db";
import { AddPanoInput, AddPanoSchema } from "@/schemas/panorama";
import { eq } from "drizzle-orm";

export async function addPano(addPanoInput: AddPanoInput) {
  const addPanoParsedInput = AddPanoSchema.parse(addPanoInput);

  const db = await getDb();
  const { googlePanoId } = addPanoParsedInput;

  const [existing] = await db
    .select()
    .from(panorama)
    .where(eq(panorama.googlePanoId, googlePanoId));

  if (existing) {
    throw new Error("Panorama already exists");
  }

  await db.insert(panorama).values(addPanoParsedInput);
}
