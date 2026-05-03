import { z } from "zod";

const optionalUrl = z.union([
  z.string().url("QR code must be a valid URL"),
  z.literal(""),
]);

const optionalText = z.union([
  z.string().max(1000, "Value must be 1000 characters or less"),
  z.literal(""),
]);

export const organizationConfigSchema = z.object({
  paymentMethod: z.enum(["MANUAL", "ESEWA"]),
  qrCodeUrl: optionalUrl.optional(),
  isActive: z.boolean(),
  key: z.string().min(2, "Key must be at least 2 characters"),
  value: optionalText.optional(),
});

export const createOrganizationConfigSchema = organizationConfigSchema;

export const updateOrganizationConfigSchema = organizationConfigSchema;

export type OrganizationConfigInput = z.infer<typeof organizationConfigSchema>;
export type CreateOrganizationConfigInput = z.infer<
  typeof createOrganizationConfigSchema
>;
export type UpdateOrganizationConfigInput = z.infer<
  typeof updateOrganizationConfigSchema
>;
