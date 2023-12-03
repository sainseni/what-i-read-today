import { desc, eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import SettingsPage from "~/src/app/(protected)/settings/page-client";
import { getPageSession } from "~/src/lib/auth";
import { dbPool } from "~/src/lib/db";
import dbSchema from "~/src/lib/db/schema";

export default async function Page() {
  const isDev = process.env.NODE_ENV === "development";

  const session = await getPageSession();

  const [data] = await dbPool
    .select()
    .from(dbSchema.user)
    .where(eq(dbSchema.link.userId, session.user.userId))
    .orderBy(desc(dbSchema.link.createdAt));

  if (!data) {
    notFound();
  }

  return (
    <div>
      <SettingsPage userId={data.id} isDev={isDev} />
    </div>
  );
}
