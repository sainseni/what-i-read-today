import { desc, eq } from "drizzle-orm";

import {
  columnsDesktop,
  columnsMobile,
} from "~/src/app/(protected)/dashboard/table/columns";
import { DataTable } from "~/src/app/(protected)/dashboard/table/data-table";
import { getPageSession } from "~/src/lib/auth";
import { dbPool } from "~/src/lib/db";
import dbSchema from "~/src/lib/db/schema";

export default async function Page() {
  const session = await getPageSession();

  const data = await dbPool
    .select()
    .from(dbSchema.link)
    .where(eq(dbSchema.link.userId, session.user.userId))
    .orderBy(desc(dbSchema.link.createdAt));

  return (
    <div>
      <div className="">
        <DataTable
          data={data}
          columnsDesktop={columnsDesktop}
          columnsMobile={columnsMobile}
        />
      </div>
    </div>
  );
}
