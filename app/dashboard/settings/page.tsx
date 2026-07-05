import OrganizationSettingsForm from "@/app/features/auth/components/organization-settings-form";
import OrgConfigForm from "@/app/features/OrgConfig/components/config-form";
import ShareablePaymentLink from "@/app/dashboard/components/shareable-payment-link";
import { getActiveOrganizationDetails } from "@/app/features/auth/actions/organization";
import { PushNotificationManager } from "@/app/features/pushnotification/components/pushNotification";

export default async function SettingsPage() {
  const orgResult = await getActiveOrganizationDetails();
  const orgName =
    orgResult.success && orgResult.data ? orgResult.data.name : "";
  const orgId = orgResult.success && orgResult.data ? orgResult.data.id : "";

  return (
    <div className="space-y-6">
      <div>

        <h1 className="text-2xl font-semibold text-foreground">
          Organization Settings
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage organization profile and billing/payment configuration.
        </p>
      </div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <PushNotificationManager />
       
      </div>

      {orgId && <ShareablePaymentLink organizationId={orgId} />}

      <div className="grid gap-6 lg:grid-cols-2">
        <OrganizationSettingsForm initialName={orgName} />
        <OrgConfigForm />
      </div>
    </div>
  );
}
