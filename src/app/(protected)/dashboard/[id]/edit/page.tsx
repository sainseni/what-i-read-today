import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import EditPage from "~/src/app/(protected)/dashboard/[id]/edit/page-client";
import { getPageSession } from "~/src/lib/auth";
import { dbPool } from "~/src/lib/db";
import dbSchema from "~/src/lib/db/schema";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params: { id } }: Props) {
  const session = await getPageSession();

  const [data] = await dbPool
    .select()
    .from(dbSchema.link)
    .where(
      and(
        eq(dbSchema.link.userId, session.user.userId),
        eq(dbSchema.link.id, id),
      ),
    );

  if (!data) {
    notFound();
  }

  return (
    <div>
      <EditPage
        id={data.id}
        url={data.url}
        title={data.title}
        isPublic={data.isPublic}
        description={data.description}
        categoryId={data.categoryId}
      />
    </div>
  );
}
