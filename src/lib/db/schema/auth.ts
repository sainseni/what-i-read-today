import { relations } from "drizzle-orm";
import { bigint, pgTable, varchar } from "drizzle-orm/pg-core";

import { category, link } from "~/src/lib/db/schema/link";

export const user = pgTable("auth_user", {
  id: varchar("id", {
    length: 15, // change this when using custom user ids
  }).primaryKey(),
  username: varchar("username", {
    length: 255,
  }).notNull(),
  avatar: varchar("avatar", {
    length: 255,
  }),
});

export const userRelations = relations(user, ({ many }) => ({
  links: many(link),
  categories: many(category),
}));

export const session = pgTable("user_session", {
  id: varchar("id", {
    length: 128,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 15,
  })
    .notNull()
    .references(() => user.id),
  activeExpires: bigint("active_expires", {
    mode: "number",
  }).notNull(),
  idleExpires: bigint("idle_expires", {
    mode: "number",
  }).notNull(),
});

export const key = pgTable("user_key", {
  id: varchar("id", {
    length: 255,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 15,
  })
    .notNull()
    .references(() => user.id),
  hashedPassword: varchar("hashed_password", {
    length: 255,
  }),
});
