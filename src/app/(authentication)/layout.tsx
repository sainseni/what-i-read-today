import { redirect } from "next/navigation";

import { getPageSession } from "~/src/lib/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getPageSession();

  if (session) return redirect("/dashboard");

  return <div>{children}</div>;
}
