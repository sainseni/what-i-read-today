import { pg } from "@lucia-auth/adapter-postgresql";
import { github } from "@lucia-auth/oauth/providers";
import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import * as context from "next/headers";
import { cache } from "react";
import { z } from "zod";

import { neonPool } from "~/src/lib/db";
import { env } from "~/src/lib/env";

export const auth = lucia({
  env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
  middleware: nextjs_future(), // NOT nextjs()
  sessionCookie: {
    expires: false,
  },
  adapter: pg(neonPool, {
    user: "auth_user",
    key: "user_key",
    session: "user_session",
  }),
  getUserAttributes: (data) => {
    return {
      username: data.username,
      avatar: data.avatar,
    };
  },
});

export const githubAuth = github(auth, {
  clientId: env.GITHUB_CLIENT_ID,
  clientSecret: env.GITHUB_CLIENT_SECRET,
});

export type Auth = typeof auth;

export const getPageSession = cache(async () => {
  const authRequest = auth.handleRequest("GET", context);

  const schema = z.object({
    user: z.object({
      username: z.string(),
      avatar: z.string(),
      userId: z.string(),
    }),
    sessionId: z.string(),
    activePeriodExpiresAt: z.date(),
    idlePeriodExpiresAt: z.date(),
    state: z.enum(["active", "idle"]),
    fresh: z.boolean(),
  });

  type Session = z.infer<typeof schema>;

  return authRequest.validate() as Promise<Session>;
});
