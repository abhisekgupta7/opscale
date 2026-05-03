import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { customerTable } from "@/lib/db/schema";
import { type CustomerSchema } from "../types/customer.types";

/**
 * Check if a customer with the given email exists in the organization
 */
export async function checkExistingCustomerByEmail(
  email: string,
  organizationId: string,
) {
  const existing = await db
    .select()
    .from(customerTable)
    .where(
      and(
        eq(customerTable.organizationId, organizationId),
        eq(customerTable.email, email.toLowerCase().trim()),
      ),
    )
    .limit(1);
  return existing;
}

/**
 * Check if a customer email is already taken, excluding a specific customer ID
 */
export async function checkDuplicateCustomerEmail(
  email: string,
  organizationId: string,
  excludeCustomerId: string,
) {
  const duplicate = await db
    .select()
    .from(customerTable)
    .where(
      and(
        eq(customerTable.organizationId, organizationId),
        eq(customerTable.email, email.toLowerCase().trim()),
      ),
    )
    .limit(1);

  return duplicate.length > 0 && duplicate[0].id !== excludeCustomerId
    ? duplicate
    : [];
}

/**
 * Get a customer by ID and verify it belongs to the organization
 */
export async function getCustomerByIdAndOrg(
  customerId: string,
  organizationId: string,
) {
  const customer = await db
    .select()
    .from(customerTable)
    .where(
      and(
        eq(customerTable.id, customerId),
        eq(customerTable.organizationId, organizationId),
      ),
    )
    .limit(1);

  return customer;
}

/**
 * Create a new customer in the database
 */
export async function createCustomerInDb(data: Record<string, any>): Promise<CustomerSchema[]> {
  const result = await db.insert(customerTable).values(data).returning();
  return result;
}

/**
 * Update an existing customer in the database
 */
export async function updateCustomerInDb(
  customerId: string,
  updateData: Record<string, any>,
): Promise<CustomerSchema[]> {
  const result = await db
    .update(customerTable)
    .set(updateData)
    .where(eq(customerTable.id, customerId))
    .returning();

  return result;
}

/**
 * Get all customers for an organization
 */
export async function getCustomersByOrg(
  organizationId: string,
): Promise<(typeof customerTable.$inferSelect)[]> {
  const customers = await db
    .select()
    .from(customerTable)
    .where(eq(customerTable.organizationId, organizationId));

  return customers;
}

/**
 * Delete a customer from the database
 */
export async function deleteCustomerFromDb(customerId: string): Promise<CustomerSchema[]> {
  const result = await db
    .delete(customerTable)
    .where(eq(customerTable.id, customerId))
    .returning();

  return result;
}

/**
 * Get a customer by ID
 */
export async function getCustomerById(_id: string): Promise<CustomerSchema[]> {
  const customer = await db
    .select()
    .from(customerTable)
    .where(eq(customerTable.id, _id))
    .limit(1);

  return customer;
}
