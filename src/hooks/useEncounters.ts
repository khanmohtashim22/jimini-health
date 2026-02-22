"use client";

import { useState, useEffect, useCallback } from "react";
import type { EncountersResponse } from "@/types/encounters";

interface UseEncountersOptions {
  page?: number;
  pageSize?: number;
}

interface UseEncountersResult {
  data: EncountersResponse | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useEncounters(
  options: UseEncountersOptions = {}
): UseEncountersResult {
  const { page = 1, pageSize = 20 } = options;

  const [data, setData] = useState<EncountersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchEncounters = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
      });
      const response = await fetch(`/api/encounters?${params}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch encounters: ${response.status}`);
      }

      const result: EncountersResponse = await response.json();
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch encounters")
      );
    } finally {
      setLoading(false);
    }
  }, [page, pageSize]);

  useEffect(() => {
    fetchEncounters();
  }, [fetchEncounters]);

  return { data, loading, error, refetch: fetchEncounters };
}
