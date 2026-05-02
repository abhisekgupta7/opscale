"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  createCategorySchema,
  type CreateCategoryInput,
} from "../types/category.types";
import {
  checkExistingCategoryByName,
  createCategoryInDb,
} from "../services/category.service";

export async function createCategory(input: CreateCategoryInput) {
  // ✅ Validate input
  const parsed = createCategorySchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid category data",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    // ✅ Get organization context from session
    const session = await getServerSession(authOptions);
    if (!session?.user?.activeOrgId) {
      return {
        success: false,
        message: "No active organization found. Please log in first.",
      };
    }

    const organizationId = session.user.activeOrgId;

    // ✅ Check if category name already exists in this organization
    const existing = await checkExistingCategoryByName(
      parsed.data.name,
      organizationId,
    );

    if (existing.length > 0) {
      return {
        success: false,
        message: `Category "${parsed.data.name}" already exists in your organization`,
      };
    }

    // ✅ Normalize optional fields
    const categoryData = {
      organizationId,
      name: parsed.data.name.trim(),
      parentId: parsed.data.parentId || null,
      categoryPhoto: parsed.data.categoryPhoto.trim(),
    };

    // ✅ Create category
    const result = await createCategoryInDb(categoryData);

    return {
      success: true,
      message: "Category created successfully",
      data: result[0],
    };
  } catch (error) {
    console.error("Create category error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to create category";
    return {
      success: false,
      message,
    };
  }
}
