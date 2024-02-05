import { sql } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
  real,
} from "drizzle-orm/sqlite-core";

export const users = sqliteTable(
  "users",
  {
    id: text("id").primaryKey().notNull(),
    email: text("email").notNull(),
    password: text("password").notNull(),
    firstName: text("first_name"),
    lastName: text("last_name"),
    verified: integer("verified", { mode: "boolean" }).notNull().default(false),
    avatar: text("avatar"),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (users) => ({
    emailIdx: uniqueIndex("email_idx").on(users.email),
  }),
);

export const workspaces = sqliteTable("workspaces", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
  description: text("description"),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const categories = sqliteTable("categories", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
  description: text("description"),
  type: text("type").notNull().default("expense"),
  workspaceId: text("workspace_id")
    .references(() => workspaces.id)
    .notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const accounts = sqliteTable("accounts", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
  balance: real("balance").notNull().default(0),
  workspaceId: text("workspace_id")
    .references(() => workspaces.id)
    .notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const transactions = sqliteTable("transactions", {
  id: text("id").primaryKey().notNull(),
  title: text("title").notNull(),
  note: text("note"),
  amount: real("amount").notNull(),
  paid: integer("paid", { mode: "boolean" }).notNull().default(false),
  type: text("type").notNull().default("expense"),
  categoryId: text("category_id")
    .references(() => categories.id)
    .notNull(),
  accountId: text("account_id")
    .references(() => accounts.id)
    .notNull(),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
  workspaceId: text("workspace_id")
    .references(() => workspaces.id)
    .notNull(),
  handledAt: integer("handled_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
