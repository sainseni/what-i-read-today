import { TRPCError } from "@trpc/server";

import getMetaData from "metadata-scraper";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/src/server/api/trpc";
import { prisma } from "~/src/server/db";

export const linkRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ link: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { link } = input;

      const meta = await getMetaData(link);

      if (!meta.title || !meta.description)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Error getting metadata",
        });

      const result = await prisma.link.create({
        data: {
          userId: ctx.session.user.id,
          url: link,
          title: meta.title,
          description: meta.description,
        },
      });

      return result;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        link: z.string(),
        title: z.string(),
        description: z.string(),
        categoryId: z.array(z.string()),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { id, link, title, description, categoryId } = input;

      const result = await prisma.link.update({
        where: { id },
        data: {
          userId: ctx.session.user.id,
          url: link,
          title: title,
          description: description,
          category: {
            connect: categoryId.map((ctg) => ({ id: ctg })),
          },
        },
      });

      return result;
    }),
});
