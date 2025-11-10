import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import FinTrackLogo from "@/app/ui/acme-logo";
import { PowerIcon } from "@heroicons/react/24/outline";
import { logout } from "@/app/lib/actions";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col border-r border-slate-200 bg-white px-3 py-4 md:px-2 shadow-sm">
      <Link
        className="mb-4 flex h-16 items-center justify-start rounded-lg bg-gradient-to-br from-primary-500 to-secondary-600 p-4 transition-all duration-300 hover:shadow-lg md:h-20"
        href="/"
      >
        <div className="w-40 md:w-44">
          <FinTrackLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <form action={logout}>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-lg bg-slate-100 p-3 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-200 hover:text-primary-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-5" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
