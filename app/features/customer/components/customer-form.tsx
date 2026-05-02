"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  createCustomerSchema,
  type CreateCustomerInput,
} from "../types/customer.types";
import { createCustomer } from "../actions/create-customer";

export default function CustomerForm() {
  const form = useForm<CreateCustomerInput>({
    resolver: zodResolver(createCustomerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data: CreateCustomerInput) => {
    const result = await createCustomer(data);
    if (!result.success) {
      toast.error(result.message || "Failed to create customer");
      return;
    }

    toast.success("Customer created successfully");
    form.reset();
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="mb-6 text-2xl font-semibold">Create Customer</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Customer Name */}
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Enter customer name"
            {...form.register("name")}
          />
          {form.formState.errors.name && (
            <p className="text-xs text-red-500">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        {/* Customer Email */}
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="customer@example.com"
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className="text-xs text-red-500">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        {/* Customer Phone (Optional) */}
        <div className="space-y-1">
          <Label htmlFor="phone">Phone Number (Optional)</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Enter 10-digit phone number"
            {...form.register("phone")}
          />
          {form.formState.errors.phone && (
            <p className="text-xs text-red-500">
              {form.formState.errors.phone.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Creating..." : "Create Customer"}
        </Button>
      </form>
    </div>
  );
}
