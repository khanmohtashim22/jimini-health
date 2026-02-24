import type { PaginationInfo } from "@/types/encounters";
import { Button } from "@/components/Button/Button";
import { text } from "@/i18n";
import { track } from "@/lib/track";

interface EncountersPaginationProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
}

export function EncountersPagination({
  pagination,
  onPageChange,
}: EncountersPaginationProps) {
  const totalPages = Math.ceil(pagination.total / pagination.pageSize);

  const handlePrevious = () => {
    const toPage = Math.max(1, pagination.page - 1);
    track("pagination_changed", {
      fromPage: pagination.page,
      toPage,
    });
    onPageChange(toPage);
  };

  const handleNext = () => {
    const toPage = Math.min(totalPages, pagination.page + 1);
    track("pagination_changed", {
      fromPage: pagination.page,
      toPage,
    });
    onPageChange(toPage);
  };

  return (
    <div className="flex items-center justify-center px-6 mb-4 gap-2">
      <p className="text-sm">
        {text("encounters.pagination.pageOf", {
          page: pagination.page,
          total: totalPages,
        })}
      </p>
      <div className="flex gap-2">
        <Button onClick={handlePrevious} disabled={pagination.page <= 1}>
          {text("encounters.pagination.previous")}
        </Button>
        <Button onClick={handleNext} disabled={pagination.page >= totalPages}>
          {text("encounters.pagination.next")}
        </Button>
      </div>
    </div>
  );
}
