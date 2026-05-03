"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createOrderSchema, type CreateOrderInput } from "../types/order.types";
import { createOrder } from "../actions/create-order";
import { getAllCustomersForOrg } from "@/app/features/customer/actions/get-all-customers";
import { getAllProductsForOrg } from "@/app/features/product/actions/get-all-products";

interface Customer {
  id: string;
  name: string;
  email: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export default function OrderForm() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingCustomers, setLoadingCustomers] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [total, setTotal] = useState(0);

  const form = useForm<CreateOrderInput>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      customerId: "",
      items: [{ productId: "", quantity: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  // Fetch customers on mount
  useEffect(() => {
    async function fetchCustomers() {
      try {
        setLoadingCustomers(true);
        const result = await getAllCustomersForOrg();
        if (result.success) {
          setCustomers(result.customers || []);
        } else {
          toast.error(result.message || "Failed to fetch customers");
        }
      } catch (error) {
        toast.error("Failed to fetch customers");
      } finally {
        setLoadingCustomers(false);
      }
    }

    fetchCustomers();
  }, []);

  // Fetch products on mount
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoadingProducts(true);
        const result = await getAllProductsForOrg();
        if (result.success) {
          setProducts(result.products || []);
        } else {
          toast.error(result.message || "Failed to fetch products");
        }
      } catch (error) {
        toast.error("Failed to fetch products");
      } finally {
        setLoadingProducts(false);
      }
    }

    fetchProducts();
  }, []);

  // Calculate total whenever items or product prices change
  useEffect(() => {
    let newTotal = 0;
    const items = form.getValues("items");

    items.forEach((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (product) {
        newTotal += product.price * item.quantity;
      }
    });

    setTotal(newTotal);
  }, [form.watch("items"), products]);

  const onSubmit = async (data: CreateOrderInput) => {
    const result = await createOrder(data);

    if (!result.success) {
      toast.error(result.message || "Failed to create order");
      return;
    }

    toast.success(
      `Order created successfully! Total: ₨${(result.totalAmount / 100).toFixed(2)}`,
    );
    form.reset({
      customerId: "",
      items: [{ productId: "", quantity: 1 }],
    });
    setTotal(0);
  };

  if (loadingCustomers || loadingProducts) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="w-full max-w-2xl">
      <h2 className="mb-6 text-2xl font-semibold">Create Order</h2>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Step 1: Select Customer */}
        <div className="space-y-2">
          <Label htmlFor="customer" className="text-base font-semibold">
            Step 1: Select Customer
          </Label>
          <select
            id="customer"
            className="w-full rounded border border-gray-300 px-3 py-2"
            {...form.register("customerId")}
          >
            <option value="">Choose a customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name} ({customer.email})
              </option>
            ))}
          </select>
          {form.formState.errors.customerId && (
            <p className="text-xs text-red-500">
              {form.formState.errors.customerId.message}
            </p>
          )}
        </div>

        {/* Step 2: Add Products */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold">
              Step 2: Add Products
            </Label>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => append({ productId: "", quantity: 1 })}
            >
              + Add Item
            </Button>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="space-y-2 rounded border p-4">
              <div className="flex gap-3">
                <div className="flex-1">
                  <Label htmlFor={`item-${index}`} className="text-sm">
                    Product
                  </Label>
                  <select
                    id={`item-${index}`}
                    className="w-full rounded border border-gray-300 px-3 py-2"
                    {...form.register(`items.${index}.productId`)}
                  >
                    <option value="">Select product</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} (Stock: {product.stock})
                      </option>
                    ))}
                  </select>
                  {form.formState.errors.items?.[index]?.productId && (
                    <p className="text-xs text-red-500">
                      {form.formState.errors.items[index]?.productId?.message}
                    </p>
                  )}
                </div>

                {/* Step 3: Enter Quantity */}
                <div className="w-24">
                  <Label htmlFor={`qty-${index}`} className="text-sm">
                    Qty
                  </Label>
                  <Input
                    id={`qty-${index}`}
                    type="number"
                    min="1"
                    {...form.register(`items.${index}.quantity`, {
                      valueAsNumber: true,
                    })}
                  />
                  {form.formState.errors.items?.[index]?.quantity && (
                    <p className="text-xs text-red-500">
                      {form.formState.errors.items[index]?.quantity?.message}
                    </p>
                  )}
                </div>

                {/* Product Price Display */}
                <div className="w-20">
                  <Label className="text-sm">Price</Label>
                  <div className="rounded border px-3 py-2 text-right">
                    {products.find(
                      (p) =>
                        p.id ===
                        (form.getValues(`items.${index}.productId`) as string),
                    )?.price ? (
                      <span className="text-sm font-medium">
                        ₨
                        {(
                          (products.find(
                            (p) =>
                              p.id ===
                              (form.getValues(
                                `items.${index}.productId`,
                              ) as string),
                          )?.price || 0) / 100
                        ).toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">-</span>
                    )}
                  </div>
                </div>

                {/* Remove Button */}
                {fields.length > 1 && (
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => remove(index)}
                    className="mt-auto"
                  >
                    Remove
                  </Button>
                )}
              </div>
            </div>
          ))}

          {form.formState.errors.items && (
            <p className="text-xs text-red-500">
              {form.formState.errors.items.message}
            </p>
          )}
        </div>

        {/* Step 4: Display Total */}
        <div className="rounded-lg border-2 border-green-500 bg-green-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-700">Total:</span>
            <span className="text-2xl font-bold text-green-600">
              ₨{(total / 100).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Step 5: Create Order Button */}
        <Button
          type="submit"
          className="w-full bg-blue-600 text-lg font-semibold hover:bg-blue-700"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Creating Order..." : "Create Order"}
        </Button>
      </form>
    </div>
  );
}
