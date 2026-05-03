import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const payments = [
  {
    customer: "Khandelwal Traders",
    amount: "Rs. 1,24,800",
    status: "PENDING",
    method: "QR Transfer",
    date: "May 2, 2026",
  },
  {
    customer: "Aarav Stores",
    amount: "Rs. 58,900",
    status: "PENDING",
    method: "Manual",
    date: "May 1, 2026",
  },
  {
    customer: "Nexline Distributors",
    amount: "Rs. 98,200",
    status: "VERIFIED",
    method: "Manual",
    date: "May 1, 2026",
  },
];

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Payments
          </p>
          <h1 className="text-2xl font-semibold text-foreground">
            Payment Verification
          </h1>
          <p className="text-sm text-muted-foreground">
            Review incoming proofs and reconcile receivables.
          </p>
        </div>
        <div className="inline-flex rounded-lg border border-white/10 bg-white/5 p-1 text-xs text-muted-foreground">
          <button className="rounded-md bg-white/10 px-3 py-1.5 text-foreground">
            Pending
          </button>
          <button className="rounded-md px-3 py-1.5 hover:bg-white/10">
            Verified
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-xl border border-white/10 bg-white/5">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <p className="text-sm font-semibold text-foreground">Incoming</p>
            <div className="text-xs text-muted-foreground">
              3 awaiting review
            </div>
          </div>
          <div className="overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Amount</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {payments.map((payment) => (
                  <tr key={`${payment.customer}-${payment.date}`}>
                    <td className="px-4 py-3 font-medium text-foreground">
                      {payment.customer}
                    </td>
                    <td className="px-4 py-3 text-foreground">
                      {payment.amount}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={
                          payment.status === "VERIFIED"
                            ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                            : "border-amber-400/40 bg-amber-400/10 text-amber-300"
                        }
                      >
                        {payment.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {payment.date}
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
                Payment Detail
              </p>
              <p className="text-xs text-muted-foreground">
                Khandelwal Traders · QR Transfer
              </p>
            </div>
            <Badge
              variant="outline"
              className="border-amber-400/40 bg-amber-400/10 text-amber-300"
            >
              Pending
            </Badge>
          </div>

          <div className="mt-4 rounded-lg border border-white/10 bg-[#0f141b] p-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Proof image</span>
              <span>Uploaded 24 min ago</span>
            </div>
            <div className="mt-3 flex h-40 items-center justify-center rounded-lg border border-dashed border-white/10 bg-white/5 text-xs text-muted-foreground">
              Proof image preview
            </div>
          </div>

          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Amount</span>
              <span className="text-foreground">Rs. 1,24,800</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Reference</span>
              <span className="text-foreground">UPI-78423</span>
            </div>
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <Button className="h-10 bg-emerald-400 text-emerald-950 hover:bg-emerald-300">
              Approve payment
            </Button>
            <Button
              variant="secondary"
              className="h-10 border border-white/10 bg-white/5 text-foreground hover:bg-white/10"
            >
              Reject
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
