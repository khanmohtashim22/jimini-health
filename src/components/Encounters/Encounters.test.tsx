import { render, screen } from "@testing-library/react";
import { Encounters } from "@/components/Encounters/Encounters";
import { useEncounters } from "@/hooks/useEncounters";
import type { Encounter, EncountersResponse } from "@/types/encounters";

jest.mock("@/hooks/useEncounters");

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn((key: string) => (key === "page" ? "1" : null)),
  }),
}));

const mockUseEncounters = useEncounters as jest.MockedFunction<
  typeof useEncounters
>;

const mockEncounter: Encounter = {
  id: "enc_1001",
  patientId: "pat_101",
  patientInitials: "J.D.",
  encounterDate: "2024-11-20T14:30:00Z",
  encounterType: "therapy_session",
  duration: 50,
  status: "completed",
  notes: "Patient showed improvement.",
};

const mockData: EncountersResponse = {
  encounters: [mockEncounter],
  pagination: {
    page: 1,
    pageSize: 20,
    total: 150,
    hasMore: true,
  },
};

describe("Encounters", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows loading state when loading", () => {
    mockUseEncounters.mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refetch: jest.fn(),
      isError: false,
      isSuccess: false,
    });

    render(<Encounters />);

    expect(screen.getByText("Loading encounters...")).toBeInTheDocument();
  });

  it("shows error state when there is an error", () => {
    mockUseEncounters.mockReturnValue({
      data: null,
      loading: false,
      error: new Error("Failed to fetch"),
      refetch: jest.fn(),
      isError: true,
      isSuccess: false,
    });

    render(<Encounters />);

    expect(screen.getByText("Error fetching encounters")).toBeInTheDocument();
  });

  it("shows empty state when no encounters", () => {
    mockUseEncounters.mockReturnValue({
      data: { encounters: [], pagination: mockData.pagination },
      loading: false,
      error: null,
      refetch: jest.fn(),
      isError: false,
      isSuccess: true,
    });

    render(<Encounters />);

    expect(screen.getByText("No encounters found.")).toBeInTheDocument();
  });

  it("renders table and pagination when data is loaded", () => {
    mockUseEncounters.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
      refetch: jest.fn(),
      isError: false,
      isSuccess: true,
    });

    render(<Encounters />);

    expect(screen.getByText("J.D.")).toBeInTheDocument();
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.getByText("Page 1 of 8")).toBeInTheDocument();
  });
});
