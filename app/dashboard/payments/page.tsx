import { getOrganizationPayments } from "@/app/features/billing/actions/get-org-payments";
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
import { getActiveOrgContext } from "@/app/features/auth/services/org-context.service";
import PaymentReviewActions from "@/app/features/billing/components/payment-review-actions";
import ProofViewer from "./proof-viewer";

function formatCurrency(amountInPaisa: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0,
  }).format(amountInPaisa / 100);
}

type StatusFilter = "ALL" | "PENDING" | "VERIFIED";

type PaymentRow = {
  id: string;
  amount: number;
  currency: string;
  provider: string;
  status: string;
  proofUrl: string | null;
  createdAt: Date;
  customerName: string | null;
  customerPhone: string | null;
  customerEmail: string | null;
};

type PaymentsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function PaymentsPage({
  searchParams,
}: PaymentsPageProps) {
  const resolvedSearchParams = await searchParams;
  const rawStatus = resolvedSearchParams?.status;
  const selectedStatus =
    rawStatus === "PENDING" || rawStatus === "VERIFIED" ? rawStatus : "ALL";

  const [result, context] = await Promise.all([
    getOrganizationPayments(selectedStatus as StatusFilter),
    getActiveOrgContext(),
  ]);

  const payments: PaymentRow[] = result.success
    ? (result.payments as PaymentRow[])
    : [];
  const canReview = context?.role === "OWNER" || context?.role === "ADMIN";

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

      <div className="flex items-center gap-2">
        <Button
          asChild
          size="sm"
          variant={selectedStatus === "ALL" ? "default" : "outline"}
        >
          <Link href="/dashboard/payments">All</Link>
        </Button>
        <Button
          asChild
          size="sm"
          variant={selectedStatus === "PENDING" ? "default" : "outline"}
        >
          <Link href="/dashboard/payments?status=PENDING">Pending</Link>
        </Button>
        <Button
          asChild
          size="sm"
          variant={selectedStatus === "VERIFIED" ? "default" : "outline"}
        >
          <Link href="/dashboard/payments?status=VERIFIED">Verified</Link>
        </Button>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5">
        <Table>
          <TableCaption>
            Payments for your active organization with review actions for
            owner/admin.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Payment ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Proof</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Review</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {payment.id.slice(0, 8)}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {payment.customerName || "Platform subscription"}
                  </TableCell>
                  <TableCell className="text-right text-foreground">
                    {formatCurrency(payment.amount)}
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>
                    <ProofViewer proofUrl={payment.proofUrl} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {payment.status === "PENDING" && canReview ? (
                      <PaymentReviewActions
                        paymentId={payment.id}
                        customerName={payment.customerName}
                        customerPhone={payment.customerPhone}
                        customerEmail={payment.customerEmail}
                        proofUrl={payment.proofUrl}
                        amount={payment.amount}
                        currency={payment.currency}
                        createdAt={payment.createdAt}
                      />
                    ) : (
                      <span className="text-sm text-muted-foreground">-</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-muted-foreground"
                >
                  {result.success
                    ? "No payments found for this organization."
                    : result.message || "Unable to load payments."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
