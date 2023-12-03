import { z } from "zod";

export const updateLinkSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  url: z.string(),
  visibility: z.enum(["public", "private"]).optional(),
  category: z.string().optional(),
});

export type UpdateLinkSchema = z.infer<typeof updateLinkSchema>;

export const addLinkSchema = z.object({
  url: z.string().url(),
  visibility: z.enum(["public", "private"]).default("public"),
  // category: z.string().optional(),
});

export type AddLinkSchema = z.infer<typeof addLinkSchema>;
