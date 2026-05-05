import { db } from "@/lib/db/client";
import { organizationConfigTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { OrganizationConfigInput } from "../types/config.types";

type OrganizationConfigRow = typeof organizationConfigTable.$inferSelect;

export type OrganizationConfigRecord = Omit<
  OrganizationConfigRow,
  "paymentMethod" | "qrCodeUrl"
> & {
  paymentMethod: OrganizationConfigInput["paymentMethod"];
  qrCodeUrl: string | null;
  phoneNumber: string;
};

export async function getOrganizationConfigByOrg(organizationId: string) {
  const config = await db
    .select()
    .from(organizationConfigTable)
    .where(eq(organizationConfigTable.organizationId, organizationId))
    .limit(1);

  const row = config[0] as
    | (OrganizationConfigRow & { value?: string | null })
    | undefined;

  if (!row) {
    return null;
  }

  return {
    ...row,
    phoneNumber: row.value ?? "",
  } as OrganizationConfigRecord;
}

export async function createOrganizationConfig(
  organizationId: string,
  data: OrganizationConfigInput,
) {
  const result = await db
    .insert(organizationConfigTable)
    .values({
      organizationId,
      paymentMethod: data.paymentMethod,
      qrCodeUrl: data.qrCodeUrl?.trim() || null,
      isActive: true,
      key: "PAYMENT_CONFIG",
      value: data.phoneNumber?.trim() || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  const row = result[0] as OrganizationConfigRow & { value?: string | null };

  return {
    ...row,
    phoneNumber: row.value ?? "",
  } as OrganizationConfigRecord;
}

export async function updateOrganizationConfig(
  organizationId: string,
  data: OrganizationConfigInput,
) {
  const result = await db
    .update(organizationConfigTable)
    .set({
      paymentMethod: data.paymentMethod,
      qrCodeUrl: data.qrCodeUrl?.trim() || null,
      isActive: true,
      key: "PAYMENT_CONFIG",
      value: data.phoneNumber?.trim() || null,
      updatedAt: new Date(),
    })
    .where(eq(organizationConfigTable.organizationId, organizationId))
    .returning();

  const row = result[0] as OrganizationConfigRow & { value?: string | null };

  return {
    ...row,
    phoneNumber: row.value ?? "",
  } as OrganizationConfigRecord;
}
