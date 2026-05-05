import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllOrdersForOrg } from "@/app/features/order/actions/get-all-orders";

function formatCurrency(amountInPaisa: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0,
  }).format(amountInPaisa / 100);
}

type OrdersPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

type OrderRow = {
  id: string;
  customerId: string;
  customerName: string;
  totalAmount: number;
  status: string;
  createdAt: Date;
};

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const resolvedSearchParams = await searchParams;
  const rawQuery = resolvedSearchParams?.q;
  const query = typeof rawQuery === "string" ? rawQuery.trim() : "";

  const result = await getAllOrdersForOrg(query);
  const orders: OrderRow[] = result.success
    ? (result.orders as OrderRow[])
    : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Orders
          </p>
          <h1 className="text-2xl font-semibold text-foreground">
            Orders Overview
          </h1>
          <p className="text-sm text-muted-foreground">
            Live orders from your active organization.
          </p>
        </div>
        <Button
          asChild
          className="h-9 bg-emerald-400 text-emerald-950 hover:bg-emerald-300"
        >
          <Link href="/dashboard/orders/create">Create order</Link>
        </Button>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5">
        <Table>
          <TableCaption>
            {orders.length} order{orders.length === 1 ? "" : "s"} in your active
            organization.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {order.id.slice(0, 8)}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {order.customerName}
                  </TableCell>
                  <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        order.status === "COMPLETED"
                          ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                          : "border-amber-400/40 bg-amber-400/10 text-amber-300"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  {result.success
                    ? "No orders found for this organization."
                    : result.message || "Unable to load orders."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
