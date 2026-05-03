import OrganizationSettingsForm from "@/app/features/auth/components/organization-settings-form";
import OrgConfigForm from "@/app/features/OrgConfig/components/congfig-form";
import { getActiveOrganizationDetails } from "@/app/features/auth/actions/organization";

export default async function SettingsPage() {
  const orgResult = await getActiveOrganizationDetails();
  const orgName =
    orgResult.success && orgResult.data ? orgResult.data.name : "";

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Settings
        </p>
        <h1 className="text-2xl font-semibold text-foreground">
          Organization Settings
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage organization profile and billing/payment configuration.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <OrganizationSettingsForm initialName={orgName} />
        <OrgConfigForm />
      </div>
    </div>
  );
}
