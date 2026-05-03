import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAllProductsForOrg } from "@/app/features/product/actions/get-all-products";

function formatCurrency(amountInPaisa: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0,
  }).format(amountInPaisa / 100);
}

type ProductsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const resolvedSearchParams = await searchParams;
  const rawQuery = resolvedSearchParams?.q;
  const query = typeof rawQuery === "string" ? rawQuery.trim() : "";
  const result = await getAllProductsForOrg(query);
  const products = result.success ? result.products : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Products
          </p>
          <h1 className="text-2xl font-semibold text-foreground">
            Product Catalog
          </h1>
          <p className="text-sm text-muted-foreground">
            Live products from your active organization inventory.
          </p>
        </div>
        <Button
          asChild
          className="h-9 bg-emerald-400 text-emerald-950 hover:bg-emerald-300"
        >
          <Link href="/dashboard/products/create">Create product</Link>
        </Button>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <p className="text-sm font-semibold text-foreground">Products</p>
          <div className="text-xs text-muted-foreground">
            {products.length} records
          </div>
        </div>
        <div className="overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-[0.16em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-4 py-3 font-medium text-foreground">
                    {product.name}
                  </td>
                  <td className="px-4 py-3 text-foreground">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {product.stock}
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-8 text-center text-sm text-muted-foreground"
                  >
                    {result.success
                      ? "No products found for this organization."
                      : result.message || "Unable to load products."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
