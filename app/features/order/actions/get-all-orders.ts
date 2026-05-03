"use server";

import { and, desc, eq, ilike } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { customerTable, ordersTable } from "@/lib/db/schema";
import { getActiveOrgId } from "@/app/features/auth/services/org-context.service";

export async function getAllOrdersForOrg(searchTerm?: string) {
  try {
    const organizationId = await getActiveOrgId();

    if (!organizationId) {
      return {
        success: false,
        message: "Unauthorized",
        orders: [],
      };
    }

    const normalizedSearch = searchTerm?.trim();

    const whereClause = normalizedSearch
      ? and(
          eq(ordersTable.organizationId, organizationId),
          ilike(customerTable.name, `%${normalizedSearch}%`),
        )
      : eq(ordersTable.organizationId, organizationId);

    const orders = await db
      .select({
        id: ordersTable.id,
        customerId: ordersTable.customerId,
        customerName: customerTable.name,
        totalAmount: ordersTable.totalAmount,
        status: ordersTable.status,
        createdAt: ordersTable.createdAt,
      })
      .from(ordersTable)
      .innerJoin(customerTable, eq(ordersTable.customerId, customerTable.id))
      .where(whereClause)
      .orderBy(desc(ordersTable.createdAt));

    return {
      success: true,
      orders,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch orders",
      orders: [],
    };
  }
}
