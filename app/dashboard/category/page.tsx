import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import { getAllCategoriesForOrg } from "@/app/features/category/actions/get-all-categories";
import { Button } from "@/components/ui/button";
export default async function Category() {
  const categoriesResult = await getAllCategoriesForOrg();
  const categories = categoriesResult.success
    ? categoriesResult.categories
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Categories
          </p>
          <h1 className="text-2xl font-semibold text-foreground">
            Category List
          </h1>
        </div>

        <Button asChild>
          <Link href="/dashboard/category/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Category
          </Link>
        </Button>
      </div>

      <Table>
        <TableCaption>A list of categories in your organization.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length > 0 ? (
            categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={1} className="h-24 text-center">
                No categories found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
