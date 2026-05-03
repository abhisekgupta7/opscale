import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const lineItems = [
  {
    name: "Cold Pressed Oil - 5L",
    sku: "OIL-5L",
    qty: 12,
    price: "Rs. 1,450",
    total: "Rs. 17,400",
  },
  {
    name: "Whole Wheat Flour - 25kg",
    sku: "FLOUR-25",
    qty: 4,
    price: "Rs. 2,200",
    total: "Rs. 8,800",
  },
  {
    name: "Basmati Rice - 10kg",
    sku: "RICE-10",
    qty: 8,
    price: "Rs. 1,850",
    total: "Rs. 14,800",
  },
];

export default function CreateOrderPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Orders
        </p>
        <h1 className="text-2xl font-semibold text-foreground">Create Order</h1>
        <p className="text-sm text-muted-foreground">
          Build a new order quickly with searchable customers and products.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_0.9fr]">
        <div className="space-y-6">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-semibold text-foreground">Customer</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-[1.2fr_0.8fr]">
              <Input
                placeholder="Search customer or account"
                className="h-9 border-white/10 bg-white/5 text-foreground"
              />
              <Input
                placeholder="Payment terms"
                className="h-9 border-white/10 bg-white/5 text-foreground"
              />
            </div>
            <div className="mt-3 rounded-lg border border-white/10 bg-[#0f141b] p-3 text-xs text-muted-foreground">
              Selected: Sapphire Foods Pvt Ltd · Credit limit Rs. 2.0L
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-semibold text-foreground">
                Line Items
              </p>
              <div className="flex gap-2">
                <Input
                  placeholder="Search products"
                  className="h-9 w-56 border-white/10 bg-white/5 text-foreground"
                />
                <Button className="h-9 bg-emerald-400 text-emerald-950 hover:bg-emerald-300">
                  Add item
                </Button>
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-lg border border-white/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-medium">Product</th>
                    <th className="px-4 py-3 font-medium">Qty</th>
                    <th className="px-4 py-3 font-medium">Price</th>
                    <th className="px-4 py-3 font-medium">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {lineItems.map((item) => (
                    <tr key={item.sku}>
                      <td className="px-4 py-3">
                        <p className="font-medium text-foreground">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          SKU {item.sku}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-foreground">{item.qty}</td>
                      <td className="px-4 py-3 text-foreground">
                        {item.price}
                      </td>
                      <td className="px-4 py-3 text-foreground">
                        {item.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-semibold text-foreground">Summary</p>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>Rs. 41,000</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>Rs. 2,200</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Discount</span>
                <span>-Rs. 1,100</span>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex justify-between text-base font-semibold text-foreground">
                <span>Total</span>
                <span>Rs. 42,100</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#0f141b] p-4 text-xs text-muted-foreground">
            Payment term: Net 15 · Invoice auto-generated after approval.
          </div>

          <div className="grid gap-2">
            <Button className="h-10 bg-emerald-400 text-emerald-950 hover:bg-emerald-300">
              Save order
            </Button>
            <Button
              variant="secondary"
              className="h-10 border border-white/10 bg-white/5 text-foreground hover:bg-white/10"
            >
              Save as draft
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
