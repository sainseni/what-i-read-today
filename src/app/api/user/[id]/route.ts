import { and, desc, eq, like, or } from "drizzle-orm";
import { count } from "drizzle-orm";
import { type NextRequest } from "next/server";
import { z } from "zod";

import { dbPool } from "~/src/lib/db";
import dbSchema from "~/src/lib/db/schema";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } },
) {
  const { id } = context.params;
  const searchParams = request.nextUrl.searchParams;

  try {
    const limit = z.coerce.number().parse(searchParams.get("limit") ?? 10);
    const page = z.coerce.number().parse(searchParams.get("page") ?? 1);
    const search = searchParams.get("search") ?? "";

    const data = await dbPool
      .select({
        title: dbSchema.link.title,
        description: dbSchema.link.description,
        url: dbSchema.link.url,
        updatedAt: dbSchema.link.updatedAt,
        createdAt: dbSchema.link.createdAt,
      })
      .from(dbSchema.link)
      .where(
        and(
          and(eq(dbSchema.link.userId, id), eq(dbSchema.link.isPublic, true)),
          or(
            like(dbSchema.link.title, `%${search}%`),
            like(dbSchema.link.description, `%${search}%`),
          ),
        ),
      )
      .orderBy(desc(dbSchema.link.createdAt))
      .limit(limit)
      .offset((page - 1) * limit);

    const [totalData] = await dbPool
      .select({ value: count() })
      .from(dbSchema.link)
      .where(
        and(
          and(eq(dbSchema.link.userId, id), eq(dbSchema.link.isPublic, true)),
          or(
            like(dbSchema.link.title, `%${search}%`),
            like(dbSchema.link.description, `%${search}%`),
          ),
        ),
      );

    if (!totalData) {
      return Response.json({
        error: "Not found",
      });
    }

    const totalPage = Math.ceil(totalData.value / limit);

    return Response.json({
      data,
      meta: {
        limit,
        page,
        totalPage,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return Response.json({
      error: error.message,
    });
  }
}
