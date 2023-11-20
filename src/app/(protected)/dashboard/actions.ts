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

  const schema = z.object({
    url: z.string().url(),
    visibility: z.enum(["public", "private"]).default("public"),
    category: z.string().optional(),
  });

  const parsed = schema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    return {
      status: "error",
      message: "Invalid form data",
    };
  }

  const { url, visibility, category } = parsed.data;

  const metaData = await getMetaData(url);

  const title =
    metaData.title || metaData["og:title"] || metaData["twitter:title"];

  const description =
    metaData.description ||
    metaData["og:description"] ||
    metaData["twitter:description"];

  if (!title) {
    return {
      status: "error",
      message: "Could not find title",
    };
  }

  if (!description) {
    return {
      status: "error",
      message: "Could not find description",
    };
  }

  const input = await dbPool
    .insert(dbSchema.link)
    .values({
      description: description as string,
      title: title as string,
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
  try {
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
  } catch (error) {

    if (error instanceof Error) {
      return {
        status: "error",
        message: error.message,
      };
    }

    return {
      status: "error",
      message: "Unknown error"
    };
  }
}
