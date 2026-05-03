import { db } from "@/lib/db/client";
import { organizationConfigTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { OrganizationConfigInput } from "../types/config.types";

export interface OrganizationConfigRecord extends OrganizationConfigInput {
  id: string;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function getOrganizationConfigByOrg(organizationId: string) {
  const config = await db
    .select()
    .from(organizationConfigTable)
    .where(eq(organizationConfigTable.organizationId, organizationId))
    .limit(1);

  return (config[0] as OrganizationConfigRecord) || null;
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
      qrCodeUrl: data.qrCodeUrl || null,
      isActive: data.isActive,
      key: data.key,
      value: data.value || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  return result[0] as OrganizationConfigRecord;
}

export async function updateOrganizationConfig(
  organizationId: string,
  data: OrganizationConfigInput,
) {
  const result = await db
    .update(organizationConfigTable)
    .set({
      paymentMethod: data.paymentMethod,
      qrCodeUrl: data.qrCodeUrl || null,
      isActive: data.isActive,
      key: data.key,
      value: data.value || null,
      updatedAt: new Date(),
    })
    .where(eq(organizationConfigTable.organizationId, organizationId))
    .returning();

  return result[0] as OrganizationConfigRecord;
}
