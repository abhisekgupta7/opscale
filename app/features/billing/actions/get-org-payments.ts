"use server";

import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { customerTable, paymentsTable } from "@/lib/db/schema";
import { getActiveOrgId } from "@/app/features/auth/services/org-context.service";

export async function getOrganizationPayments() {
  try {
    const organizationId = await getActiveOrgId();

    if (!organizationId) {
      return {
        success: false,
        message: "Unauthorized",
        payments: [],
      };
    }

    const payments = await db
      .select({
        id: paymentsTable.id,
        amount: paymentsTable.amount,
        currency: paymentsTable.currency,
        provider: paymentsTable.provider,
        status: paymentsTable.status,
        proofUrl: paymentsTable.proofUrl,
        createdAt: paymentsTable.createdAt,
        customerName: customerTable.name,
      })
      .from(paymentsTable)
      .leftJoin(customerTable, eq(paymentsTable.customerId, customerTable.id))
      .where(eq(paymentsTable.organizationId, organizationId))
      .orderBy(desc(paymentsTable.createdAt));

    return {
      success: true,
      payments,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch payments",
      payments: [],
    };
  }
}
