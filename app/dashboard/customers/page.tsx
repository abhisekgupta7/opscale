import CustomerForm from "@/app/features/customer/components/customer-form";
import { getAllCustomersForOrg } from "@/app/features/customer/actions/get-all-customers";

type CustomersPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CustomersPage({
  searchParams,
}: CustomersPageProps) {
  const resolvedSearchParams = await searchParams;
  const rawQuery = resolvedSearchParams?.q;
  const query = typeof rawQuery === "string" ? rawQuery.trim() : "";
  const result = await getAllCustomersForOrg(query);
  const customers = result.success ? result.customers : [];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Customers
        </p>
        <h1 className="text-2xl font-semibold text-foreground">Customers</h1>
        <p className="text-sm text-muted-foreground">
          Manage customer records and create new accounts.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-xl border border-white/10 bg-white/5">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <p className="text-sm font-semibold text-foreground">
              Customer List
            </p>
            <div className="text-xs text-muted-foreground">
              {customers.length} records
            </div>
          </div>

          <div className="overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td className="px-4 py-3 font-medium text-foreground">
                      {customer.name}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {customer.email}
                    </td>
                  </tr>
                ))}
                {customers.length === 0 && (
                  <tr>
                    <td
                      colSpan={2}
                      className="px-4 py-8 text-center text-sm text-muted-foreground"
                    >
                      {result.success
                        ? "No customers found for this organization."
                        : result.message || "Unable to load customers."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <CustomerForm />
      </div>
    </div>
  );
}
