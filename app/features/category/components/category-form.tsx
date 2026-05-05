"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  createCategorySchema,
  type CreateCategoryInput,
} from "../types/category.types";
import { createCategory } from "../actions/create-category";

export default function CategoryForm() {
  const form = useForm<CreateCategoryInput>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: CreateCategoryInput) => {
    try {
      const result = await createCategory(data);

      if (!result.success) {
        toast.error(result.message || "Failed to create category");
        return;
      }

      toast.success("Category created successfully");
      form.reset();
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error("Create category error:", error);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="mb-6 text-2xl font-semibold">Create Category</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Category Name */}
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Electronics, Clothing..."
            {...form.register("name")}
          />
          {form.formState.errors.name && (
            <p className="text-xs text-red-500">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Creating..." : "Create"}
        </Button>
      </form>
    </div>
  );
}
