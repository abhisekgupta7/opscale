"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  updateProductSchema,
  type UpdateProductInput,
} from "../types/product.types";
import {
  getProductByIdAndOrg,
  checkDuplicateProductName,
  updateProductInDb,
} from "../services/product.service";

export async function updateProduct(input: UpdateProductInput) {
  // ✅ Validate input
  const parsed = updateProductSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid product update",
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

    // ✅ Verify product exists and belongs to this organization
    const existing = await getProductByIdAndOrg(id, organizationId);

    if (!existing[0]) {
      return {
        success: false,
        message: "Product not found",
      };
    }

    // ✅ Check if new product name already exists (excluding current product)
    if (updates.name) {
      const duplicate = await checkDuplicateProductName(
        updates.name,
        organizationId,
        id,
      );

      if (duplicate.length > 0) {
        return {
          success: false,
          message: `Product "${updates.name}" already exists in your organization`,
        };
      }
    }

    // ✅ Prepare update data - only include fields that were actually changed
    const updateData: Record<string, any> = {
      updatedAt: new Date(),
    };

    if (updates.name !== undefined) updateData.name = updates.name.trim();
    if (updates.description !== undefined)
      updateData.description = updates.description?.trim() || null;
    if (updates.price !== undefined) updateData.price = updates.price;
    if (updates.stock !== undefined) updateData.stock = updates.stock;
    if (updates.categoryId !== undefined)
      updateData.categoryId = updates.categoryId?.trim() || null;
    if (updates.imageUrl !== undefined)
      updateData.imageUrl = updates.imageUrl?.trim() || null;

    // ✅ Update product
    const result = await updateProductInDb(id, updateData);

    return {
      success: true,
      message: "Product updated successfully",
      data: result[0],
    };
  } catch (error) {
    console.error("Update product error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to update product";
    return {
      success: false,
      message,
    };
  }
}
