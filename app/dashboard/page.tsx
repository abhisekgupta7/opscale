import { ArrowDownRight, ArrowUpRight, CircleDot } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const summaryCards = [
  {
    label: "Total Sales",
    value: "Rs. 18.4L",
    delta: "+12.4%",
    trend: "up",
    meta: "vs last 30 days",
  },
  {
    label: "Outstanding Due",
    value: "Rs. 4.7L",
    delta: "-6.2%",
    trend: "down",
    meta: "aging 30+ days",
  },
  {
    label: "Payments Received",
    value: "Rs. 9.1L",
    delta: "+4.8%",
    trend: "up",
    meta: "last 7 days",
  },
];

const recentOrders = [
  {
    id: "ORD-1042",
    customer: "Khandelwal Traders",
    total: "Rs. 1,24,800",
    status: "PENDING",
    date: "May 2, 2026",
  },
  {
    id: "ORD-1041",
    customer: "Nexline Distributors",
    total: "Rs. 98,200",
    status: "VERIFIED",
    date: "May 2, 2026",
  },
  {
    id: "ORD-1040",
    customer: "Shreeji Wholesale",
    total: "Rs. 76,500",
    status: "VERIFIED",
    date: "May 1, 2026",
  },
  {
    id: "ORD-1039",
    customer: "Aarav Stores",
    total: "Rs. 58,900",
    status: "PENDING",
    date: "May 1, 2026",
  },
];

const balancePreview = [
  {
    customer: "Radiant Mart",
    outstanding: "Rs. 62,300",
    limit: "Rs. 2.0L",
  },
  {
    customer: "Sapphire Traders",
    outstanding: "Rs. 41,150",
    limit: "Rs. 1.4L",
  },
  {
    customer: "Nira Enterprises",
    outstanding: "Rs. 29,800",
    limit: "Rs. 1.2L",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Overview
          </p>
          <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Track orders, payments, and customer balances at a glance.
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
            Updated 2m ago
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
                Latest activity across wholesale accounts
              </p>
            </div>
            <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-white/10">
              View all
            </button>
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
                {recentOrders.map((order) => (
                  <tr key={order.id} className="bg-transparent">
                    <td className="px-4 py-3 font-medium text-foreground">
                      {order.id}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {order.customer}
                    </td>
                    <td className="px-4 py-3 text-foreground">{order.total}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={
                          order.status === "VERIFIED"
                            ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                            : "border-amber-400/40 bg-amber-400/10 text-amber-300"
                        }
                      >
                        {order.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {order.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Customer Balances
              </p>
              <p className="text-xs text-muted-foreground">
                Highest outstanding exposure
              </p>
            </div>
            <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-white/10">
              Open ledger
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {balancePreview.map((balance) => (
              <div
                key={balance.customer}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-[#0f141b] p-3"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {balance.customer}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Credit limit {balance.limit}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">
                    {balance.outstanding}
                  </p>
                  <p className="text-xs text-muted-foreground">Outstanding</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-3 text-xs text-emerald-200">
            Strong collections this week. 68% of dues cleared within 48 hours.
          </div>
        </div>
      </div>
    </div>
  );
}
