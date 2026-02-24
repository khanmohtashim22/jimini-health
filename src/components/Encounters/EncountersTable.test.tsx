import { render, screen, fireEvent } from "@testing-library/react";
import { EncountersTable } from "@/components/Encounters/EncountersTable";
import type { Encounter } from "@/types/encounters";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    back: jest.fn(),
  }),
}));

const createEncounter = (overrides: Partial<Encounter> = {}): Encounter => ({
  id: "enc_1001",
  patientId: "pat_101",
  patientInitials: "J.D.",
  encounterDate: "2024-11-20T14:30:00Z",
  encounterType: "therapy_session",
  duration: 50,
  status: "completed",
  notes: "Patient showed improvement.",
  ...overrides,
});

describe("EncountersTable", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders table headers", () => {
    render(<EncountersTable encounters={[]} />);

    expect(screen.getByText("Initials")).toBeInTheDocument();
    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("Encounter Type")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("renders encounter rows with data", () => {
    const encounters: Encounter[] = [
      createEncounter({
        id: "enc_1001",
        patientInitials: "J.D.",
        encounterDate: "2024-11-20T14:30:00Z",
        encounterType: "therapy_session",
        status: "completed",
      }),
      createEncounter({
        id: "enc_1002",
        patientInitials: "M.S.",
        encounterDate: "2024-11-21T10:00:00Z",
        encounterType: "initial_assessment",
        status: "scheduled",
      }),
    ];

    render(<EncountersTable encounters={encounters} />);

    expect(screen.getByText("J.D.")).toBeInTheDocument();
    expect(screen.getByText("M.S.")).toBeInTheDocument();
    expect(screen.getByText("therapy session")).toBeInTheDocument();
    expect(screen.getByText("initial assessment")).toBeInTheDocument();
    expect(screen.getByText("completed")).toBeInTheDocument();
    expect(screen.getByText("scheduled")).toBeInTheDocument();
  });

  it("renders no data rows when encounters is empty", () => {
    render(<EncountersTable encounters={[]} />);

    expect(screen.queryByRole("button", { name: /view encounter/i })).toBeNull();
  });

  it("calls router.push with correct URL when row is clicked", () => {
    const encounter = createEncounter({ id: "enc_1001" });
    render(<EncountersTable encounters={[encounter]} />);

    const row = screen.getByRole("button", {
      name: /view encounter for J\.D\./i,
    });
    fireEvent.click(row);

    expect(mockPush).toHaveBeenCalledWith("/enc_1001");
  });

  it("calls router.push when Enter is pressed on row", () => {
    const encounter = createEncounter({ id: "enc_2001" });
    render(<EncountersTable encounters={[encounter]} />);

    const row = screen.getByRole("button", {
      name: /view encounter for J\.D\./i,
    });
    fireEvent.keyDown(row, { key: "Enter" });

    expect(mockPush).toHaveBeenCalledWith("/enc_2001");
  });

  it("calls router.push when Space is pressed on row", () => {
    const encounter = createEncounter({ id: "enc_3001" });
    render(<EncountersTable encounters={[encounter]} />);

    const row = screen.getByRole("button", {
      name: /view encounter for J\.D\./i,
    });
    fireEvent.keyDown(row, { key: " " });

    expect(mockPush).toHaveBeenCalledWith("/enc_3001");
  });
});
