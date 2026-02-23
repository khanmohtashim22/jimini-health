"use client";

import { useState } from "react";
import { useEncounters } from "@/hooks/useEncounters";
import { text } from "@/i18n";
import { EncountersTable } from "@/components/Encounters/EncountersTable";
import { EncountersPagination } from "@/components/Encounters/EncountersPagination";

export const Encounters = () => {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useEncounters({ page });

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

  return (
    <div className="flex flex-col gap-4">
      <EncountersTable encounters={data.encounters} />
      <EncountersPagination
        pagination={data.pagination}
        onPageChange={setPage}
      />
    </div>
  );
};
