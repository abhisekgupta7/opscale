import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Footer from "@/components/Utility/Footer";
import Navbar from "@/components/Utility/Navbar";

const services = [
  {
    title: "E-Commerce Platform",
    badge: "Digital",
    description:
      "Transform your wholesale business online. Showcase your products with a powerful e-commerce solution designed for bulk ordering and B2B transactions.",
  },
  {
    title: "Account Management",
    badge: "Finance",
    description:
      "Track customer accounts, monitor due amounts, and manage credit limits effortlessly. Real-time visibility into outstanding payments and receivables.",
  },
  {
    title: "Payment Automation",
    badge: "Automation",
    description:
      "Automate payment collection, send payment reminders, and reconcile transactions automatically. Reduce manual work and improve cash flow.",
  },
  {
    title: "Smart Notifications",
    badge: "Communication",
    description:
      "Keep your customers informed with automated notifications for order updates, payment reminders, due dates, and account statements.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 font-sans">
      <Navbar />
      <HomeSection />
      <div className="mx-auto max-w-7xl">
        <Separator className="bg-neutral-800/50" />
      </div>
      <ServicesSection />
      <div className="mx-auto max-w-7xl">
        <Separator className="bg-neutral-800/50" />
      </div>
      <PricingSection />
      <div className="mx-auto max-w-7xl">
        <Separator className="bg-neutral-800/50" />
      </div>
      <ContactsSection />
      <div className="mx-auto max-w-7xl">
        <Separator className="bg-neutral-800/50" />
      </div>
      <AboutServiesSection />
      <Footer />
    </div>
  );
}
function HomeSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-neutral-900/50 via-neutral-950 to-neutral-950" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 rounded-full border border-neutral-800 bg-neutral-900/50 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span className="text-sm text-neutral-400">
                Enterprise Solution
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-neutral-100 sm:text-5xl lg:text-6xl">
              Automate Your{" "}
              <span className="bg-linear-to-r from-neutral-100 to-neutral-400 bg-clip-text text-transparent">
                Wholesale Business
              </span>
            </h1>

            <p className="text-lg leading-relaxed text-neutral-400">
              Complete business automation platform for wholesalers. Take your
              products online, automate payment collection, manage customer
              accounts, and streamline operations with intelligent
              notifications—all in one unified platform.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button className="rounded-lg bg-linear-to-r from-neutral-100 to-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-950 shadow-lg transition-all hover:from-neutral-200 hover:to-neutral-400 hover:shadow-xl">
                Start Free Trial
              </button>
              <button className="rounded-lg border border-neutral-800 bg-neutral-900/50 px-6 py-3 text-sm font-semibold text-neutral-100 transition-all hover:border-neutral-700 hover:bg-neutral-800/50">
                Schedule Demo
              </button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex -space-x-3">
                <div className="h-10 w-10 rounded-full border-2 border-neutral-950 bg-linear-to-br from-neutral-700 to-neutral-800"></div>
                <div className="h-10 w-10 rounded-full border-2 border-neutral-950 bg-linear-to-br from-neutral-600 to-neutral-700"></div>
                <div className="h-10 w-10 rounded-full border-2 border-neutral-950 bg-linear-to-br from-neutral-500 to-neutral-600"></div>
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-300">
                  Trusted by 500+ businesses
                </p>
                <p className="text-xs text-neutral-500">
                  Join growing wholesale enterprises
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Stats Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-neutral-800/50 bg-neutral-900/30 p-6 backdrop-blur-sm">
              <div className="mb-2 text-3xl font-bold text-neutral-100">
                99.9%
              </div>
              <div className="text-sm text-neutral-400">Uptime SLA</div>
            </div>
            <div className="rounded-xl border border-neutral-800/50 bg-neutral-900/30 p-6 backdrop-blur-sm">
              <div className="mb-2 text-3xl font-bold text-neutral-100">
                24/7
              </div>
              <div className="text-sm text-neutral-400">Support Available</div>
            </div>
            <div className="rounded-xl border border-neutral-800/50 bg-neutral-900/30 p-6 backdrop-blur-sm">
              <div className="mb-2 text-3xl font-bold text-neutral-100">
                50%
              </div>
              <div className="text-sm text-neutral-400">Faster Processing</div>
            </div>
            <div className="rounded-xl border border-neutral-800/50 bg-neutral-900/30 p-6 backdrop-blur-sm">
              <div className="mb-2 text-3xl font-bold text-neutral-100">
                10k+
              </div>
              <div className="text-sm text-neutral-400">Transactions Daily</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function ServicesSection() {
  return (
    <section id="services" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center space-x-2 rounded-full border border-neutral-800 bg-neutral-900/50 px-4 py-1.5">
            <span className="text-sm font-medium text-neutral-400">
              FEATURES
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-neutral-100 sm:text-4xl">
            Enterprise-Grade Solutions
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-400">
            Comprehensive automation solutions designed specifically for
            wholesale businesses. From online storefronts to payment automation,
            we help you modernize operations.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-neutral-800/50 bg-neutral-900/30 p-6 backdrop-blur-sm transition-all hover:border-neutral-700 hover:bg-neutral-900/50"
            >
              <div className="absolute inset-0 bg-linear-to-br from-neutral-800/0 via-neutral-800/0 to-neutral-800/10 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <Badge
                  className="mb-4 border-neutral-700 bg-neutral-800/50 text-neutral-300"
                  variant="secondary"
                >
                  {service.badge}
                </Badge>
                <h3 className="mb-3 text-lg font-semibold text-neutral-100">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-400">
                  {service.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
function PricingSection() {
  return (
    <section id="pricing" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center space-x-2 rounded-full border border-neutral-800 bg-neutral-900/50 px-4 py-1.5">
            <span className="text-sm font-medium text-neutral-400">
              PRICING
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-neutral-100 sm:text-4xl">
            Transparent Pricing
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-400">
            Our pricing is competitive and transparent. Contact us for a custom
            quote based on your specific needs and order volume.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Starter Plan */}
          <div className="rounded-2xl border border-neutral-800/50 bg-neutral-900/30 p-8 backdrop-blur-sm">
            <div className="mb-6">
              <h3 className="mb-2 text-xl font-semibold text-neutral-100">
                Starter
              </h3>
              <p className="text-sm text-neutral-400">
                For small wholesale businesses
              </p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-neutral-100">$99</span>
              <span className="text-neutral-400">/month</span>
            </div>
            <button className="w-full rounded-lg border border-neutral-800 bg-neutral-900/50 px-4 py-2.5 text-sm font-semibold text-neutral-100 transition-all hover:border-neutral-700 hover:bg-neutral-800/50">
              Get Started
            </button>
          </div>

          {/* Professional Plan */}
          <div className="relative rounded-2xl border border-neutral-700 bg-neutral-900/50 p-8 shadow-xl backdrop-blur-sm">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="rounded-full border border-neutral-700 bg-neutral-800 px-4 py-1 text-xs font-semibold text-neutral-100">
                POPULAR
              </span>
            </div>
            <div className="mb-6">
              <h3 className="mb-2 text-xl font-semibold text-neutral-100">
                Professional
              </h3>
              <p className="text-sm text-neutral-400">For growing businesses</p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-neutral-100">$299</span>
              <span className="text-neutral-400">/month</span>
            </div>
            <button className="w-full rounded-lg bg-linear-to-r from-neutral-100 to-neutral-300 px-4 py-2.5 text-sm font-semibold text-neutral-950 shadow-lg transition-all hover:from-neutral-200 hover:to-neutral-400">
              Get Started
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="rounded-2xl border border-neutral-800/50 bg-neutral-900/30 p-8 backdrop-blur-sm">
            <div className="mb-6">
              <h3 className="mb-2 text-xl font-semibold text-neutral-100">
                Enterprise
              </h3>
              <p className="text-sm text-neutral-400">
                For large organizations
              </p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-neutral-100">
                Custom
              </span>
            </div>
            <button className="w-full rounded-lg border border-neutral-800 bg-neutral-900/50 px-4 py-2.5 text-sm font-semibold text-neutral-100 transition-all hover:border-neutral-700 hover:bg-neutral-800/50">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
function ContactsSection() {
  return (
    <section id="contacts" className="py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="rounded-2xl border border-neutral-800/50 bg-neutral-900/30 p-12 text-center backdrop-blur-sm">
          <div className="mb-4 inline-flex items-center space-x-2 rounded-full border border-neutral-800 bg-neutral-900/50 px-4 py-1.5">
            <span className="text-sm font-medium text-neutral-400">
              CONTACT
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-neutral-100 sm:text-4xl">
            Let's Talk About Your Business
          </h2>
          <p className="mb-8 text-lg text-neutral-400">
            Have questions or want to learn more about our automation solutions?
            Our team is ready to help you transform your wholesale operations.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button className="rounded-lg bg-linear-to-r from-neutral-100 to-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-950 shadow-lg transition-all hover:from-neutral-200 hover:to-neutral-400">
              Schedule Consultation
            </button>
            <button className="rounded-lg border border-neutral-800 bg-neutral-900/50 px-6 py-3 text-sm font-semibold text-neutral-100 transition-all hover:border-neutral-700 hover:bg-neutral-800/50">
              Email Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
function AboutServiesSection() {
  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center space-x-2 rounded-full border border-neutral-800 bg-neutral-900/50 px-4 py-1.5">
            <span className="text-sm font-medium text-neutral-400">FAQ</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-neutral-100 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-neutral-400">
            Learn more about our wholesale business automation platform
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem
            value="item-1"
            className="rounded-lg border border-neutral-800/50 bg-neutral-900/30 px-6 backdrop-blur-sm data-[state=open]:border-neutral-700"
          >
            <AccordionTrigger className="text-left font-semibold text-neutral-100 hover:text-neutral-200 hover:no-underline">
              What is wholesale business automation?
            </AccordionTrigger>
            <AccordionContent className="text-neutral-400">
              Wholesale business automation is a comprehensive platform that
              digitizes and streamlines your entire operation. It includes
              e-commerce capabilities to take your products online, automated
              account management for tracking receivables, payment automation
              for efficient collection, and smart notifications to keep everyone
              informed.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-2"
            className="rounded-lg border border-neutral-800/50 bg-neutral-900/30 px-6 backdrop-blur-sm data-[state=open]:border-neutral-700"
          >
            <AccordionTrigger className="text-left font-semibold text-neutral-100 hover:text-neutral-200 hover:no-underline">
              How does payment automation work?
            </AccordionTrigger>
            <AccordionContent className="text-neutral-400">
              Our payment automation system automatically sends payment
              reminders based on due dates, tracks outstanding amounts,
              reconciles transactions, and provides real-time visibility into
              your cash flow. You can configure reminder schedules and automate
              follow-ups to reduce manual collection efforts.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-3"
            className="rounded-lg border border-neutral-800/50 bg-neutral-900/30 px-6 backdrop-blur-sm data-[state=open]:border-neutral-700"
          >
            <AccordionTrigger className="text-left font-semibold text-neutral-100 hover:text-neutral-200 hover:no-underline">
              Can I track customer due amounts?
            </AccordionTrigger>
            <AccordionContent className="text-neutral-400">
              Yes! Our account management system provides complete visibility
              into all customer accounts, outstanding balances, payment history,
              credit limits, and aging reports. You can easily retrieve account
              information and monitor who owes what at any time.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-4"
            className="rounded-lg border border-neutral-800/50 bg-neutral-900/30 px-6 backdrop-blur-sm data-[state=open]:border-neutral-700"
          >
            <AccordionTrigger className="text-left font-semibold text-neutral-100 hover:text-neutral-200 hover:no-underline">
              What kind of notifications are supported?
            </AccordionTrigger>
            <AccordionContent className="text-neutral-400">
              Our smart notification system supports multiple channels including
              SMS, email, and WhatsApp. Notifications can be sent for order
              confirmations, payment reminders, due date alerts, account
              statements, shipment updates, and custom messages. All
              notifications are automated based on triggers you configure.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-5"
            className="rounded-lg border border-neutral-800/50 bg-neutral-900/30 px-6 backdrop-blur-sm data-[state=open]:border-neutral-700"
          >
            <AccordionTrigger className="text-left font-semibold text-neutral-100 hover:text-neutral-200 hover:no-underline">
              How quickly can I get started?
            </AccordionTrigger>
            <AccordionContent className="text-neutral-400">
              Getting started is quick and easy. After signing up, our
              onboarding team will help you set up your product catalog, import
              existing customer data, configure payment terms, and customize
              notification templates. Most businesses are up and running within
              a few days.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
