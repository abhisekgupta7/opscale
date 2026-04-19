import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    <div className="min-h-screen bg-white font-sans">
      <HomeSection />
      <Separator />
      <ServicesSection />
      <Separator />
      <PricingSection />
      <Separator />
      <ContactsSection />
      <Separator />
      <AboutServiesSection />
    </div>
  );
}
function HomeSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20 pb-20">
      {/* Background Gradient - More subtle and sophisticated */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-br from-white via-slate-50 to-blue-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 w-full">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-3 rounded-full border border-blue-200 bg-blue-50 px-5 py-2.5">
              <span className="h-2 w-2 rounded-full bg-blue-600"></span>
              <span className="text-sm font-medium text-blue-900">
                Enterprise Automation Platform
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900">
                Transform Your Wholesale
                <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-blue-800">
                  Business Operations
                </span>
              </h1>
            </div>

            <p className="text-xl leading-relaxed text-slate-600 max-w-xl">
              OpScale is the complete business automation platform designed for
              modern wholesalers. Manage inventory, automate payments, handle
              customer accounts, and streamline operations—all in one powerful
              system.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all hover:from-blue-700 hover:to-blue-800">
                Start Free Trial
              </button>
              <button className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg border-2 border-slate-300 bg-white text-slate-900 font-semibold text-base hover:bg-slate-50 transition-all">
                Schedule Demo
              </button>
            </div>

            <div className="flex items-center gap-6 pt-8 border-t border-slate-200">
              <div className="flex items-center -space-x-3">
                <div className="h-12 w-12 rounded-full border-3 border-white bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                  A
                </div>
                <div className="h-12 w-12 rounded-full border-3 border-white bg-linear-to-br from-slate-400 to-slate-500 flex items-center justify-center text-white font-bold text-sm">
                  B
                </div>
                <div className="h-12 w-12 rounded-full border-3 border-white bg-linear-to-br from-blue-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                  C
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Trusted by 500+ businesses
                </p>
                <p className="text-sm text-slate-500">
                  Growing B2B enterprises worldwide
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Metrics */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="group rounded-2xl border-2 border-blue-100 bg-white/80 backdrop-blur p-8 hover:border-blue-300 hover:shadow-lg transition-all">
              <div className="mb-3 text-4xl font-bold text-blue-600">99.9%</div>
              <div className="text-sm font-medium text-slate-600">
                Uptime SLA
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Enterprise-grade reliability
              </p>
            </div>
            <div className="group rounded-2xl border-2 border-blue-100 bg-white/80 backdrop-blur p-8 hover:border-blue-300 hover:shadow-lg transition-all">
              <div className="mb-3 text-4xl font-bold text-blue-600">24/7</div>
              <div className="text-sm font-medium text-slate-600">Support</div>
              <p className="text-xs text-slate-500 mt-2">
                Dedicated customer team
              </p>
            </div>
            <div className="group rounded-2xl border-2 border-blue-100 bg-white/80 backdrop-blur p-8 hover:border-blue-300 hover:shadow-lg transition-all">
              <div className="mb-3 text-4xl font-bold text-blue-600">50%</div>
              <div className="text-sm font-medium text-slate-600">
                Faster Processing
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Vs. traditional methods
              </p>
            </div>
            <div className="group rounded-2xl border-2 border-blue-100 bg-white/80 backdrop-blur p-8 hover:border-blue-300 hover:shadow-lg transition-all">
              <div className="mb-3 text-4xl font-bold text-blue-600">10k+</div>
              <div className="text-sm font-medium text-slate-600">
                Daily Transactions
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Processed seamlessly
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function ServicesSection() {
  return (
    <section
      id="services"
      className="py-32 bg-linear-to-b from-slate-50 to-white"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <div className="inline-flex items-center space-x-3 rounded-full border border-blue-200 bg-blue-50 px-5 py-2.5 mb-6">
            <span className="text-sm font-semibold text-blue-900">
              CORE FEATURES
            </span>
          </div>
          <h2 className="mb-6 text-4xl sm:text-5xl font-bold text-slate-900">
            Everything You Need to Automate
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Built for modern wholesale businesses. Streamline operations with
            powerful features designed to drive growth and efficiency.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-2 border-blue-100 bg-white hover:border-blue-300 hover:shadow-xl transition-all"
            >
              <div className="relative p-8">
                <div className="mb-4 inline-block rounded-lg bg-blue-100 p-3">
                  <div className="h-6 w-6 bg-linear-to-br from-blue-600 to-blue-700 rounded" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-slate-900">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>
                <div className="mt-4 inline-block text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {service.badge}
                </div>
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
    <section id="pricing" className="py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <div className="inline-flex items-center space-x-3 rounded-full border border-blue-200 bg-blue-50 px-5 py-2.5 mb-6">
            <span className="text-sm font-semibold text-blue-900">PRICING</span>
          </div>
          <h2 className="mb-6 text-4xl sm:text-5xl font-bold text-slate-900">
            Simple, Transparent Pricing
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Choose the plan that fits your business needs. All plans include our
            core automation features.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Starter Plan */}
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-10 hover:shadow-lg transition-all">
            <div className="mb-8">
              <h3 className="mb-2 text-2xl font-bold text-slate-900">
                Starter
              </h3>
              <p className="text-base text-slate-600">
                For small wholesale teams
              </p>
            </div>
            <div className="mb-8">
              <span className="text-5xl font-bold text-slate-900">$99</span>
              <span className="text-slate-600 ml-2">/month</span>
            </div>
            <button className="w-full rounded-lg border-2 border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-900 hover:bg-slate-50 transition-all">
              Get Started
            </button>
            <ul className="mt-8 space-y-4">
              <li className="flex items-center gap-3">
                <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="h-2 w-2 bg-blue-600 rounded-full" />
                </div>
                <span className="text-sm text-slate-700">Basic automation</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="h-2 w-2 bg-blue-600 rounded-full" />
                </div>
                <span className="text-sm text-slate-700">
                  Up to 1,000 transactions
                </span>
              </li>
            </ul>
          </div>

          {/* Professional Plan - Highlighted */}
          <div className="relative rounded-2xl border-2 border-blue-600 bg-linear-to-br from-blue-50 to-white p-10 shadow-xl">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2">
              <span className="inline-block rounded-full border-2 border-blue-600 bg-white px-5 py-1.5 text-sm font-bold text-blue-600">
                MOST POPULAR
              </span>
            </div>
            <div className="mb-8 mt-4">
              <h3 className="mb-2 text-2xl font-bold text-slate-900">
                Professional
              </h3>
              <p className="text-base text-slate-600">For growing businesses</p>
            </div>
            <div className="mb-8">
              <span className="text-5xl font-bold text-slate-900">$299</span>
              <span className="text-slate-600 ml-2">/month</span>
            </div>
            <button className="w-full rounded-lg bg-linear-to-r from-blue-600 to-blue-700 px-6 py-3.5 text-base font-semibold text-white hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl">
              Get Started Now
            </button>
            <ul className="mt-8 space-y-4">
              <li className="flex items-center gap-3">
                <div className="h-5 w-5 rounded-full bg-blue-200 flex items-center justify-center">
                  <div className="h-2 w-2 bg-blue-600 rounded-full" />
                </div>
                <span className="text-sm text-slate-700">
                  Advanced automation
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-5 w-5 rounded-full bg-blue-200 flex items-center justify-center">
                  <div className="h-2 w-2 bg-blue-600 rounded-full" />
                </div>
                <span className="text-sm text-slate-700">
                  Unlimited transactions
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-5 w-5 rounded-full bg-blue-200 flex items-center justify-center">
                  <div className="h-2 w-2 bg-blue-600 rounded-full" />
                </div>
                <span className="text-sm text-slate-700">
                  Priority 24/7 support
                </span>
              </li>
            </ul>
          </div>

          {/* Enterprise Plan */}
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-10 hover:shadow-lg transition-all">
            <div className="mb-8">
              <h3 className="mb-2 text-2xl font-bold text-slate-900">
                Enterprise
              </h3>
              <p className="text-base text-slate-600">
                For large organizations
              </p>
            </div>
            <div className="mb-8">
              <span className="text-4xl font-bold text-slate-900">Custom</span>
              <p className="text-sm text-slate-600 mt-2">
                tailored to your needs
              </p>
            </div>
            <button className="w-full rounded-lg border-2 border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-900 hover:bg-slate-50 transition-all">
              Contact Sales
            </button>
            <ul className="mt-8 space-y-4">
              <li className="flex items-center gap-3">
                <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="h-2 w-2 bg-blue-600 rounded-full" />
                </div>
                <span className="text-sm text-slate-700">Custom solutions</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="h-2 w-2 bg-blue-600 rounded-full" />
                </div>
                <span className="text-sm text-slate-700">
                  Dedicated account manager
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
function ContactsSection() {
  return (
    <section
      id="contacts"
      className="py-32 bg-linear-to-b from-white to-slate-50"
    >
      <div className="mx-auto max-w-4xl px-6">
        <div className="rounded-3xl border-2 border-blue-200 bg-white p-16 text-center shadow-lg">
          <div className="inline-flex items-center space-x-3 rounded-full border border-blue-200 bg-blue-50 px-5 py-2.5 mb-6">
            <span className="text-sm font-semibold text-blue-900">
              READY TO GET STARTED?
            </span>
          </div>
          <h2 className="mb-6 text-4xl sm:text-5xl font-bold text-slate-900">
            Let's Talk About Your Business
          </h2>
          <p className="mb-10 text-lg text-slate-600 max-w-2xl mx-auto">
            Our team of experts is ready to help you transform your wholesale
            operations. Get a personalized demo and discover how OpScale can
            help.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all">
              Schedule Consultation
            </button>
            <button className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg border-2 border-slate-300 bg-white text-slate-900 font-semibold text-base hover:bg-slate-50 transition-all">
              Contact Our Team
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
function AboutServiesSection() {
  return (
    <section id="faq" className="py-32 bg-white">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center space-x-3 rounded-full border border-blue-200 bg-blue-50 px-5 py-2.5 mb-6">
            <span className="text-sm font-semibold text-blue-900">FAQ</span>
          </div>
          <h2 className="mb-6 text-4xl sm:text-5xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600">
            Everything you need to know about OpScale
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem
            value="item-1"
            className="rounded-xl border-2 border-slate-200 bg-white data-[state=open]:border-blue-300 overflow-hidden"
          >
            <AccordionTrigger className="px-6 py-4 text-left font-semibold text-slate-900 hover:text-blue-600 hover:no-underline">
              What is wholesale business automation?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-slate-600">
              Wholesale business automation is a comprehensive platform that
              digitizes and streamlines your entire operation. It includes
              e-commerce capabilities, automated account management, payment
              automation, and smart notifications to keep everyone informed.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-2"
            className="rounded-xl border-2 border-slate-200 bg-white data-[state=open]:border-blue-300 overflow-hidden"
          >
            <AccordionTrigger className="px-6 py-4 text-left font-semibold text-slate-900 hover:text-blue-600 hover:no-underline">
              How does payment automation work?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-slate-600">
              Our payment automation system automatically sends reminders based
              on due dates, tracks outstanding amounts, reconciles transactions,
              and provides real-time visibility into your cash flow. You can
              configure custom reminder schedules and automate follow-ups.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-3"
            className="rounded-xl border-2 border-slate-200 bg-white data-[state=open]:border-blue-300 overflow-hidden"
          >
            <AccordionTrigger className="px-6 py-4 text-left font-semibold text-slate-900 hover:text-blue-600 hover:no-underline">
              Can I track customer due amounts?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-slate-600">
              Yes! Our account management system provides complete visibility
              into all customer accounts, outstanding balances, payment history,
              credit limits, and aging reports. Monitor all customer accounts in
              real-time.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-4"
            className="rounded-xl border-2 border-slate-200 bg-white data-[state=open]:border-blue-300 overflow-hidden"
          >
            <AccordionTrigger className="px-6 py-4 text-left font-semibold text-slate-900 hover:text-blue-600 hover:no-underline">
              What notification channels are supported?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-slate-600">
              Our system supports multiple channels including SMS, email, and
              WhatsApp. Send automated notifications for order confirmations,
              payment reminders, due date alerts, account statements, and
              shipment updates.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-5"
            className="rounded-xl border-2 border-slate-200 bg-white data-[state=open]:border-blue-300 overflow-hidden"
          >
            <AccordionTrigger className="px-6 py-4 text-left font-semibold text-slate-900 hover:text-blue-600 hover:no-underline">
              How quickly can I get started?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-slate-600">
              Getting started is quick! After signing up, our team helps you set
              up your product catalog, import customer data, configure payment
              terms, and customize notification templates. Most businesses are
              up and running within a few days.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
