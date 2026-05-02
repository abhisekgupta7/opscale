import {
  uuid,
  varchar,
  timestamp,
  pgTable,
  integer,
  index,
  unique,
  type AnyPgColumn,
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
  name: varchar({ length: 255 }).notNull().unique(),
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

export const paymentsTable = pgTable(
  "payments",
  {
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
  },
  (table) => ({
    paymentsOrgIdx: index("payments_org_idx").on(table.organizationId),
    paymentsUserIdx: index("payments_user_idx").on(table.userId),
  }),
);

export const categoriesTable = pgTable("categories", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  organizationId: uuid()
    .notNull()
    .references(() => organizationsTable.id, { onDelete: "cascade" }),
  name: varchar({ length: 255 }).notNull(),
  parentId: uuid().references((): AnyPgColumn => categoriesTable.id, {
    onDelete: "cascade",
  }),
  categoryPhoto: varchar({ length: 255 }),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});

export const productsTable = pgTable(
  "products",
  {
    id: uuid()
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    organizationId: uuid()
      .notNull()
      .references(() => organizationsTable.id, { onDelete: "cascade" }),
    name: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 1000 }),
    price: integer().notNull(), // price in paisa
    categoryId: uuid().references(() => categoriesTable.id, {
      onDelete: "set null",
    }),
    imageUrl: varchar({ length: 500 }), // ImageKit URL
    stock: integer().notNull().default(0),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
  },
  (table) => ({
    productsOrgNameIdx: index("products_org_name_idx").on(
      table.organizationId,
      table.name,
    ),
    uniqueProductPerOrg: unique("unique_product_per_org").on(
      table.organizationId,
      table.name,
    ),
  }),
);

export const ordersTable = pgTable("orders", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  organizationId: uuid()
    .notNull()
    .references(() => organizationsTable.id, { onDelete: "cascade" }),
  customerId: uuid()
    .notNull()
    .references(() => customerTable.id, { onDelete: "cascade" }),
  totalAmount: integer().notNull(), // in paisa
  status: varchar({ length: 50 }).notNull().default("PENDING"), // PENDING | COMPLETED | CANCELLED
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});

export const orderItemsTable = pgTable("order_items", {
  id: uuid()
    .primaryKey() 
    .default(sql`gen_random_uuid()`),
  orderId: uuid() 
    .notNull()
    .references(() => ordersTable.id, { onDelete: "cascade" }),
  productId: uuid()
    .notNull()
    .references(() => productsTable.id, { onDelete: "cascade" }),
  quantity: integer().notNull().default(1),
  price: integer().notNull(), // price in paisa
});

export const customerTable = pgTable("customers", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  organizationId: uuid()
    .notNull()  
    .references(() => organizationsTable.id, { onDelete: "cascade" }),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 20 }),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});