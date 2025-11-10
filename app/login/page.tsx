import FinTrackLogo from "@/app/ui/acme-logo";
import LoginForm from "@/app/ui/login-form";
import { Suspense } from "react";
import { lusitana } from "@/app/ui/fonts";
import { SparklesIcon } from "@heroicons/react/24/outline";

function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-secondary-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-600 p-4 shadow-lg">
              <div className="w-48">
                <FinTrackLogo />
              </div>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-2 mb-6">
            <SparklesIcon className="h-4 w-4 text-primary-600" />
            <span className="text-sm font-medium text-primary-700">
              Secure Login
            </span>
          </div>
        </div>

        {/* Form */}
        <Suspense
          fallback={
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg animate-pulse">
              <div className="h-10 bg-slate-200 rounded mb-4"></div>
              <div className="h-10 bg-slate-200 rounded mb-4"></div>
              <div className="h-10 bg-slate-200 rounded"></div>
            </div>
          }
        >
          <LoginForm />
        </Suspense>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-slate-600">
          <p>Protected by enterprise-grade security</p>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
