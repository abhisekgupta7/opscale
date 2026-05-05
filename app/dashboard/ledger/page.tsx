import { getLedgerSummaryForOrg } from "@/app/features/ledger/actions/get-ledger-summary";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function formatCurrency(amountInPaisa: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0,
  }).format(amountInPaisa / 100);
}

export default async function LedgerPage() {
  const result = await getLedgerSummaryForOrg();
  const summary =
    result.success && result.data
      ? result.data
      : {
          totalDebit: 0,
          totalCredit: 0,
          balance: 0,
          entryCount: 0,
          entries: [],
        };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Ledger
        </p>
        <h1 className="text-2xl font-semibold text-foreground">Ledger</h1>
        <p className="text-sm text-muted-foreground">
          Real debit and credit entries for your active organization.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Total Debit
          </p>
          <p className="mt-2 text-lg font-semibold text-foreground">
            {formatCurrency(summary.totalDebit)}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Total Credit
          </p>
          <p className="mt-2 text-lg font-semibold text-foreground">
            {formatCurrency(summary.totalCredit)}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Balance
          </p>
          <p className="mt-2 text-lg font-semibold text-foreground">
            {formatCurrency(summary.balance)}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5">
        <Table>
          <TableCaption>
            {summary.entryCount} ledger entr
            {summary.entryCount === 1 ? "y" : "ies"} for your active
            organization.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {summary.entries.length > 0 ? (
              summary.entries.map(
                (entry: {
                  id: string;
                  type: string;
                  description: string | null;
                  amount: number;
                  createdAt: Date;
                }) => (
                  <TableRow key={entry.id}>
                    <TableCell className="text-foreground">
                      {entry.type}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {entry.description || "-"}
                    </TableCell>
                    <TableCell className="text-right text-foreground">
                      {formatCurrency(entry.amount)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ),
              )
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  {result.success
                    ? "No ledger entries yet for this organization."
                    : result.message || "Unable to load ledger."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
