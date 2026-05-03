"use server";

import { getActiveOrgId } from "@/app/features/auth/services/org-context.service";
import { getProductsByOrg } from "../services/product.service";

export async function getAllProductsForOrg(searchTerm?: string) {
  try {
    const organizationId = await getActiveOrgId();

    if (!organizationId) {
      return {
        success: false,
        message: "Unauthorized",
        products: [],
      };
    }

    const products = await getProductsByOrg(organizationId);
    const normalizedSearch = searchTerm?.trim().toLowerCase();
    const filteredProducts = normalizedSearch
      ? products.filter((product) =>
          product.name.toLowerCase().includes(normalizedSearch),
        )
      : products;

    return {
      success: true,
      products: filteredProducts.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        stock: p.stock,
      })),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch products",
      products: [],
    };
  }
}
