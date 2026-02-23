import Link from "next/link";
import { text } from "@/i18n";

export default function EncounterNotFound() {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 px-6">
      <p className="text-gray-600">{text("encounter.notFound")}</p>
      <Link
        href="/"
        className="text-blue-600 underline hover:text-blue-800"
      >
        {text("encounter.backToEncounters")}
      </Link>
    </div>
  );
}
