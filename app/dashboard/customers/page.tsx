import { Metadata } from "next";
import { Suspense } from "react";
import { fetchFilteredCustomers } from "@/app/lib/data";
import Search from "@/app/ui/search";
import { UsersIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";
import { FormattedCustomersTable } from "@/app/lib/definitions";

export const metadata: Metadata = {
  title: "Customers | FinTrack",
  description: "Manage and view all your customers with detailed insights",
};

export default async function CustomersPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";
  const customers = await fetchFilteredCustomers(query);

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-8">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1
              className={`${lusitana.className} mb-2 text-3xl font-bold text-slate-900`}
            >
              Customers
            </h1>
            <p className="text-slate-600">
              Manage and track all your customers in one place
            </p>
          </div>
          <div className="flex h-12 items-center gap-3 rounded-lg bg-primary-50 px-4">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <span className="font-semibold text-primary-900">Your Clients</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Active Customers
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {customers?.length || 0}
                </p>
              </div>
              <div className="rounded-lg bg-primary-100 p-3">
                <UsersIcon className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Total Invoices
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {customers?.reduce(
                    (sum, c) => sum + Number(c.total_invoices || 0),
                    0
                  ) || 0}
                </p>
              </div>
              <div className="rounded-lg bg-secondary-100 p-3">
                <ChartBarIcon className="h-6 w-6 text-secondary-600" />
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Pending Amount
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {customers?.[0]?.total_pending || "$0.00"}
                </p>
              </div>
              <div className="rounded-lg bg-emerald-100 p-3">
                <ChartBarIcon className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <Search placeholder="Search customers by name or email..." />
      </div>

      {/* Customers Table */}
      <div className="w-full animate-fadeIn">
        <div className="grid gap-6 md:gap-0">
          {/* Mobile View */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {customers?.length > 0 ? (
              customers.map((customer) => (
                <div
                  key={customer.id}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary-300"
                >
                  <div className="p-6">
                    <div className="mb-4 flex items-center gap-4 border-b border-slate-100 pb-4">
                      <Image
                        src={customer.image_url}
                        className="h-12 w-12 rounded-full object-cover ring-2 ring-primary-100"
                        alt={`${customer.name}'s profile`}
                        width={48}
                        height={48}
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900">
                          {customer.name}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-xs font-medium text-slate-600">
                          Invoices
                        </p>
                        <p className="mt-1 text-lg font-bold text-slate-900">
                          {customer.total_invoices}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-medium text-slate-600">
                          Pending
                        </p>
                        <p className="mt-1 text-lg font-bold text-amber-600">
                          {customer.total_pending}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-medium text-slate-600">
                          Paid
                        </p>
                        <p className="mt-1 text-lg font-bold text-emerald-600">
                          {customer.total_paid}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center">
                <UsersIcon className="mx-auto h-12 w-12 text-slate-400" />
                <p className="mt-4 text-slate-600">No customers found</p>
              </div>
            )}
          </div>

          {/* Desktop View */}
          <div className="hidden overflow-x-auto rounded-xl border border-slate-200 md:block shadow-sm">
            {customers?.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                      Total Invoices
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                      Total Pending
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                      Total Paid
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {customers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="transition-all duration-200 hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Image
                            src={customer.image_url}
                            className="h-10 w-10 rounded-full object-cover ring-2 ring-primary-100"
                            alt={`${customer.name}'s profile`}
                            width={40}
                            height={40}
                          />
                          <div>
                            <p className="font-medium text-slate-900">
                              {customer.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        {customer.email}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700">
                          {customer.total_invoices}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-amber-600">
                          {customer.total_pending}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-emerald-600">
                          {customer.total_paid}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-12 text-center">
                <UsersIcon className="mx-auto h-12 w-12 text-slate-400" />
                <p className="mt-4 text-slate-600">No customers found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
