import { neon, neonConfig, Pool } from "@neondatabase/serverless";
import { drizzle as drizzleHttp } from "drizzle-orm/neon-http";
import { drizzle as drizzleWs } from "drizzle-orm/neon-serverless";

import { env } from "~/src/lib/env";

neonConfig.fetchConnectionCache = true;

export const neonPool = new Pool({ connectionString: env.DATABASE_URL });
export const neonHttp = neon(env.DATABASE_URL);

export const dbPool = drizzleWs(neonPool);
export const dbHttp = drizzleHttp(neonHttp);
