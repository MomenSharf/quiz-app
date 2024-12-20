import * as z from "zod";

export const ProfileShema = z.object({
  name: z.string().min(2, "ma").max(50).optional(),
  username: z.string().min(2).max(50).optional(),
  imageUrl: z.string().optional(),
});

export type ProfileShemaType = z.infer<typeof ProfileShema>;
