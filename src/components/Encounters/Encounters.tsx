"use client";

import { useEncounters } from "@/hooks/useEncounters";

export const Encounters = () => {
  const { data, loading, error } = useEncounters();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <p>Loading encounters...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center">
        <p className="text-red-600">Error fetching encounters</p>
      </div>
    );
  }

  if (!data?.encounters.length) {
    return <div className="text-center">No encounters found.</div>;
  }

  return (
    <ul>
      {data.encounters.map((encounter) => {
        const { id, patientInitials, encounterDate, encounterType, status } =
          encounter;
        return (
          <li key={id}>
            <button className="w-full">
              <div className="flex flex-row justify-between px-4">
                <span>{patientInitials}</span>
                <span>{encounterDate}</span>
                <span>{encounterType}</span>
                <span>{status}</span>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
};
