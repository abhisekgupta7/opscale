"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import ImageUploader from "@/components/Utility/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  createProductSchema,
  type CreateProductInput,
} from "../types/product.types";
import { createProduct } from "../actions/create-product";

interface ProductCategoryOption {
  id: string;
  name: string;
}

interface ProductFormProps {
  categories?: ProductCategoryOption[];
}

export default function ProductForm({ categories = [] }: ProductFormProps) {
  const form = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      categoryId: "",
      stock: 0,
      imageUrl: "",
    },
  });

  const handleUploadComplete = (url: string) => {
    form.setValue("imageUrl", url, {
      shouldDirty: true,
      shouldValidate: true,
    });
    form.clearErrors("imageUrl");
  };

  const handleUploadError = () => {
    form.setError("imageUrl", {
      message: "Image upload failed. Please try again.",
    });
  };

  const onSubmit = async (data: CreateProductInput) => {
    const normalized: CreateProductInput = {
      ...data,
      description: data.description?.trim() || undefined,
      categoryId: data.categoryId?.trim() || undefined,
      imageUrl: data.imageUrl?.trim() || undefined,
    };

    const result = await createProduct(normalized);
    if (!result.success) {
      toast.error(result.message || "Failed to create product");
      return;
    }

    toast.success("Product created successfully");
    form.reset();
  };

  return (
    <div className="max-w-2xl space-y-6">
      <h2 className="text-2xl font-semibold">Create Product</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Product name"
            {...form.register("name")}
          />
          {form.formState.errors.name && (
            <p className="text-sm text-destructive">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            rows={4}
            className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 md:text-sm"
            placeholder="Short product description"
            {...form.register("description")}
          />
          {form.formState.errors.description && (
            <p className="text-sm text-destructive">
              {form.formState.errors.description.message}
            </p>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              min={0}
              {...form.register("price", { valueAsNumber: true })}
            />
            {form.formState.errors.price && (
              <p className="text-sm text-destructive">
                {form.formState.errors.price.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              min={0}
              {...form.register("stock", { valueAsNumber: true })}
            />
            {form.formState.errors.stock && (
              <p className="text-sm text-destructive">
                {form.formState.errors.stock.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="categoryId">Category</Label>
          <select
            id="categoryId"
            className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
            {...form.register("categoryId")}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <p className="text-sm text-muted-foreground">
            {categories.length
              ? "Optional: assign a category"
              : "No categories available yet"}
          </p>
          {form.formState.errors.categoryId && (
            <p className="text-sm text-destructive">
              {form.formState.errors.categoryId.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Product Photo</Label>
          <ImageUploader
            onUploadComplete={handleUploadComplete}
            onError={handleUploadError}
            folder="/products"
            label="Upload product image"
          />
          {form.formState.errors.imageUrl && (
            <p className="text-sm text-destructive">
              {form.formState.errors.imageUrl.message}
            </p>
          )}
        </div>

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Creating..." : "Create Product"}
        </Button>
      </form>
    </div>
  );
}
