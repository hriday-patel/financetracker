import FinTrackLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon, SparklesIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-white to-secondary-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur-md md:px-12">
        <div className="flex h-12 items-center">
          <FinTrackLogo />
        </div>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-primary-600 hover:shadow-lg"
        >
          <span>Get Started</span> <ArrowRightIcon className="w-4" />
        </Link>
      </nav>

      {/* Hero Section */}
      <div className="flex grow flex-col gap-8 px-6 py-12 md:flex-row md:gap-12 md:px-12 md:py-20">
        {/* Left Content */}
        <div className="flex flex-col justify-center gap-6 md:w-3/5">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary-100 px-4 py-2">
            <SparklesIcon className="h-4 w-4 text-primary-600" />
            <span className="text-sm font-medium text-primary-700">
              Introducing FinTrack Pro
            </span>
          </div>

          <h1
            className={`${lusitana.className} text-4xl font-bold leading-tight text-slate-900 md:text-5xl md:leading-tight`}
          >
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Manage your finances
            </span>
            <br />
            with confidence
          </h1>

          <p className="text-lg text-slate-600 md:text-xl">
            Powerful invoice tracking and financial management tools designed
            for modern businesses. Track, manage, and optimize your cash flow in
            real-time.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/login"
              className="flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-3 text-base font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/30 active:scale-95"
            >
              <span>Start Free Trial</span> <ArrowRightIcon className="w-5" />
            </Link>
            <button className="flex items-center justify-center gap-2 rounded-lg border-2 border-slate-300 px-8 py-3 text-base font-semibold text-slate-700 transition-all duration-200 hover:border-primary-300 hover:bg-primary-50">
              View Demo
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center gap-4 pt-6">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-primary-400 to-secondary-400"
                />
              ))}
            </div>
            <p className="text-sm text-slate-600">
              Trusted by{" "}
              <span className="font-semibold text-slate-900">2,000+</span>{" "}
              businesses
            </p>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex items-center justify-center md:w-2/5">
          <div className="relative w-full">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-300 to-secondary-300 blur-3xl opacity-20"></div>
            <div className="relative rounded-2xl bg-white p-6 shadow-2xl">
              <div className="aspect-square rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary-500">📊</div>
                  <p className="mt-4 text-slate-600 font-medium">
                    Dashboard Preview
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 gap-6 px-6 py-12 md:grid-cols-3 md:px-12 md:py-20">
        {[
          {
            icon: "💰",
            title: "Invoice Management",
            description: "Create, track, and manage invoices with ease",
          },
          {
            icon: "👥",
            title: "Customer Insights",
            description: "Get comprehensive insights about your customers",
          },
          {
            icon: "📈",
            title: "Real-time Analytics",
            description: "Track revenue, payments, and financial metrics",
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:shadow-lg hover:border-primary-300"
          >
            <div className="mb-4 text-4xl">{feature.icon}</div>
            <h3 className="mb-2 text-lg font-semibold text-slate-900">
              {feature.title}
            </h3>
            <p className="text-slate-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* CTA Footer */}
      <div className="mt-12 border-t border-slate-200 bg-gradient-to-r from-primary-500 to-secondary-600 px-6 py-16 text-center md:px-12">
        <h2
          className={`${lusitana.className} mb-4 text-3xl font-bold text-white md:text-4xl`}
        >
          Ready to get started?
        </h2>
        <p className="mb-8 text-lg text-white/90">
          Join thousands of businesses managing their finances with FinTrack
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 text-base font-semibold text-primary-600 transition-all duration-200 hover:shadow-lg hover:scale-105"
        >
          Get Started Now <ArrowRightIcon className="w-5" />
        </Link>
      </div>
    </main>
  );
}
