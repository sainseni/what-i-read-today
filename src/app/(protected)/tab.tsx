"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Tab() {
  const menus = [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Settings",
      href: "/settings",
    },
  ];

  const pathname = usePathname();

  return (
    <div className="border-b-2 pb-2">
      <div className="px-3 md:px-10">
        <div className="space-x-8">
          {menus.map((menu) => (
            <Link
              key={menu.href}
              href={menu.href}
              className={`${
                pathname === menu.href ? "border-danger-600 border-b-2" : ""
              } pb-[10px]`}
            >
              {menu.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
