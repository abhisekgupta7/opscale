"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/Utility/ImageUploader";
import {
  organizationConfigSchema,
  type OrganizationConfigInput,
} from "../types/config.types";
import { getOrganizationConfigAction } from "../actions/get-config";
import { createOrganizationConfigAction } from "../actions/create-config";
import { updateOrganizationConfigAction } from "../actions/update-config";

export default function OrgConfigForm() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasConfig, setHasConfig] = useState(false);

  const form = useForm<OrganizationConfigInput>({
    resolver: zodResolver(organizationConfigSchema),
    defaultValues: {
      paymentMethod: "MANUAL",
      qrCodeUrl: "",
      isActive: true,
      key: "PAYMENT_CONFIG",
      value: "",
    },
  });

  useEffect(() => {
    async function loadConfig() {
      try {
        setIsLoading(true);
        const result = await getOrganizationConfigAction();
        if (result.success && result.data) {
          setHasConfig(true);
          form.reset({
            paymentMethod: result.data.paymentMethod || "MANUAL",
            qrCodeUrl: result.data.qrCodeUrl || "",
            isActive: result.data.isActive ?? true,
            key: result.data.key || "PAYMENT_CONFIG",
            value: result.data.value || "",
          });
        }
      } catch (error) {
        toast.error("Failed to load organization config");
      } finally {
        setIsLoading(false);
      }
    }

    loadConfig();
  }, [form]);

  const onSubmit = async (data: OrganizationConfigInput) => {
    const action = hasConfig
      ? updateOrganizationConfigAction
      : createOrganizationConfigAction;

    const result = await action(data);
    if (!result.success) {
      toast.error(result.message || "Failed to save config");
      return;
    }

    toast.success(result.message || "Config saved successfully");
    setHasConfig(true);
  };

  const handleUploadComplete = (url: string) => {
    form.setValue("qrCodeUrl", url, { shouldValidate: true });
    toast.success("QR code uploaded successfully");
  };

  const handleUploadError = () => {
    toast.error("Failed to upload QR code");
  };

  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="w-full max-w-2xl space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold">Organization Config</h2>
        <p className="text-sm text-muted-foreground">
          Configure payment settings and organization-level flags.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="paymentMethod">Payment Method</Label>
          <select
            id="paymentMethod"
            className="w-full rounded border border-input px-3 py-2 text-sm"
            {...form.register("paymentMethod")}
          >
            <option value="MANUAL">MANUAL</option>
            <option value="ESEWA">ESEWA</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="key">Config Key</Label>
          <Input
            id="key"
            placeholder="PAYMENT_CONFIG"
            {...form.register("key")}
          />
          {form.formState.errors.key && (
            <p className="text-xs text-destructive">
              {form.formState.errors.key.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="value">Config Value (optional)</Label>
          <Input
            id="value"
            placeholder="Optional value"
            {...form.register("value")}
          />
          {form.formState.errors.value && (
            <p className="text-xs text-destructive">
              {form.formState.errors.value.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="qrCodeUrl">QR Code URL (optional)</Label>
          <Input
            id="qrCodeUrl"
            placeholder="https://..."
            {...form.register("qrCodeUrl")}
          />
          {form.formState.errors.qrCodeUrl && (
            <p className="text-xs text-destructive">
              {form.formState.errors.qrCodeUrl.message}
            </p>
          )}
        </div>

        <ImageUploader
          onUploadComplete={handleUploadComplete}
          onError={handleUploadError}
          folder="/org-config"
          label="Upload QR Code"
        />

        <div className="space-y-2">
          <Label htmlFor="isActive">Config Status</Label>
          <select
            id="isActive"
            className="w-full rounded border border-input px-3 py-2 text-sm"
            {...form.register("isActive", {
              setValueAs: (value) => value === "true",
            })}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Saving..." : "Save Config"}
        </Button>
      </form>
    </div>
  );
}
