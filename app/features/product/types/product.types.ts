import { z } from "zod";

const optionalUrl = z.union([
  z.string().url("Image URL must be a valid URL"),
  z.literal(""),
]);

const optionalUuid = z.union([
  z.string().uuid("Category must be a valid ID"),
  z.literal(""),
]);

export const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z
    .string()
    .trim()
    .max(1000, "Description must be 1000 characters or less")
    .optional(),
  price: z.number().int().nonnegative("Price must be 0 or more"),
  categoryId: optionalUuid.optional(),
  stock: z.number().int().nonnegative("Stock must be 0 or more"),
  imageUrl: optionalUrl.optional(),
});

export const createProductSchema = productSchema;
export const updateProductSchema = productSchema.partial().extend({
  id: z.string().uuid("Product id is required"),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
