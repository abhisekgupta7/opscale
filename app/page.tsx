import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  Package,
  ShieldCheck,
  Wallet,
  Zap,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PricingSection as BillingPricingSection } from "@/app/features/billing/components/pricing-section";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { isSubscriptionActive } from "./features/billing/services/payment.services";
import {
  getOrganizationById,
  verifyMembership,
} from "./features/auth/services/membership.service";

const platformHighlights = [
  {
    title: "Inventory management",
    description: "Keep stock, SKUs and movements accurate across branches.",
    icon: Package,
  },
  {
    title: "Order tracking",
    description:
      "End-to-end order lifecycle visibility from creation to delivery.",
    icon: BarChart3,
  },
  {
    title: "Khata system",
    description: "Customer ledgers and automated payment recovery.",
    icon: Wallet,
  },
  {
    title: "Digital ledger",
    description:
      "Immutable financial records and reconciled balances in one place.",
    icon: ShieldCheck,
  },
];

const workflowSteps = [
  {
    title: "Create order",
    description: "Quickly add items, set prices, and capture order details.",
  },
  {
    title: "Track & fulfill",
    description: "Monitor order status and shipment until delivery.",
  },
  {
    title: "Reconcile & recover",
    description: "Post payments to khata and streamline recovery flows.",
  },
];

const faqs = [
  {
    question: "How does OpScale replace spreadsheets?",
    answer:
      "OpScale centralizes orders, payments, customers, and ledger entries in one workspace. That gives your team a single source of truth with less manual reconciliation and fewer data mistakes.",
  },
  {
    question: "Can I manage multiple branches or organizations?",
    answer:
      "Yes. Each organization keeps its own users, inventory, customers, and payments separated, so reporting stays clean and branch data never mixes.",
  },
  {
    question: "How are manual payment proofs handled?",
    answer:
      "Users upload a screenshot or QR proof, then an owner reviews it in a dedicated queue. Once approved, the payment updates the ledger and subscription status automatically.",
  },
  {
    question: "How quickly can a team get started?",
    answer:
      "Most teams can go live quickly with product setup, customer import, and payment configuration. The platform is designed to be usable without a long implementation cycle.",
  },
];

