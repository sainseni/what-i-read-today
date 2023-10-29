/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import Tab from "~/src/app/(protected)/tab";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/src/components/ui/dropdown-menu";
import { getPageSession } from "~/src/lib/auth";

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "What I Read Today",
  description: "A simple app to track what you read",
};

export default async function Layout({ children }: Props) {
  const session = await getPageSession();

  if (!session) return redirect("/login");

  return (
    <div>
      <div className="flex justify-between px-10 py-5">
        <div className="font-semibold text-2xl">What I Read Today</div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center space-x-3 text-base">
              <div>{session.user.username}</div>
              <img
                className="rounded-full h-10 w-10"
                src={session.user.avatar}
                alt={`${session.user.username}'s avatar`}
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>
              <a href="/api/auth/logout">Logout</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Tab />
      <div className="px-10 py-5">{children}</div>
    </div>
  );
}
