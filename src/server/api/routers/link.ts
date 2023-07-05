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

      const result = await ctx.prisma.link.create({
        data: {
          user: {
            connect: { email: z.string().parse(ctx.session.user.email) },
          },
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

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = input;

      const result = await prisma.link.delete({
        where: { id },
      });

      return result;
    }),

  getAll: protectedProcedure.input(z.object({})).query(async ({ ctx }) => {
    const result = await prisma.link.findMany({
      where: {
        user: {
          email: z.string().parse(ctx.session.user.email),
        },
      },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });

    return result;
  }),
});
