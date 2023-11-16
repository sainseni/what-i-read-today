"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { deleteLink } from "~/src/app/(protected)/dashboard/actions";
import { Badge } from "~/src/components/ui/badge";
import { Button } from "~/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/src/components/ui/dropdown-menu";

export type Data = {
  id: string;
  title: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
};

export const columns: ColumnDef<Data>[] = [
  {
    id: "title",
    header: "Title",
    accessorKey: "title",
    cell({ row }) {
      const link = row.original;

      return (
        <div className="space-y-1">
          <p className="font-medium">{link.title}</p>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className=" text-gray-500"
          >
            {link.url}
          </a>
        </div>
      );
    },
  },

  {
    header: "Visibility",
    accessorKey: "isPublic",
    cell({ getValue }) {
      const isPublic = getValue() as boolean;

      return (
        <Badge
          variant="default"
          className={
            isPublic
              ? "bg-vprimary-50 text-vprimary-700"
              : "bg-vprimary-700 text-vprimary-50"
          }
        >
          <div className="w-2 h-2 mr-2 rounded-full bg-current " />
          {isPublic ? "Public" : "Private"}
        </Badge>
      );
    },
  },
  {
    header: "Date",
    accessorKey: "updatedAt",
    cell({ getValue }) {
      const value = getValue() as string;

      const format = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      return <span>{format.format(new Date(value))}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const link = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(link.url)}
            >
              Copy link
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                deleteLink(link.id);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];