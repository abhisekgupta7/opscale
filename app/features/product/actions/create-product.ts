"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  checkExistingProductByName,
  createProductInDb,
} from "../services/product.service";
import {
  createProductSchema,
  type CreateProductInput,
} from "../types/product.types";

export async function createProduct(input: CreateProductInput) {
  // ✅ Validate input
  const parsed = createProductSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid product data",
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

    // ✅ Check if product name already exists in this organization
    const existing = await checkExistingProductByName(
      parsed.data.name,
      organizationId,
    );

    if (existing.length > 0) {
      return {
        success: false,
        message: `Product "${parsed.data.name}" already exists in your organization`,
      };
    }

    // ✅ Normalize optional fields (empty strings -> null)
    const productData = {
      organizationId,
      name: parsed.data.name.trim(),
      description: parsed.data.description?.trim() || null,
      price: parsed.data.price,
      categoryId: parsed.data.categoryId?.trim() || null,
      imageUrl: parsed.data.imageUrl?.trim() || null,
      stock: parsed.data.stock,
    };

    // ✅ Insert product
    const result = await createProductInDb(productData);

    return {
      success: true,
      message: "Product created successfully",
      data: result[0],
    };
  } catch (error) {
    console.error("Create product error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to create product";
    return {
      success: false,
      message,
    };
  }
}
