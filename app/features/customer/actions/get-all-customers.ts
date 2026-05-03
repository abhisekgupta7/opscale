"use server";

import { getActiveOrgId } from "@/app/features/auth/services/org-context.service";
import { getCustomersByOrg } from "../services/customer.service";

export async function getAllCustomersForOrg(searchTerm?: string) {
  try {
    const organizationId = await getActiveOrgId();

    if (!organizationId) {
      return {
        success: false,
        message: "Unauthorized",
        customers: [],
      };
    }

    const customers = await getCustomersByOrg(organizationId);
    const normalizedSearch = searchTerm?.trim().toLowerCase();
    const filteredCustomers = normalizedSearch
      ? customers.filter((customer) =>
          [customer.name, customer.email]
            .filter(Boolean)
            .some((value) => value.toLowerCase().includes(normalizedSearch)),
        )
      : customers;

    return {
      success: true,
      customers: filteredCustomers.map((c) => ({
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
