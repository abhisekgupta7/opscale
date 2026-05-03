import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const orders = [
  {
    customer: "Khandelwal Traders",
    total: "Rs. 1,24,800",
    status: "PENDING",
    date: "May 2, 2026",
  },
  {
    customer: "Nexline Distributors",
    total: "Rs. 98,200",
    status: "VERIFIED",
    date: "May 2, 2026",
  },
  {
    customer: "Shreeji Wholesale",
    total: "Rs. 76,500",
    status: "VERIFIED",
    date: "May 1, 2026",
  },
  {
    customer: "Aarav Stores",
    total: "Rs. 58,900",
    status: "PENDING",
    date: "May 1, 2026",
  },
  {
    customer: "Radiant Mart",
    total: "Rs. 44,250",
    status: "PENDING",
    date: "Apr 30, 2026",
  },
];

export default function OrdersPage() {
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
            A clean, dense view of every customer order.
          </p>
        </div>
        <Button className="h-9 bg-emerald-400 text-emerald-950 hover:bg-emerald-300">
          Create order
        </Button>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <p className="text-sm font-semibold text-foreground">Recent Orders</p>
          <div className="text-xs text-muted-foreground">Last 30 days</div>
        </div>
        <div className="overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-[0.16em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Total</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {orders.map((order) => (
                <tr key={`${order.customer}-${order.date}`}>
                  <td className="px-4 py-3 font-medium text-foreground">
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
    </div>
  );
}
