import Link from "next/link";
import type { Encounter } from "@/types/encounters";
import { text } from "@/i18n";

interface EncounterProps {
  encounter: Encounter;
}

export function Encounter({ encounter }: EncounterProps) {
  const {
    patientInitials,
    encounterDate,
    encounterType,
    duration,
    status,
    notes,
    assessments,
  } = encounter;

  const dateStr = new Date(encounterDate).toLocaleDateString();
  const encounterTypeLabel = encounterType.replace(/_/g, " ");
  const statusLabel = status.replace(/_/g, " ");

  return (
    <div className="px-6 py-4 space-y-6">
      <Link
        href="/"
        className="inline-block text-blue-600 underline hover:text-blue-800 mb-4"
      >
        {text("encounter.backToEncounters")}
      </Link>

      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-sm font-medium text-gray-500">
            {text("encounter.detail.patient")}
          </dt>
          <dd className="mt-1 text-base">{patientInitials}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">
            {text("encounter.detail.date")}
          </dt>
          <dd className="mt-1 text-base">{dateStr}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">
            {text("encounter.detail.type")}
          </dt>
          <dd className="mt-1 text-base capitalize">{encounterTypeLabel}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">
            {text("encounter.detail.duration")}
          </dt>
          <dd className="mt-1 text-base">{duration} min</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">
            {text("encounter.detail.status")}
          </dt>
          <dd className="mt-1 text-base capitalize">{statusLabel}</dd>
        </div>
      </dl>

      {notes && (
        <div>
          <h3 className="text-sm font-medium text-gray-500">
            {text("encounter.detail.notes")}
          </h3>
          <p className="mt-1 text-base">{notes}</p>
        </div>
      )}
      
      {assessments && assessments.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-500">
            {text("encounter.detail.assessments")}
          </h3>
          <ul className="mt-1 list-disc list-inside space-y-1 text-base">
            {assessments.map((a) => (
              <li key={a.name}>
                {a.name}: {a.score}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
