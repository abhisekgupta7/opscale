"use server";

import { auth } from "@/auth";
import { getProductsByOrg } from "../services/product.service";

export async function getAllProductsForOrg() {
  try {
    const session = await auth();
    const organizationId = (session?.user as any)?.activeOrgId;

    if (!organizationId) {
      return {
        success: false,
        message: "Unauthorized",
        products: [],
      };
    }

    const products = await getProductsByOrg(organizationId);

    return {
      success: true,
      products: products.map((p) => ({
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
