import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  parentId: z
    .string()
    .uuid("Parent category must be a valid ID")
    .optional()
    .nullable(),
  categoryPhoto: z.string().url("Category photo must be a valid URL"),
});

export const createCategorySchema = categorySchema;

export const updateCategorySchema = categorySchema.partial().extend({
  id: z.string().uuid("Category id is required"),
});

export type CategorySchema = z.infer<typeof categorySchema>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
