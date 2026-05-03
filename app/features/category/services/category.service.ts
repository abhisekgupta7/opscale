import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { categoriesTable } from "@/lib/db/schema";
import { type CategorySchema } from "../types/category.types";

/**
 * Check if a category with the given name exists in the organization
 */
export async function checkExistingCategoryByName(
  name: string,
  organizationId: string,
) {
  const existing = await db
    .select()
    .from(categoriesTable)
    .where(
      and(
        eq(categoriesTable.organizationId, organizationId),
        eq(categoriesTable.name, name.trim()),
      ),
    )
    .limit(1);
  return existing;
}

/**
 * Check if a category name is already taken, excluding a specific category ID
 */
export async function checkDuplicateCategoryName(
  name: string,
  organizationId: string,
  excludeCategoryId: string,
) {
  const duplicate = await db
    .select()
    .from(categoriesTable)
    .where(
      and(
        eq(categoriesTable.organizationId, organizationId),
        eq(categoriesTable.name, name.trim()),
      ),
    )
    .limit(1);

  return duplicate.length > 0 && duplicate[0].id !== excludeCategoryId
    ? duplicate
    : [];
}

/**
 * Get a category by ID and verify it belongs to the organization
 */
export async function getCategoryByIdAndOrg(
  categoryId: string,
  organizationId: string,
) {
  const category = await db
    .select()
    .from(categoriesTable)
    .where(
      and(
        eq(categoriesTable.id, categoryId),
        eq(categoriesTable.organizationId, organizationId),
      ),
    )
    .limit(1);

  return category;
}

/**
 * Create a new category in the database
 */
export async function createCategoryInDb(data: Record<string, any>) {
  const result = await db.insert(categoriesTable).values(data).returning();
  return result;
}

/**
 * Update an existing category in the database
 */
export async function updateCategoryInDb(
  categoryId: string,
  updateData: Record<string, any>,
): Promise<CategorySchema[]> {
  const result = await db
    .update(categoriesTable)
    .set(updateData)
    .where(eq(categoriesTable.id, categoryId))
    .returning();

  return result;
}

/**
 * Get all categories for an organization
 */
export async function getCategoriesByOrg(
  organizationId: string,
): Promise<(typeof categoriesTable.$inferSelect)[]> {
  const categories = await db
    .select()
    .from(categoriesTable)
    .where(eq(categoriesTable.organizationId, organizationId));

  return categories;
}

/**
 * Delete a category
 */
export async function deleteCategoryFromDb(categoryId: string) {
  const result = await db
    .delete(categoriesTable)
    .where(eq(categoriesTable.id, categoryId))
    .returning();

  return result;
}
