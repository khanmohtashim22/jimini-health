"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Encounter } from "@/types/encounters";
import { text } from "@/i18n";
import { track } from "@/lib/track";

interface EncountersTableProps {
  encounters: Encounter[];
  page: number;
}

export function EncountersTable({ encounters, page }: EncountersTableProps) {
  const router = useRouter();

  useEffect(() => {
    track("encounters_list_viewed", { page });
  }, [page]);

  const handleRowClick = (id: string) => {
    track("encounter_row_clicked", { encounterId: id });
    router.push(`/${id}`);
  };

  return (
    <div className="px-6">
      <table className="w-full table-fixed">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="w-[80px] py-3 pr-4 text-left text-base font-semibold text-gray-600">
              {text("encounters.table.initials")}
            </th>
            <th className="w-[110px] py-3 pr-4 text-left text-base font-semibold text-gray-600">
              {text("encounters.table.date")}
            </th>
            <th className="min-w-0 py-3 pr-4 text-left text-base font-semibold text-gray-600">
              {text("encounters.table.encounterType")}
            </th>
            <th className="w-[100px] py-3 text-left text-base font-semibold text-gray-600">
              {text("encounters.table.status")}
            </th>
          </tr>
        </thead>
        <tbody>
          {encounters.map((encounter) => {
            const {
              id,
              patientInitials,
              encounterDate,
              encounterType,
              status,
            } = encounter;
            const dateStr = new Date(encounterDate).toLocaleDateString();
            const encounterTypeLabel = encounterType.replace(/_/g, " ");
            const statusLabel = status.replace(/_/g, " ");
            const rowLabel = text("encounters.table.viewEncounter", {
              initials: patientInitials,
              date: dateStr,
            });

            return (
              <tr
                key={id}
                role="button"
                tabIndex={0}
                aria-label={rowLabel}
                onClick={() => handleRowClick(id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleRowClick(id);
                  }
                }}
                className="cursor-pointer border-b border-gray-100 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-inset"
              >
                <td className="overflow-hidden truncate py-4 pr-4">
                  {patientInitials}
                </td>
                <td className="overflow-hidden truncate py-4 pr-4 tabular-nums">
                  {dateStr}
                </td>
                <td className="overflow-hidden truncate py-4 pr-4 capitalize">
                  {encounterTypeLabel}
                </td>
                <td className="overflow-hidden truncate py-4 capitalize">
                  {statusLabel}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
