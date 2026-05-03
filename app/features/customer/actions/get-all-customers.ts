"use server";

import { auth } from "@/auth";
import { getCustomersByOrg } from "../services/customer.service";

export async function getAllCustomersForOrg() {
  try {
    const session = await auth();
    const organizationId = (session?.user as any)?.activeOrgId;

    if (!organizationId) {
      return {
        success: false,
        message: "Unauthorized",
        customers: [],
      };
    }

    const customers = await getCustomersByOrg(organizationId);

    return {
      success: true,
      customers: customers.map((c) => ({
        id: c.id,
        name: c.name,
        email: c.email,
      })),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch customers",
      customers: [],
    };
  }
}
