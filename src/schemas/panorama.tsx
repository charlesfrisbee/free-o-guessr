// components/schemas/panorama.ts
import { z } from "zod";

export const AddPanoSchema = z.object({
  mapId: z.number().int().positive(),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});
export type AddPanoInput = z.infer<typeof AddPanoSchema>;
