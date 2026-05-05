import CategoryForm from "@/app/features/category/components/category-form";

export default function CreateCategoryPage() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Categories
        </p>
        <h1 className="text-2xl font-semibold text-foreground">
          Create New Category
        </h1>
        <p className="text-sm text-muted-foreground">
          Add a category for this organization using only the category name.
        </p>
      </div>

      <CategoryForm />
    </div>
  );
}
