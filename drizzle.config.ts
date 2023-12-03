import type { Config } from "drizzle-kit";

import { env } from "~/src/lib/env";

export default {
  schema: "./src/lib/db/schema",
  out: "./src/lib/db/migrations",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
  driver: "pg",
} satisfies Config;
