import { getLedgerSummaryForOrg } from "@/app/features/ledger/actions/get-ledger-summary";

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
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <p className="text-sm font-semibold text-foreground">
            Recent Entries
          </p>
          <div className="text-xs text-muted-foreground">
            {summary.entryCount} records
          </div>
        </div>

        <div className="overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-[0.16em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Description</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {summary.entries.map(
                (entry: {
                  id: string;
                  type: string;
                  description: string | null;
                  amount: number;
                  createdAt: Date;
                }) => (
                  <tr key={entry.id}>
                    <td className="px-4 py-3 text-foreground">{entry.type}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {entry.description || "-"}
                    </td>
                    <td className="px-4 py-3 text-foreground">
                      {formatCurrency(entry.amount)}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ),
              )}
              {summary.entries.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-sm text-muted-foreground"
                  >
                    {result.success
                      ? "No ledger entries yet for this organization."
                      : result.message || "Unable to load ledger."}
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
