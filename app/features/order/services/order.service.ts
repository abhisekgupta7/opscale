import { and, eq, inArray, sql } from "drizzle-orm";
import { db } from "@/lib/db/client";
import {
  ordersTable,
  orderItemsTable,
  customerTable,
  productsTable,
  ledgerEntriesTable,
} from "@/lib/db/schema";
import type { OrderItemInput } from "../types/order.types";

type Product = typeof productsTable.$inferSelect;

/**
 * Create an order with items in a single transaction
 *
 * Transaction ensures:
 * 1. ✅ Customer exists in organization
 * 2. ✅ Items array is not empty
 * 3. ✅ Each quantity > 0
 * 4. ✅ Products exist and belong to organization
 * 5. ✅ Stock is sufficient for each product
 * 6. ✅ Calculate total from actual product prices (NOT frontend)
 * 7. ✅ Create order
 * 8. ✅ Create order items (snapshot prices)
 * 9. ✅ Reduce stock for each product
 * 10. ✅ Create ledger entry
 * 11. ✅ ALL SUCCESS OR ALL FAIL (transaction)
 */
export async function createOrderWithItems(
  organizationId: string,
  customerId: string,
  items: OrderItemInput[],
) {
  // 1️⃣ VALIDATION: Check inputs
  if (!items || items.length === 0) {
    return {
      success: false,
      message: "Order must have at least one item",
      code: "NO_ITEMS",
    };
  }

  // Check all quantities are positive
  for (const item of items) {
    if (item.quantity <= 0) {
      return {
        success: false,
        message: "Item quantity must be greater than 0",
        code: "INVALID_QUANTITY",
      };
    }
  }

  try {
    return await db.transaction(async (tx: any) => {
      // 2️⃣ VALIDATE: Customer exists and belongs to organization
      const customer = await tx
        .select()
        .from(customerTable)
        .where(
          and(
            eq(customerTable.id, customerId),
            eq(customerTable.organizationId, organizationId),
          ),
        )
        .limit(1);

      if (customer.length === 0) {
        throw new Error("CUSTOMER_NOT_FOUND");
      }

      // 3️⃣ FETCH: Get all products from database
      // Never trust frontend prices!
      const productIds = items.map((item) => item.productId);
      const products: Product[] = await tx
        .select()
        .from(productsTable)
        .where(
          and(
            eq(productsTable.organizationId, organizationId),
            inArray(productsTable.id, productIds),
          ),
        );

      // Verify all products exist
      if (products.length !== productIds.length) {
        throw new Error("PRODUCT_NOT_FOUND");
      }

      // Create a map for quick lookup
      const productMap = new Map<string, Product>(
        products.map((p: Product) => [p.id, p]),
      );

      // 4️⃣ VALIDATE: Check stock for each item
      let totalAmount = 0;
      const validatedItems: Array<{
        productId: string;
        quantity: number;
        price: number;
      }> = [];

      for (const item of items) {
        const product = productMap.get(item.productId);
        if (!product) {
          throw new Error("PRODUCT_NOT_FOUND");
        }

        // Stock validation
        if (product.stock < item.quantity) {
          throw new Error(
            `INSUFFICIENT_STOCK:${product.name}:available=${product.stock},requested=${item.quantity}`,
          );
        }

        // 5️⃣ CALCULATE: Total from actual DB prices (not frontend)
        const itemTotal = product.price * item.quantity;
        totalAmount += itemTotal;

        validatedItems.push({
          productId: item.productId,
          quantity: item.quantity,
          price: product.price, // Snapshot the price at order time
        });
      }

      // 6️⃣ CREATE: Insert order
      const orderResult = await tx
        .insert(ordersTable)
        .values({
          organizationId,
          customerId,
          totalAmount,
          status: "PENDING",
        })
        .returning();

      const order = orderResult[0];

      // 7️⃣ CREATE: Insert order items (with snapshotted prices)
      const orderItemsData = validatedItems.map((item) => ({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      }));

      await tx.insert(orderItemsTable).values(orderItemsData);

      // 8️⃣ UPDATE: Reduce stock for each product
      for (const item of validatedItems) {
        await tx
          .update(productsTable)
          .set({
            stock: sql`${productsTable.stock} - ${item.quantity}`,
          })
          .where(eq(productsTable.id, item.productId));
      }

      // 9️⃣ CREATE: Ledger entry for order
      await tx.insert(ledgerEntriesTable).values({
        organizationId,
        type: "DEBIT",
        amount: totalAmount,
        description: `Order from ${customer[0].name}`,
        referenceId: order.id,
        referenceType: "ORDER",
      });

      return {
        success: true,
        message: "Order created successfully",
        orderId: order.id,
        totalAmount,
        itemCount: validatedItems.length,
      };
    });
  } catch (error: any) {
    const errorMessage = error.message || "Unknown error";

    // Handle specific errors
    if (errorMessage === "CUSTOMER_NOT_FOUND") {
      return {
        success: false,
        message: "Customer not found in this organization",
        code: "CUSTOMER_NOT_FOUND",
      };
    }

    if (errorMessage === "PRODUCT_NOT_FOUND") {
      return {
        success: false,
        message: "One or more products not found",
        code: "PRODUCT_NOT_FOUND",
      };
    }

    if (errorMessage.startsWith("INSUFFICIENT_STOCK:")) {
      const [, productName, details] = errorMessage.split(":");
      return {
        success: false,
        message: `Insufficient stock for ${productName}. ${details}`,
        code: "INSUFFICIENT_STOCK",
      };
    }

    // Generic error
    return {
      success: false,
      message: errorMessage || "Failed to create order",
      code: "ERROR",
    };
  }
}

/**
 * Get order with all items
 */
export async function getOrderWithItems(
  orderId: string,
  organizationId: string,
) {
  try {
    const order = await db
      .select()
      .from(ordersTable)
      .where(
        and(
          eq(ordersTable.id, orderId),
          eq(ordersTable.organizationId, organizationId),
        ),
      )
      .limit(1);

    if (order.length === 0) {
      return { success: false, message: "Order not found" };
    }

    const items = await db
      .select()
      .from(orderItemsTable)
      .where(eq(orderItemsTable.orderId, orderId));

    return {
      success: true,
      order: order[0],
      items,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch order",
    };
  }
}

/**
 * Get all orders for organization
 */
export async function getOrdersByOrg(organizationId: string) {
  try {
    const orders = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.organizationId, organizationId));

    return {
      success: true,
      orders,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch orders",
    };
  }
}

export async function getOrderById(_id: string) {
  throw new Error("Not implemented");
}
