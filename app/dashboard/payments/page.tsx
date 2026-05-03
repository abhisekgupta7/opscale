import { Badge } from "@/components/ui/badge";
import { getOrganizationPayments } from "@/app/features/billing/actions/get-org-payments";

type PaymentRow = {
  id: string;
  amount: number;
  provider: string;
  status: string;
  createdAt: Date;
  customerName: string | null;
};

function formatCurrency(amountInPaisa: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0,
  }).format(amountInPaisa / 100);
}

export default async function PaymentsPage() {
  const result = await getOrganizationPayments();
  const payments: PaymentRow[] = result.success
    ? (result.payments as PaymentRow[])
    : [];

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
            Review and track payments for your active organization.
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-muted-foreground">
          {payments.length} payments found
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <p className="text-sm font-semibold text-foreground">Payments</p>
          <div className="text-xs text-muted-foreground">Latest first</div>
        </div>

        <div className="overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-[0.16em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Provider</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-4 py-3 font-medium text-foreground">
                    {payment.customerName || "Organization Payment"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {payment.provider}
                  </td>
                  <td className="px-4 py-3 text-foreground">
                    {formatCurrency(payment.amount)}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant="outline"
                      className={
                        payment.status === "VERIFIED" ||
                        payment.status === "COMPLETED"
                          ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                          : payment.status === "REJECTED"
                            ? "border-red-400/40 bg-red-400/10 text-red-300"
                            : "border-amber-400/40 bg-amber-400/10 text-amber-300"
                      }
                    >
                      {payment.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {payments.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-sm text-muted-foreground"
                  >
                    {result.success
                      ? "No payments found for this organization."
                      : result.message || "Unable to load payments."}
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
