"use server";

import { requireActiveOrgContext } from "@/app/features/auth/services/org-context.service";
import {
  createCustomerSchema,
  type CreateCustomerInput,
} from "../types/customer.types";
import {
  checkExistingCustomerByEmail,
  createCustomerInDb,
} from "../services/customer.service";

export async function createCustomer(input: CreateCustomerInput) {
  // ✅ Validate input
  const parsed = createCustomerSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid customer data",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    // ✅ Get organization context once via shared helper
    const { orgId: organizationId } = await requireActiveOrgContext();

    // ✅ Check if customer email already exists in this organization
    const existing = await checkExistingCustomerByEmail(
      parsed.data.email,
      organizationId,
    );

    if (existing.length > 0) {
      return {
        success: false,
        message: `Customer with email "${parsed.data.email}" already exists in your organization`,
      };
    }

    // ✅ Normalize data
    const customerData = {
      organizationId,
      name: parsed.data.name.trim(),
      email: parsed.data.email.toLowerCase().trim(),
      phone: parsed.data.phone ? parsed.data.phone.trim() : null,
    };

    // ✅ Create customer
    const result = await createCustomerInDb(customerData);

    return {
      success: true,
      message: "Customer created successfully",
      data: result[0],
    };
  } catch (error) {
    console.error("Create customer error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to create customer";
    return {
      success: false,
      message,
    };
  }
}
