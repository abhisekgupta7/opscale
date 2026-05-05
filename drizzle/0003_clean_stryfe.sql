CREATE TABLE "notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"orgId" uuid NOT NULL,
	"type" varchar(50) NOT NULL,
	"message" varchar(500) NOT NULL,
	"isRead" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "categories" DROP CONSTRAINT "categories_parentId_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "customers" ALTER COLUMN "phone" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_orgId_organizations_id_fk" FOREIGN KEY ("orgId") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "customer_phone_idx" ON "customers" USING btree ("phone");--> statement-breakpoint
ALTER TABLE "categories" DROP COLUMN "parentId";--> statement-breakpoint
ALTER TABLE "categories" DROP COLUMN "categoryPhoto";--> statement-breakpoint
ALTER TABLE "organization_config" DROP COLUMN "isActive";--> statement-breakpoint
ALTER TABLE "organization_config" DROP COLUMN "key";--> statement-breakpoint
ALTER TABLE "organization_config" DROP COLUMN "value";--> statement-breakpoint
ALTER TABLE "payments" DROP COLUMN "referenceType";--> statement-breakpoint
ALTER TABLE "customers" ADD CONSTRAINT "customer_org_phone_unique" UNIQUE("organizationId","phone");