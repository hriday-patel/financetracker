import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { lusitana } from "@/app/ui/fonts";

export default function FinTrackLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <div className="rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 p-2">
        <CurrencyDollarIcon className="h-8 w-8" />
      </div>
      <p className="ml-2 text-[32px] font-bold">FinTrack</p>
    </div>
  );
}
