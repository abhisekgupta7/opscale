import { ArrowDownRight, ArrowUpRight, CircleDot } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getAllOrdersForOrg } from "@/app/features/order/actions/get-all-orders";
import { getAllCustomersForOrg } from "@/app/features/customer/actions/get-all-customers";
import { getAllProductsForOrg } from "@/app/features/product/actions/get-all-products";
import { getOrganizationPayments } from "@/app/features/billing/actions/get-org-payments";
import { getLedgerSummaryForOrg } from "@/app/features/ledger/actions/get-ledger-summary";

type DashboardOrderRow = {
  id: string;
  customerName: string;
  totalAmount: number;
  status: string;
  createdAt: Date;
};

type DashboardPaymentRow = {
  amount: number;
  status: string;
};

type LedgerSummary = {
  totalDebit: number;
  totalCredit: number;
  balance: number;
  entryCount: number;
  entries: Array<{
    id: string;
    createdAt: Date;
  }>;
};

function formatCurrency(amountInPaisa: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0,
  }).format(amountInPaisa / 100);
}

export default async function DashboardPage() {
  const [
    ordersResult,
    customersResult,
    productsResult,
    paymentsResult,
    ledgerResult,
  ] = await Promise.all([
    getAllOrdersForOrg(),
    getAllCustomersForOrg(),
    getAllProductsForOrg(),
    getOrganizationPayments(),
    getLedgerSummaryForOrg(),
  ]);

  const orders: DashboardOrderRow[] = ordersResult.success
    ? (ordersResult.orders as DashboardOrderRow[])
    : [];
  const customers = customersResult.success ? customersResult.customers : [];
  const products = productsResult.success ? productsResult.products : [];
  const payments: DashboardPaymentRow[] = paymentsResult.success
    ? (paymentsResult.payments as DashboardPaymentRow[])
    : [];
  const ledgerSummary: LedgerSummary =
    ledgerResult.success && ledgerResult.data
      ? (ledgerResult.data as LedgerSummary)
      : {
          totalDebit: 0,
          totalCredit: 0,
          balance: 0,
          entryCount: 0,
          entries: [],
        };

  const totalSales = orders.reduce(
    (sum: number, order: DashboardOrderRow) => sum + order.totalAmount,
    0,
  );
  const pendingOrders = orders.filter(
    (order: DashboardOrderRow) => order.status === "PENDING",
  ).length;
  const verifiedPayments = payments.filter(
    (payment: DashboardPaymentRow) =>
      payment.status === "VERIFIED" || payment.status === "COMPLETED",
  );
  const paymentsReceived = verifiedPayments.reduce(
    (sum: number, payment: DashboardPaymentRow) => sum + payment.amount,
    0,
  );

  const summaryCards = [
    {
      label: "Total Sales",
      value: formatCurrency(totalSales),
      delta: `${orders.length} orders`,
      trend: "up",
      meta: "From all recorded orders",
    },
    {
      label: "Outstanding Due",
      value: formatCurrency(ledgerSummary.totalDebit),
      delta: `${pendingOrders} pending`,
      trend: pendingOrders > 0 ? "up" : "down",
      meta: "Based on pending debit entries",
    },
    {
      label: "Payments Received",
      value: formatCurrency(paymentsReceived),
      delta: `${verifiedPayments.length} verified`,
      trend: "up",
      meta: "Verified and completed payments",
    },
  ];

  const recentOrders = orders.slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Overview
          </p>
          <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Real-time overview across orders, customers, products, and ledger.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
          >
            <CircleDot className="h-3 w-3" />
            Live
          </Badge>
          <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-muted-foreground">
            Updated now
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {summaryCards.map((card) => {
          const isUp = card.trend === "up";
          const TrendIcon = isUp ? ArrowUpRight : ArrowDownRight;
          return (
            <div
              key={card.label}
              className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{card.label}</p>
                <div
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                    isUp
                      ? "bg-emerald-400/10 text-emerald-300"
                      : "bg-red-500/10 text-red-300"
                  }`}
                >
                  <TrendIcon className="h-3.5 w-3.5" />
                  {card.delta}
                </div>
              </div>
              <p className="mt-3 text-2xl font-semibold text-foreground">
                {card.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{card.meta}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Recent Orders
              </p>
              <p className="text-xs text-muted-foreground">
                Latest org order activity
              </p>
            </div>
            <div className="text-xs text-muted-foreground">
              {recentOrders.length} latest
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-lg border border-white/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Order</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {recentOrders.map((order: DashboardOrderRow) => (
                  <tr key={order.id} className="bg-transparent">
                    <td className="px-4 py-3 font-medium text-foreground">
                      {order.id.slice(0, 8)}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {order.customerName}
                    </td>
                    <td className="px-4 py-3 text-foreground">
                      {formatCurrency(order.totalAmount)}
                    </td>
                    <td className="px-4 py-3">
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
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {recentOrders.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-sm text-muted-foreground"
                    >
                      No recent orders to display.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Data Snapshot
              </p>
              <p className="text-xs text-muted-foreground">
                Core entities in the active organization
              </p>
            </div>
            <div className="text-xs text-muted-foreground">Live</div>
          </div>

          <div className="mt-4 space-y-3">
            {[
              { label: "Customers", value: customers.length },
              { label: "Products", value: products.length },
              { label: "Payments", value: payments.length },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-[#0f141b] p-3"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {item.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Active organization total
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">
                    {item.value}
                  </p>
                  <p className="text-xs text-muted-foreground">Records</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-3 text-xs text-emerald-200">
            Net ledger balance: {formatCurrency(ledgerSummary.balance)}.
          </div>
        </div>
      </div>
    </div>
  );
}
