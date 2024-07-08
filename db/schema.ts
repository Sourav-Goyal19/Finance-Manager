import {
  pgTable,
  text,
  timestamp,
  varchar,
  uuid,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  image: text("image"),
  password: varchar("password", { length: 255 }),
  otp: varchar("otp", { length: 6 }),
  otpExpiry: timestamp("otpExpiry"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const accountsTable = pgTable("accounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertAccountSchema = createInsertSchema(accountsTable);
