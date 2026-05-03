import { desc, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { ledgerEntriesTable } from "@/lib/db/schema";

export async function getLedgerSummary(organizationId: string) {
  const [totals] = await db
    .select({
      totalDebit:
        sql<number>`coalesce(sum(case when ${ledgerEntriesTable.type} = 'DEBIT' then ${ledgerEntriesTable.amount} else 0 end), 0)`.as(
          "totalDebit",
        ),
      totalCredit:
        sql<number>`coalesce(sum(case when ${ledgerEntriesTable.type} = 'CREDIT' then ${ledgerEntriesTable.amount} else 0 end), 0)`.as(
          "totalCredit",
        ),
      entryCount: sql<number>`count(*)`.as("entryCount"),
    })
    .from(ledgerEntriesTable)
    .where(eq(ledgerEntriesTable.organizationId, organizationId));

  const recentEntries = await db
    .select()
    .from(ledgerEntriesTable)
    .where(eq(ledgerEntriesTable.organizationId, organizationId))
    .orderBy(desc(ledgerEntriesTable.createdAt))
    .limit(30);

  return {
    totalDebit: Number(totals?.totalDebit || 0),
    totalCredit: Number(totals?.totalCredit || 0),
    balance: Number((totals?.totalCredit || 0) - (totals?.totalDebit || 0)),
    entryCount: Number(totals?.entryCount || 0),
    entries: recentEntries,
  };
}
