"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  updateCategorySchema,
  type UpdateCategoryInput,
} from "../types/category.types";
import {
  getCategoryByIdAndOrg,
  checkDuplicateCategoryName,
  updateCategoryInDb,
} from "../services/category.service";

export async function updateCategory(input: UpdateCategoryInput) {
  // ✅ Validate input
  const parsed = updateCategorySchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid category update",
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
    const { id, ...updates } = parsed.data;

    // ✅ Verify category exists and belongs to this organization
    const existing = await getCategoryByIdAndOrg(id, organizationId);

    if (!existing[0]) {
      return {
        success: false,
        message: "Category not found",
      };
    }

    // ✅ Check if new category name already exists (excluding current category)
    if (updates.name) {
      const duplicate = await checkDuplicateCategoryName(
        updates.name,
        organizationId,
        id,
      );

      if (duplicate.length > 0) {
        return {
          success: false,
          message: `Category "${updates.name}" already exists in your organization`,
        };
      }
    }

    // ✅ Prepare update data - only include fields that were actually changed
    const updateData: Record<string, any> = {
      updatedAt: new Date(),
    };

    if (updates.name !== undefined) updateData.name = updates.name.trim();
    if (updates.parentId !== undefined)
      updateData.parentId = updates.parentId?.trim() || null;
    if (updates.categoryPhoto !== undefined)
      updateData.categoryPhoto = updates.categoryPhoto.trim();

    // ✅ Update category
    const result = await updateCategoryInDb(id, updateData);

    return {
      success: true,
      message: "Category updated successfully",
      data: result[0],
    };
  } catch (error) {
    console.error("Update category error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to update category";
    return {
      success: false,
      message,
    };
  }
}
