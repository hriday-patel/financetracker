"use client";

import { lusitana } from "@/app/ui/fonts";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "./button";
import { useActionState } from "react";
import { authenticate } from "../lib/actions";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const [errorMsg, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  return (
    <form className="w-full" action={formAction}>
      <div className="flex-1 rounded-2xl border border-slate-200 bg-white px-8 py-10 shadow-lg">
        <h1
          className={`${lusitana.className} mb-2 text-3xl font-bold text-slate-900`}
        >
          Welcome Back
        </h1>
        <p className="mb-8 text-slate-600">Sign in to your FinTrack account</p>

        <div className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              className="mb-2 block text-sm font-semibold text-slate-900"
              htmlFor="email"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-lg border border-slate-300 bg-slate-50 py-3 pl-10 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-500/10"
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 peer-focus:text-primary-600" />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              className="mb-2 block text-sm font-semibold text-slate-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-lg border border-slate-300 bg-slate-50 py-3 pl-10 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-500/10"
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 peer-focus:text-primary-600" />
            </div>
          </div>
        </div>

        <input type="hidden" name="redirectTo" value={callbackUrl} />

        {/* Error Message */}
        {errorMsg && (
          <div className="mt-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
            <ExclamationCircleIcon className="h-5 w-5 flex-shrink-0 text-red-600 mt-0.5" />
            <p className="text-sm font-medium text-red-900">{errorMsg}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          className="mt-8 w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
          aria-disabled={isPending}
          disabled={isPending}
        >
          <span>{isPending ? "Signing in..." : "Sign In"}</span>
          {!isPending && <ArrowRightIcon className="h-5 w-5" />}
        </Button>

        {/* Demo Credentials */}
        <div className="mt-8 rounded-lg bg-primary-50 p-4 border border-primary-200">
          <p className="text-xs font-semibold text-primary-900 mb-2">
            Demo Credentials
          </p>
          <p className="text-xs text-primary-700 mb-1">
            Email:{" "}
            <code className="font-mono bg-primary-100 px-2 py-1 rounded">
              demo@example.com
            </code>
          </p>
          <p className="text-xs text-primary-700">
            Password:{" "}
            <code className="font-mono bg-primary-100 px-2 py-1 rounded">
              password
            </code>
          </p>
        </div>
      </div>
    </form>
  );
}
