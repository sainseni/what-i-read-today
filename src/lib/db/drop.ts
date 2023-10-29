import { r } from "vitest/dist/reporters-5f784f42";

import { dbHttp, dbPool, neonHttp } from "~/src/lib/db";
import schema from "~/src/lib/db/schema";

async function dropDatabase() {
  try {
    await neonHttp`DROP TABLE IF EXISTS auth_user CASCADE`;
    await neonHttp`DROP TABLE IF EXISTS user_session CASCADE`;
    await neonHttp`DROP TABLE IF EXISTS user_key CASCADE`;

    console.log("Dropped databases");
  } catch (error) {
    console.log(error);
  }
}

dropDatabase();
