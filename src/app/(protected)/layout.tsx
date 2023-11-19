/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import Tab from "~/src/app/(protected)/tab";
import logoIcon from "~/src/assets/Logo.svg";
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
      <div className="flex justify-between px-3 md:px-10 py-5">
        <Link href="/dashboard">
          <div className="flex space-x-2 items-end">
            <Image src={logoIcon} alt="Logo What I Read Today" />
            <div className="md:block hidden font-semibold text-2xl">
              What I Read Today
            </div>
            <div className="block md:hidden font-semibold text-2xl">WIRT</div>
          </div>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center space-x-3 text-base">
              <div className="hidden md:block">{session.user.username}</div>
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
      <div className="px-3 md:px-10 py-5">{children}</div>
    </div>
  );
}
