import { and, desc, eq } from "drizzle-orm";

import { dbPool } from "~/src/lib/db";
import dbSchema from "~/src/lib/db/schema";

export const dynamic = "force-dynamic"; // defaults to force-static

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;

  const data = await dbPool
    .select({
      title: dbSchema.link.title,
      description: dbSchema.link.description,
      url: dbSchema.link.url,
      updatedAt: dbSchema.link.updatedAt,
      createdAt: dbSchema.link.createdAt,
    })
    .from(dbSchema.link)
    .where(and(eq(dbSchema.link.userId, id), eq(dbSchema.link.isPublic, true)))
    .orderBy(desc(dbSchema.link.createdAt));

  return Response.json({ data });
}
