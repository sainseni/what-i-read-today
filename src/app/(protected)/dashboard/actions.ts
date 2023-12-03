"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { useForm } from "react-hook-form";
import getMetaData from "url-metadata";
import { z } from "zod";

import type {
  AddLinkSchema,
  UpdateLinkSchema,
} from "~/src/app/(protected)/dashboard/schema";
import {
  addLinkSchema,
  updateLinkSchema,
} from "~/src/app/(protected)/dashboard/schema";
import { getPageSession } from "~/src/lib/auth";
import { dbPool } from "~/src/lib/db";
import dbSchema from "~/src/lib/db/schema";
import type { ServerAction } from "~/src/lib/types";

export async function addLink(data: AddLinkSchema): ServerAction {
  const session = await getPageSession();

  const parsed = addLinkSchema.safeParse(data);

  if (!parsed.success) {
    return {
      status: "error",
      message: `Invalid data: ${parsed.error.message}`,
    };
  }

  const { url, visibility } = parsed.data;

  const metaData = await getMetaData(url);

  const title =
    metaData.title || metaData["og:title"] || metaData["twitter:title"];

  const description =
    metaData.description ||
    metaData["og:description"] ||
    metaData["twitter:description"] ||
    "-";

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

export async function updateLink(data: UpdateLinkSchema): ServerAction {
  const session = await getPageSession();

  console.log(data);

  const parsed = updateLinkSchema.safeParse(data);

  if (!parsed.success) {
    return {
      status: "error",
      message: `Invalid data: ${parsed.error.message}`,
    };
  }

  const { url, visibility, id, description, title, category } = parsed.data;

  const input = await dbPool
    .update(dbSchema.link)
    .set({
      title: title,
      description: description,
      url: url,
      isPublic: visibility === "public",
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(dbSchema.link.userId, session.user.userId),
        eq(dbSchema.link.id, id),
      ),
    )
    .returning();

  revalidatePath(`/dashboard/${id}/edit`);
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
      message: "Unknown error",
    };
  }
}
