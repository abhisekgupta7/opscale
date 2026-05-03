CREATE TYPE "public"."payment_context" AS ENUM('PLATFORM', 'ORG');--> statement-breakpoint
CREATE TYPE "public"."payment_provider" AS ENUM('MANUAL', 'ESEWA');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('PENDING', 'VERIFIED', 'REJECTED');--> statement-breakpoint
CREATE TYPE "public"."payment_reference_type" AS ENUM('ORDER', 'SUBSCRIPTION');--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organizationId" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"parentId" uuid,
	"categoryPhoto" varchar(255),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "customers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organizationId" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(20),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ledger_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organizationId" uuid NOT NULL,
	"type" varchar(50) NOT NULL,
	"amount" integer NOT NULL,
	"description" varchar(500),
	"referenceId" uuid,
	"referenceType" varchar(50),
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"orderId" uuid NOT NULL,
	"productId" uuid NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"price" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organizationId" uuid NOT NULL,
	"customerId" uuid NOT NULL,
	"totalAmount" integer NOT NULL,
	"status" varchar(50) DEFAULT 'PENDING' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organization_config" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organizationId" uuid NOT NULL,
	"paymentMethod" varchar(50) DEFAULT 'MANUAL' NOT NULL,
	"qrCodeUrl" varchar(255),
	"isActive" boolean DEFAULT true NOT NULL,
	"key" varchar(255) NOT NULL,
	"value" varchar(1000),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "organization_config_organizationId_unique" UNIQUE("organizationId")
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organizationId" uuid,
	"userId" uuid NOT NULL,
	"customerId" uuid,
	"context" "payment_context" NOT NULL,
	"provider" "payment_provider" DEFAULT 'MANUAL' NOT NULL,
	"pidx" varchar(255),
	"amount" integer NOT NULL,
	"currency" varchar(10) DEFAULT 'NPR' NOT NULL,
	"status" "payment_status" DEFAULT 'PENDING' NOT NULL,
	"proofUrl" varchar(255),
	"referenceType" "payment_reference_type",
	"referenceId" varchar(255),
	"verifiedAt" timestamp,
	"verifiedBy" uuid,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "unique_provider_pidx" UNIQUE("provider","pidx")
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organizationId" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(1000),
	"price" integer NOT NULL,
	"categoryId" uuid,
	"imageUrl" varchar(500),
	"stock" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "unique_product_per_org" UNIQUE("organizationId","name")
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organizationId" uuid NOT NULL,
	"plan" varchar(50) DEFAULT 'FREE' NOT NULL,
	"status" varchar(50) DEFAULT 'ACTIVE' NOT NULL,
	"currentPeriodEnd" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "subscriptions_organizationId_unique" UNIQUE("organizationId")
);
--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_organizationId_organizations_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_parentId_categories_id_fk" FOREIGN KEY ("parentId") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customers" ADD CONSTRAINT "customers_organizationId_organizations_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ledger_entries" ADD CONSTRAINT "ledger_entries_organizationId_organizations_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_orderId_orders_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_organizationId_organizations_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_customerId_customers_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_config" ADD CONSTRAINT "organization_config_organizationId_organizations_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_organizationId_organizations_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_customerId_customers_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_verifiedBy_users_id_fk" FOREIGN KEY ("verifiedBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_organizationId_organizations_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_organizationId_organizations_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "ledger_org_idx" ON "ledger_entries" USING btree ("organizationId");--> statement-breakpoint
CREATE INDEX "ledger_reference_idx" ON "ledger_entries" USING btree ("referenceId","referenceType");--> statement-breakpoint
CREATE INDEX "payments_org_idx" ON "payments" USING btree ("organizationId");--> statement-breakpoint
CREATE INDEX "payments_user_idx" ON "payments" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "payments_customer_idx" ON "payments" USING btree ("customerId");--> statement-breakpoint
CREATE INDEX "products_org_name_idx" ON "products" USING btree ("organizationId","name");--> statement-breakpoint
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_name_unique" UNIQUE("name");