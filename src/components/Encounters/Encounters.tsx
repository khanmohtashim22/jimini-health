"use client";

import { useState } from "react";
import { useEncounters } from "@/hooks/useEncounters";
import { Button } from "@/components/Button/Button";
import { text } from "@/i18n";

export const Encounters = () => {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useEncounters({ page });

  const handleEncounterClick = (id: string) => {
    console.log(id);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <p>{text("encounters.loading")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center">
        <p className="text-red-600">{text("encounters.error")}</p>
      </div>
    );
  }

  if (!data?.encounters.length) {
    return <div className="text-center">{text("encounters.empty")}</div>;
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
                <div className="grid grid-cols-[80px_110px_1fr_100px] gap-4 text-left">
                  <span>{patientInitials}</span>
                  <span className="tabular-nums">
                    {new Date(encounterDate).toLocaleDateString()}
                  </span>
                  <span className="capitalize">
                    {encounterType.replace(/_/g, " ")}
                  </span>
                  <span className="capitalize">{status.replace(/_/g, " ")}</span>
                </div>
              </Button>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center justify-center mb-4 gap-2">
        <p className="text-sm">
          {text("encounters.pageOf", {
            page: pagination.page,
            total: totalPages,
          })}
        </p>
        <div className="flex gap-2">
          <Button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
          >
            {text("encounters.previous")}
          </Button>
          <Button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
          >
            {text("encounters.next")}
          </Button>
        </div>
      </div>
    </div>
  );
};
