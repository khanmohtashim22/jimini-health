import { text } from "@/i18n";

export default function EncounterLoading() {
  return (
    <div className="flex min-h-[200px] items-center justify-center">
      <p className="text-gray-600">{text("encounter.loading")}</p>
    </div>
  );
}
