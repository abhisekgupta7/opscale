"use server";

import { getActiveOrgId } from "@/app/features/auth/services/org-context.service";
import { getCategoriesByOrg } from "../services/category.service";

export async function getAllCategoriesForOrg() {
  try {
    const organizationId = await getActiveOrgId();

    if (!organizationId) {
      return {
        success: false,
        message: "Unauthorized",
        categories: [],
      };
    }

    const categories = await getCategoriesByOrg(organizationId);

    return {
      success: true,
      categories: categories.map((category: { id: string; name: string }) => ({
        id: category.id,
        name: category.name,
      })),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch categories",
      categories: [],
    };
  }
}
