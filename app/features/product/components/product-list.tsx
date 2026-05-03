"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function ProductList() {
  return (
    <Card className="border border-border shadow-sm">
      <CardContent className="p-6">
        <p className="text-sm font-medium text-foreground">Products</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Product list will appear here.
        </p>
      </CardContent>
    </Card>
  );
}
