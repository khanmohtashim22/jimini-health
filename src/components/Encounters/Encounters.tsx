"use client";

import { useEncounters } from "@/hooks/useEncounters";

export const Encounters = () => {
  const { data, loading, error } = useEncounters();

  const handleEncounterClick = (id: string) => {
    console.log(id);
  };

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
            <button
              className="w-full cursor-pointer border border-gray-200 rounded-md p-4 my-2 hover:bg-gray-100"
              onClick={() => handleEncounterClick(id)}
            >
              <div className="flex flex-row justify-between">
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
