"use client";

import { useState } from "react";
import { useEncounters } from "@/hooks/useEncounters";
import { Button } from "@/components/Button/Button";

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
              <Button
                className="w-full py-4 my-2"
                onClick={() => handleEncounterClick(id)}
              >
                <div className="flex flex-row justify-between">
                  <span>{patientInitials}</span>
                  <span>{encounterDate}</span>
                  <span>{encounterType}</span>
                  <span>{status}</span>
                </div>
              </Button>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center justify-center mb-4 gap-2">
        <p className="text-sm">
          Page {pagination.page} of {totalPages}
        </p>
        <div className="flex gap-2">
          <Button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
