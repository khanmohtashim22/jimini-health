"use client";

import { useRouter } from "next/navigation";
import { text } from "@/i18n";

export function BackToEncounters() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="mb-4 inline-block text-left text-blue-600 underline hover:text-blue-800"
    >
      {text("encounter.backToEncounters")}
    </button>
  );
}
