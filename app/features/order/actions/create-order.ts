"use server";

import { createOrderSchema, type CreateOrderInput } from "../types/order.types";
import { createOrderWithItems } from "../services/order.service";
import { requireActiveOrgContext } from "@/app/features/auth/services/org-context.service";

/**
 * Server action to create an order
 *
 * ✅ Validates input using Zod
 * ✅ Gets organization from session
 * ✅ Calls transactional service
 * ✅ Returns proper response
 */
export async function createOrder(input: CreateOrderInput) {
  try {
    // 1️⃣ VALIDATE: Input schema
    const validationResult = createOrderSchema.safeParse(input);
    if (!validationResult.success) {
      return {
        success: false,
        message: "Invalid input",
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    // 2️⃣ GET: Organization from shared helper
    const { orgId: organizationId } = await requireActiveOrgContext();

    const { customerId, items } = validationResult.data;

    // 3️⃣ CREATE: Order with transactional service
    const result = await createOrderWithItems(
      organizationId,
      customerId,
      items,
    );

    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to create order",
    };
  }
}
