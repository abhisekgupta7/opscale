import ProductForm from "@/app/features/product/components/product-form";
import { getAllCategoriesForOrg } from "@/app/features/category/actions/get-all-categories";

export default async function CreateProductPage() {
  const categoriesResult = await getAllCategoriesForOrg();
  const categories = categoriesResult.success
    ? categoriesResult.categories
    : [];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Products
        </p>
        <h1 className="text-2xl font-semibold text-foreground">
          Create Product
        </h1>
        <p className="text-sm text-muted-foreground">
          Add a product to your org catalog with stock and pricing.
        </p>
      </div>

      <ProductForm categories={categories} />
    </div>
  );
}
