"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import getMetaData from "url-metadata";
import { z } from "zod";

import { getPageSession } from "~/src/lib/auth";
import { dbPool } from "~/src/lib/db";
import dbSchema from "~/src/lib/db/schema";
import type { ServerAction } from "~/src/lib/types";

export async function addLink(formData: FormData): ServerAction {
  const session = await getPageSession();

  console.log(Object.fromEntries(formData.entries()));

  const schema = z.object({
    url: z.string().url(),
    visibility: z.enum(["public", "private"]).default("public"),
    category: z.string().optional(),
  });

  const { url, visibility, category } = schema.parse(
    Object.fromEntries(formData.entries()),
  );

  const metaData = await getMetaData(url);

  if (!metaData.title || !metaData.description) {
    return {
      status: "error",
      message: "Error getting metadata",
    };
  }

  const input = await dbPool
    .insert(dbSchema.link)
    .values({
      description: metaData.description as string,
      title: metaData.title as string,
      url: url,
      userId: session.user.userId,
      isPublic: visibility === "public",
    })
    .returning();

  revalidatePath("/dashboard");

  return {
    status: "success",
  };
}

export async function deleteLink(linkId: string): ServerAction {
  const session = await getPageSession();

  const action = await dbPool
    .delete(dbSchema.link)
    .where(
      and(
        eq(dbSchema.link.id, linkId),
        eq(dbSchema.link.userId, session.user.userId),
      ),
    )
    .execute();

  revalidatePath("/dashboard");

  return {
    status: "success",
  };
}
