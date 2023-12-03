import { z } from "zod";

export const serverAction = z.discriminatedUnion("status", [
  z.object({
    status: z.literal("success"),
    data: z.any(),
  }),
  z.object({
    status: z.literal("error"),
    message: z.string(),
  }),
]);

export type ServerAction = Promise<z.infer<typeof serverAction>>;
