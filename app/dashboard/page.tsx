import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { getAllOrdersForOrg } from "@/app/features/order/actions/get-all-orders";
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
  id: string;
  amount: number;
  currency: string;
  provider: string;
  status: string;
  proofUrl: string | null;
  createdAt: Date;
  customerName: string | null;
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
    paymentsResult,
    ledgerResult,
  ] = await Promise.all([
    getAllOrdersForOrg(),
    getOrganizationPayments(),
    getLedgerSummaryForOrg(),
  ]);

  const orders: DashboardOrderRow[] = ordersResult.success
    ? (ordersResult.orders as DashboardOrderRow[])
    : [];
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


  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Overview
          </h1>
         
        </div>
        <div className="flex items-center gap-2">
        
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
    </div>
  );
}
