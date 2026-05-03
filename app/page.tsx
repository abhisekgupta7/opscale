import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Package,
  ShieldCheck,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PricingSection as BillingPricingSection } from "@/app/features/billing/components/pricing-section";

const platformHighlights = [
  {
    title: "Inventory clarity",
    description:
      "Track SKU movement, margin drift, and available stock with one glance.",
    icon: Package,
  },
  {
    title: "Customer accounts",
    description:
      "Single view of balances, credit limits, and payment behavior.",
    icon: Users,
  },
  {
    title: "Receivables engine",
    description:
      "Automated reminders, faster collections, and real-time AR aging.",
    icon: Wallet,
  },
  {
    title: "Actionable insights",
    description: "Spot revenue leaks early with live trends and risk signals.",
    icon: BarChart3,
  },
];

const workflowSteps = [
  {
    title: "Create order",
    description:
      "Search customers, add products, and price fast with built-in defaults.",
  },
  {
    title: "Collect payment",
    description:
      "Send QR links, reconcile proofs, and keep ledger entries clean.",
  },
  {
    title: "Close the loop",
    description: "Automate statements, reminders, and follow-ups in minutes.",
  },
];

const metrics = [
  { label: "Faster collections", value: "37%" },
  { label: "Average order value", value: "Rs. 82k" },
  { label: "On-time payments", value: "91%" },
];

const faqs = [
  {
    question: "How does OpScale replace spreadsheets?",
    answer:
      "Every order, payment, and ledger entry lives in one workspace. The system updates balances and inventory in real time, so your team never reconciles manually.",
  },
  {
    question: "Can I manage multiple branches or orgs?",
    answer:
      "Yes. Each tenant has isolated data, roles, and reporting. You can switch orgs instantly without mixing inventory or receivables.",
  },
  {
    question: "What about manual payment proofs?",
    answer:
      "Upload QR proofs and mark them verified in a single review queue. Approvals sync to ledger entries immediately.",
  },
  {
    question: "How fast is onboarding?",
    answer:
      "Most teams onboard within one week with catalog imports, customer mapping, and custom payment terms setup.",
  },
];

export default function Home() {
  return (
    <div className="bg-[#0b0f14] text-slate-100">
      <HeroSection />
      <PlatformSection />
      <WorkflowSection />
      <MetricsSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 pb-20 pt-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute right-0 top-[-10%] h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
              <span>Wholesale command center</span>
            </div>

            <div className="space-y-5">
              <h1 className="text-5xl font-semibold leading-tight tracking-tight text-slate-100 sm:text-6xl lg:text-7xl">
                Run wholesale operations
                <span className="block text-slate-400">
                  with calm precision.
                </span>
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-slate-400">
                OpScale gives owners one clean workspace for inventory, orders,
                customer balances, and payments. No clutter. No spreadsheet
                drift.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="h-10 bg-emerald-400 px-5 text-emerald-950 hover:bg-emerald-300"
              >
                <Link href="/#pricing">Start free trial</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="h-10 border border-white/10 bg-white/5 px-5 text-slate-200 hover:bg-white/10"
              >
                <Link href="/billing/manual">Schedule demo</Link>
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Unified order + payment workflow",
                "Real-time AR and cash flow signals",
                "Built-in credit limits and alerts",
                "Role-based access for teams",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-6 border-t border-white/10 pt-6">
              <div className="flex items-center -space-x-3">
                {["SK", "NT", "RV"].map((initial) => (
                  <div
                    key={initial}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-slate-200"
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-100">
                  Trusted by 500+ wholesale teams
                </p>
                <p className="text-sm text-slate-400">
                  Managing Rs. 2B+ in annual GMV
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[28px] bg-white/5 blur-2xl" />
            <div className="relative rounded-[28px] border border-white/10 bg-[#0f141b] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Live overview
                  </p>
                  <p className="text-lg font-semibold text-slate-100">
                    Operations snapshot
                  </p>
                </div>
                <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                  Healthy
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Daily collections</span>
                    <span>+18%</span>
                  </div>
                  <div className="mt-3 flex items-end gap-2">
                    {[28, 45, 32, 58, 48, 64, 54].map((height, index) => (
                      <div
                        key={index}
                        className="w-4 rounded-full bg-emerald-400/30"
                        style={{ height: `${height}px` }}
                      />
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      AR at risk
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-100">
                      Rs. 1.82L
                    </p>
                    <p className="text-xs text-slate-400">
                      12% lower than last month
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      Fulfillment speed
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-100">
                      2.4x
                    </p>
                    <p className="text-xs text-slate-400">
                      Faster than baseline
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between text-sm text-slate-200">
                    <span>Operations health</span>
                    <span className="text-emerald-300">Strong</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-4/5 rounded-full bg-emerald-400" />
                  </div>
                </div>
              </div>
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
                "Create order for Sapphire Foods",
                "Verify QR payment proof",
                "Send statement to Radiant Mart",
                "Approve credit limit increase",
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
              Payment verification turnaround improved by 41% last month.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricsSection() {
  return (
    <section className="border-t border-white/10 bg-[#0b0f14] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-4">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Impact
            </div>
            <h2 className="text-4xl font-semibold text-slate-100 sm:text-5xl">
              Finance-grade outcomes without the overhead.
            </h2>
            <p className="text-base text-slate-400">
              Stay on top of margins, outstanding dues, and collections with
              insight cards built for owners.
            </p>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <ShieldCheck className="h-4 w-4 text-emerald-300" />
              Fintech-grade security and audit trails by default.
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <p className="text-2xl font-semibold text-slate-100">
                  {metric.value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-500">
                  {metric.label}
                </p>
              </div>
            ))}
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
                <Link href="/billing/manual">Book a strategy call</Link>
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
