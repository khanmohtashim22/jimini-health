"use client";

import { useRouter } from "next/navigation";
import { text } from "@/i18n";
import { track } from "@/lib/track";

interface BackToEncountersProps {
  fromEncounterId?: string;
}

export function BackToEncounters({ fromEncounterId }: BackToEncountersProps) {
  const router = useRouter();

  const handleClick = () => {
    track(
      "back_to_encounters_clicked",
      fromEncounterId ? { fromEncounterId } : undefined,
    );
    router.back();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="mb-4 inline-block text-left text-blue-600 underline hover:text-blue-800"
    >
      {text("encounter.backToEncounters")}
    </button>
  );
}
