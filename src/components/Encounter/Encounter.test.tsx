import { render, screen } from "@testing-library/react";
import { Encounter } from "@/components/Encounter/Encounter";
import type { Encounter as EncounterType } from "@/types/encounters";

jest.mock("@/components/Encounter/BackToEncounters", () => ({
  BackToEncounters: () => <div data-testid="back-to-encounters" />,
}));

const mockTrack = jest.fn();
jest.mock("@/lib/track", () => ({
  track: (...args: unknown[]) => mockTrack(...args),
}));

const mockEncounter: EncounterType = {
  id: "enc_1001",
  patientId: "pat_101",
  patientInitials: "J.D.",
  encounterDate: "2024-11-20T14:30:00Z",
  encounterType: "therapy_session",
  duration: 50,
  status: "completed",
  notes: "Patient showed improvement.",
  assessments: [
    { name: "PHQ-9", score: 8 },
    { name: "GAD-7", score: 5 },
  ],
};

describe("Encounter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls track with encounter_viewed and encounter on mount", () => {
    render(<Encounter encounter={mockEncounter} />);

    expect(mockTrack).toHaveBeenCalledWith("encounter_viewed", {
      encounter: mockEncounter,
    });
  });

  it("renders BackToEncounters", () => {
    render(<Encounter encounter={mockEncounter} />);

    expect(screen.getByTestId("back-to-encounters")).toBeInTheDocument();
  });

  it("renders encounter detail fields", () => {
    render(<Encounter encounter={mockEncounter} />);

    expect(screen.getByText("Patient")).toBeInTheDocument();
    expect(screen.getByText("J.D.")).toBeInTheDocument();
    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("Encounter Type")).toBeInTheDocument();
    expect(screen.getByText("therapy session")).toBeInTheDocument();
    expect(screen.getByText("Duration")).toBeInTheDocument();
    expect(screen.getByText("50 min")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("completed")).toBeInTheDocument();
  });

  it("renders notes when present", () => {
    render(<Encounter encounter={mockEncounter} />);

    expect(screen.getByText("Notes")).toBeInTheDocument();
    expect(screen.getByText("Patient showed improvement.")).toBeInTheDocument();
  });

  it("renders assessments when present", () => {
    render(<Encounter encounter={mockEncounter} />);

    expect(screen.getByText("Assessments")).toBeInTheDocument();
    expect(screen.getByText("PHQ-9: 8")).toBeInTheDocument();
    expect(screen.getByText("GAD-7: 5")).toBeInTheDocument();
  });
});
