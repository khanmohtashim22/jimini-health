"use client";

import { useEncounters } from "@/hooks/useEncounters";

const Encounters = () => {
  const { data, loading, error } = useEncounters();

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <p className="text-foreground/60">Loading encounters...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/30">
        <p className="text-red-600 dark:text-red-400">Error: {error.message}</p>
      </div>
    );
  }

  if (!data?.encounters.length) {
    return (
      <div className="py-12 text-center text-foreground/60">
        No encounters found.
      </div>
    );
  }

  return (
    <ul className="divide-y divide-foreground/10">
      {data.encounters.map((encounter) => (
        <li key={encounter.id} className="py-4 first:pt-0 last:pb-0">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="font-medium">{encounter.patientInitials}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs capitalize ${
                  encounter.status === "completed"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : encounter.status === "in_progress"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                      : encounter.status === "cancelled" || encounter.status === "no_show"
                        ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                }`}
              >
                {encounter.status.replace("_", " ")}
              </span>
            </div>
            <div className="flex gap-4 text-sm text-foreground/70">
              <span>{new Date(encounter.encounterDate).toLocaleDateString()}</span>
              <span className="capitalize">
                {encounter.encounterType.replace(/_/g, " ")}
              </span>
              <span>{encounter.duration} min</span>
            </div>
            {encounter.notes && (
              <p className="mt-2 truncate text-sm text-foreground/60">
                {encounter.notes}
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Encounters;