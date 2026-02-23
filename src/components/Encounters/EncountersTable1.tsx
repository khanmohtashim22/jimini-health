import type { Encounter } from "@/types/encounters";
import { Button } from "@/components/Button/Button";

interface EncountersTableProps {
  encounters: Encounter[];
  onEncounterClick: (id: string) => void;
}

export function EncountersTable({
  encounters,
  onEncounterClick,
}: EncountersTableProps) {
  return (
    <ul>
        {encounters.map((encounter) => {
          const { id, patientInitials, encounterDate, encounterType, status } =
            encounter;
          return (
            <li key={id}>
              <Button
                className="w-full py-4 my-2"
                onClick={() => onEncounterClick(id)}
              >
                <div className="grid grid-cols-[80px_110px_1fr_100px] gap-4 text-left">
                  <span>{patientInitials}</span>
                  <span className="tabular-nums">
                    {new Date(encounterDate).toLocaleDateString()}
                  </span>
                  <span className="capitalize">
                    {encounterType.replace(/_/g, " ")}
                  </span>
                  <span className="capitalize">
                    {status.replace(/_/g, " ")}
                  </span>
                </div>
              </Button>
            </li>
          );
        })}
      </ul>
  );
}
