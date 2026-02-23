import type { PaginationInfo } from "@/types/encounters";
import { Button } from "@/components/Button/Button";
import { text } from "@/i18n";

interface EncountersPaginationProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
}

export function EncountersPagination({
  pagination,
  onPageChange,
}: EncountersPaginationProps) {
  const totalPages = Math.ceil(pagination.total / pagination.pageSize);

  return (
    <div className="flex items-center justify-center mb-4 gap-2">
      <p className="text-sm">
        {text("encounters.pageOf", {
          page: pagination.page,
          total: totalPages,
        })}
      </p>
      <div className="flex gap-2">
        <Button
          onClick={() => onPageChange(Math.max(1, pagination.page - 1))}
          disabled={pagination.page <= 1}
        >
          {text("encounters.previous")}
        </Button>
        <Button
          onClick={() =>
            onPageChange(Math.min(totalPages, pagination.page + 1))
          }
          disabled={pagination.page >= totalPages}
        >
          {text("encounters.next")}
        </Button>
      </div>
    </div>
  );
}
