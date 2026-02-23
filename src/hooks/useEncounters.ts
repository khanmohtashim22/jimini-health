import { useQuery } from "@tanstack/react-query";
import type { EncountersResponse } from "@/types/encounters";

interface UseEncountersOptions {
  page?: number;
  pageSize?: number;
}

async function fetchEncounters(
  page: number,
  pageSize: number
): Promise<EncountersResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });
  const response = await fetch(`/api/encounters?${params}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch encounters: ${response.status}`);
  }

  return response.json();
}

export function useEncounters(options: UseEncountersOptions = {}) {
  const { page = 1, pageSize = 20 } = options;

  const query = useQuery({
    queryKey: ["encounters", page, pageSize],
    queryFn: () => fetchEncounters(page, pageSize),
  });

  return {
    data: query.data ?? null,
    loading: query.isPending,
    error: query.error instanceof Error ? query.error : null,
    refetch: query.refetch,
    isError: query.isError,
    isSuccess: query.isSuccess,
  };
}
