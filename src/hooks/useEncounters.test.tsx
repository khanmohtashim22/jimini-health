import React from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEncounters } from "@/hooks/useEncounters";

const mockTrack = jest.fn();
jest.mock("@/lib/track", () => ({
  track: (...args: unknown[]) => mockTrack(...args),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
};

describe("useEncounters", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls track with encounters_fetch_error when fetch fails", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = jest
      .fn()
      .mockRejectedValueOnce(new Error("Network error"));

    const wrapper = createWrapper();
    renderHook(() => useEncounters({ page: 2 }), { wrapper });

    await waitFor(() => {
      expect(mockTrack).toHaveBeenCalledWith("encounters_fetch_error", {
        page: 2,
      });
    });

    globalThis.fetch = originalFetch;
  });
});
