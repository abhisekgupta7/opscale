import { z } from "zod";

/**
 * Order item that comes from the frontend
 * - Frontend provides productId and quantity
 * - Backend fetches price from DB (never trust frontend)
 */
export const orderItemInputSchema = z.object({
  productId: z.string().uuid("Product ID must be a valid UUID"),
  quantity: z
    .number()
    .int("Quantity must be an integer")
    .positive("Quantity must be greater than 0"),
});

/**
 * Create order schema - what the frontend sends
 */
export const createOrderSchema = z.object({
  customerId: z.string().uuid("Customer ID must be a valid UUID"),
  items: z.array(orderItemInputSchema).min(1, "At least one item is required"),
});

/**
 * Order with calculated total (backend response)
 */
export const orderSchema = z.object({
  id: z.string().uuid(),
  organizationId: z.string().uuid(),
  customerId: z.string().uuid(),
  totalAmount: z.number().int().nonnegative(),
  status: z.enum(["PENDING", "COMPLETED", "CANCELLED"]),
  createdAt: z.date(),
  updatedAt: z.date(),
});

/**
 * Order item in response
 */
export const orderItemSchema = z.object({
  id: z.string().uuid(),
  orderId: z.string().uuid(),
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
  price: z.number().int().nonnegative(),
});

/**
 * Full order response with items
 */
export const orderWithItemsSchema = orderSchema.extend({
  items: z.array(orderItemSchema),
});

export type OrderItemInput = z.infer<typeof orderItemInputSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type Order = z.infer<typeof orderSchema>;
export type OrderItem = z.infer<typeof orderItemSchema>;
export type OrderWithItems = z.infer<typeof orderWithItemsSchema>;
