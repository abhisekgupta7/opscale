import {
  uuid,
  varchar,
  timestamp,
  pgTable,
  integer,
  index,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const usersTable = pgTable("users", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  passwordHash: varchar({ length: 255 }),
  image: varchar({ length: 255 }),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});

export const organizationsTable = pgTable("organizations", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar({ length: 255 }).notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});

export const membershipsTable = pgTable("memberships", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: uuid()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  organizationId: uuid()
    .notNull()
    .references(() => organizationsTable.id, { onDelete: "cascade" }),
  role: varchar({ length: 50 }).notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});

export const subscriptionsTable = pgTable("subscriptions", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  organizationId: uuid()
    .notNull()
    .unique() // 🔥 one subscription per org
    .references(() => organizationsTable.id, { onDelete: "cascade" }),

  plan: varchar({ length: 50 }).notNull().default("FREE"), // FREE | PRO

  status: varchar({ length: 50 }).notNull().default("ACTIVE"), // ACTIVE | INACTIVE | PAST_DUE

  currentPeriodEnd: timestamp(), // nullable for FREE plan

  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});

export const paymentsTable = pgTable("payments", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  organizationId: uuid()
    .notNull()
    .references(() => organizationsTable.id, { onDelete: "cascade" }),

  userId: uuid()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),

  // 🔥 provider abstraction
  provider: varchar({ length: 50 }).notNull().default("MANUAL"), // MANUAL | ESewa

  // 🔥 payment identifier
  pidx: varchar({ length: 255 }).unique(), // nullable for manual

  // 💰 amount in paisa
  amount: integer().notNull(),

  currency: varchar({ length: 10 }).notNull().default("NPR"),

  // 🔥 status lifecycle
  status: varchar({ length: 50 }).notNull().default("PENDING"), // PENDING | VERIFIED | REJECTED | COMPLETED

  // 📸 manual payment proof
  proofUrl: varchar({ length: 255 }), // screenshot

  reference: varchar({ length: 255 }), // txn id (optional)

  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});

export const paymentsOrgIdx = index("payments_org_idx").on(
  paymentsTable.organizationId,
);
export const paymentsUserIdx = index("payments_user_idx").on(
  paymentsTable.userId,
);
