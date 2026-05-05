import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export const updateCategorySchema = z.object({
  id: z.string().uuid("Category id is required"),
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  parentId: z
    .string()
    .uuid("Parent category must be a valid ID")
    .optional()
    .nullable(),
  categoryPhoto: z
    .string()
    .url("Category photo must be a valid URL")
    .optional(),
});

export type CategorySchema = z.infer<typeof updateCategorySchema>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
