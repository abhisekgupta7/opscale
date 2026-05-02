import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { productsTable } from "@/lib/db/schema";
import { productSchema } from "../types/product.types";

/**
 * Check if a product with the given name exists in the organization
 */
export async function checkExistingProductByName(
  name: string,
  organizationId: string,
) {
  const existing: (typeof productSchema)[] = await db
    .select()
    .from(productsTable)
    .where(
      and(
        eq(productsTable.organizationId, organizationId),
        eq(productsTable.name, name.trim()),
      ),
    )
    .limit(1);
  return existing;
}

/**
 * Check if a product name is already taken, excluding a specific product ID
 */
export async function checkDuplicateProductName(
  name: string,
  organizationId: string,
  excludeProductId: string,
) {
  const duplicate = await db
    .select()
    .from(productsTable)
    .where(
      and(
        eq(productsTable.organizationId, organizationId),
        eq(productsTable.name, name.trim()),
      ),
    )
    .limit(1);

  return duplicate.length > 0 && duplicate[0].id !== excludeProductId
    ? duplicate
    : [];
}

/**
 * Get a product by ID and verify it belongs to the organization
 */
export async function getProductByIdAndOrg(
  productId: string,
  organizationId: string,
) {
  const product = await db
    .select()
    .from(productsTable)
    .where(
      and(
        eq(productsTable.id, productId),
        eq(productsTable.organizationId, organizationId),
      ),
    )
    .limit(1);

  return product;
}

/**
 * Insert a new product into the database (internal use)
 */
export default async function insertProduct(data: typeof productSchema) {
  const product: (typeof productsTable)[] = await db
    .insert(productsTable)
    .values(data);

  return product;
}

/**
 * Create a new product in the database with full data including organizationId
 */
export async function createProductInDb(data: Record<string, any>) {
  const result = await db.insert(productsTable).values(data).returning();
  return result;
}

/**
 * Update an existing product in the database
 */
export async function updateProductInDb(
  productId: string,
  updateData: Record<string, any>,
) {
  const result = await db
    .update(productsTable)
    .set(updateData)
    .where(eq(productsTable.id, productId))
    .returning();

  return result;
}
