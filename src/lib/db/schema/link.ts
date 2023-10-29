import { relations } from "drizzle-orm";
import {
  boolean,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { ulid } from "ulidx";

import { user } from "./auth";

export const link = pgTable("link", {
  id: varchar("id", {
    length: 26,
  })
    .primaryKey()
    .$default(ulid),
  title: varchar("title", {
    length: 255,
  }).notNull(),
  url: varchar("url", {
    length: 255,
  }).notNull(),
  description: text("description").notNull(),

  isPublic: boolean("is_public").default(true).notNull(),

  userId: varchar("user_id", {
    length: 15,
  })
    .notNull()
    .references(() => user.id),

  categoryId: varchar("category_id", {
    length: 15,
  }).references(() => category.id),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const category = pgTable("category", {
  id: varchar("id", {
    length: 15,
  }).primaryKey(),
  name: varchar("name", {
    length: 255,
  }).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const categoryRelations = relations(category, ({ many }) => ({
  links: many(link),
}));