export default async function Home() {
  const session = await getServerSession(authOptions);
  const activeOrgId = session?.user?.activeOrgId;
  if (activeOrgId) {
    const [organization, membership, hasActiveSubscription] = await Promise.all(
      [
        getOrganizationById(activeOrgId),
        session?.user?.id
          ? verifyMembership(session.user.id, activeOrgId)
          : Promise.resolve(null),
        isSubscriptionActive(activeOrgId),
      ],
    );

    if (organization && membership && hasActiveSubscription) {
      redirect("/dashboard");
    }
  }

  return (
    <div className="bg-[#0b0f14] text-slate-100">
      <HeroSection />
      <PlatformSection />
      <WorkflowSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 pb-32 pt-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute right-0 top-[-10%] h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
              <span>Wholesale command center</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl font-semibold leading-tight tracking-tight text-slate-100 sm:text-6xl lg:text-7xl">
                Run wholesale operations
                <span className="block text-slate-400 text-2xl">
                  with calm precision.
                </span>
              </h1>
              <p className="max-w-lg text-lg leading-relaxed text-slate-400">
                OpScale gives owners one workspace for inventory, orders,
                customer balances, and payments — automated and accurate.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="h-12 bg-emerald-400 px-6 text-emerald-950 hover:bg-emerald-300 text-base"
              >
                <Link href="/#pricing">Start free trial</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="h-12 border border-white/10 bg-white/5 px-6 text-slate-200 hover:bg-white/10 text-base"
              >
                <Link href="/billing/manual">Schedule demo</Link>
              </Button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="flex items-center justify-end">
              <Image
                src="/og-image.png"
                alt="OpScale Platform"
                width={720}
                height={480}
                className="w-full rounded-2xl border border-white/10 bg-white/5 object-cover shadow-sm"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlatformSection() {
  return (
    <section id="platform" className="bg-[#0b0f14] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 flex flex-col gap-4">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Platform
          </div>
          <h2 className="text-4xl font-semibold text-slate-100 sm:text-5xl">
            Built for high-velocity wholesale teams
          </h2>
          <p className="max-w-2xl text-base text-slate-400">
            Every module is designed for fast action and clear financial
            visibility, without drowning your team in dashboards.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {platformHighlights.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left text-slate-100 shadow-sm"
              >
                <div className="mb-4 inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-3 text-emerald-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-100">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  {item.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WorkflowSection() {
  return (
    <section
      id="workflow"
      className="border-t border-white/10 bg-[#0f141b] py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-5">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Workflow
            </div>
            <h2 className="text-4xl font-semibold text-slate-100 sm:text-5xl">
              A workflow your team can run on autopilot.
            </h2>
            <p className="text-base text-slate-400">
              From order creation to payment verification, every step is
              optimized to reduce manual effort and shorten cash cycles.
            </p>
            <div className="space-y-4">
              {workflowSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-400/10 text-sm font-semibold text-emerald-300">
                    0{index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-100">
                      {step.title}
                    </p>
                    <p className="text-sm text-slate-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[#0b0f14] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Quick actions
                </p>
                <p className="text-lg font-semibold text-slate-100">
                  Team command list
                </p>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
                Live
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {[
                "Create wholesale order with customer invoice",
                "Verify QR payment proof and reconcile",
                "Update ledger entries after payment approval",
                "Auto-update ledger with payment entry",
              ].map((task) => (
                <div
                  key={task}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300"
                >
                  <div className="flex items-center gap-3">
                    <Zap className="h-4 w-4 text-emerald-300" />
                    {task}
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-500" />
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-xs text-emerald-200">
              ✓ Automate your entire payment recovery workflow.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section
      id="pricing"
      className="border-t border-white/10 bg-[#0f141b] py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Pricing
          </div>
          <h2 className="mb-4 text-4xl font-semibold text-slate-100 sm:text-5xl">
            Transparent plans for every stage
          </h2>
          <p className="mx-auto max-w-2xl text-base text-slate-400">
            Launch quickly, scale confidently, and pay only for what you need.
          </p>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-10">
          <BillingPricingSection />
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="border-t border-white/10 bg-[#0b0f14] py-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            FAQ
          </div>
          <h2 className="mb-4 text-4xl font-semibold text-slate-100 sm:text-5xl">
            Your team’s most common questions
          </h2>
          <p className="text-base text-slate-400">
            Everything you need to know before onboarding.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`item-${index}`}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 data-[state=open]:border-emerald-400/40"
            >
              <AccordionTrigger className="px-6 py-4 text-left text-sm font-semibold text-slate-100 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-sm text-slate-400">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="border-t border-white/10 bg-[#0f141b] py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0b0f14] p-10 text-center shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-12">
          <div className="absolute inset-0 opacity-70">
            <div className="absolute left-8 top-8 h-24 w-24 rounded-full bg-emerald-500/15 blur-2xl" />
            <div className="absolute bottom-6 right-10 h-32 w-32 rounded-full bg-white/5 blur-2xl" />
          </div>
          <div className="relative">
            <div className="mb-5 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Ready to launch
            </div>
            <h2 className="mb-5 text-4xl font-semibold text-slate-100 sm:text-5xl">
              Move your wholesale operations into a calm, fast OS.
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-base text-slate-400">
              Book a tailored demo or start your trial. We will map your
              catalog, customer data, and payment terms quickly.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-10 bg-emerald-400 px-5 text-emerald-950 hover:bg-emerald-300"
              >
                <Link href="/contact">Book a strategy call</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="h-10 border border-white/10 bg-white/5 px-5 text-slate-200 hover:bg-white/10"
              >
                <Link href="/#pricing">View pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
