import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { prisma } from "~/src/server/db";
import { linkRouter } from "~/src/server/api/routers/link";
import { TEST_USER } from "~/src/lib/constant";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  link: linkRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export const appTestCaller = appRouter.createCaller({
  session: {
    user: {
      id: TEST_USER.id,
      email: TEST_USER.email,
      name: TEST_USER.name,
    },
    expires: "9999-01-01T00:00:00.000Z",
  },
  prisma,
});
