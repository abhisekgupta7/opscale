import OrderForm from "@/app/features/order/components/order-form";

export default function CreateOrderPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Orders
        </p>
        <h1 className="text-2xl font-semibold text-foreground">Create Order</h1>
        <p className="text-sm text-muted-foreground">
          Build and submit a live order with customer and product selection.
        </p>
      </div>

      <OrderForm />
    </div>
  );
}
