"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import ImageUploader from "@/components/Utility/ImageUploader";
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
      parentId: undefined,
      categoryPhoto: "",
    },
  });

  const handleUploadComplete = (url: string) => {
    form.setValue("categoryPhoto", url, {
      shouldDirty: true,
      shouldValidate: true,
    });
    form.clearErrors("categoryPhoto");
  };

  const handleUploadError = () => {
    toast.error("Image upload failed. Please try again.");
    form.setError("categoryPhoto", {
      message: "Image upload failed",
    });
  };

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

        {/* Parent Category (Optional) */}
        <div className="space-y-1">
          <Label htmlFor="parentId">Parent Category (Optional)</Label>
          <Input
            id="parentId"
            placeholder="Parent category ID"
            {...form.register("parentId")}
          />
          {form.formState.errors.parentId && (
            <p className="text-xs text-red-500">
              {form.formState.errors.parentId.message}
            </p>
          )}
        </div>

        {/* Category Photo */}
        <div className="space-y-1">
          <Label>Photo</Label>
          <ImageUploader
            onUploadComplete={handleUploadComplete}
            onError={handleUploadError}
          />
          {form.formState.errors.categoryPhoto && (
            <p className="text-xs text-red-500">
              {form.formState.errors.categoryPhoto.message}
            </p>
          )}
          {form.watch("categoryPhoto") && (
            <img
              src={form.watch("categoryPhoto")}
              alt="Category"
              className="mt-2 h-32 w-32 rounded object-cover"
            />
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
