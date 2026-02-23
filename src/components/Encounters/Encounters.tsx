"use client";

import { useState } from "react";
import { useEncounters } from "@/hooks/useEncounters";

export const Encounters = () => {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useEncounters({ page });

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

  const { pagination, encounters } = data;
  const totalPages = Math.ceil( pagination.total / pagination.pageSize);

  return (
    <div className="flex flex-col gap-4">
      <ul>
        {encounters.map((encounter) => {
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

      <div className="flex items-center justify-center mb-4 gap-2">
        <p className="text-sm">
          Page {pagination.page} of {totalPages}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
