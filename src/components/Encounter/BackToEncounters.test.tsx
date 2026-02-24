import { render, screen, fireEvent } from "@testing-library/react";
import { BackToEncounters } from "@/components/Encounter/BackToEncounters";

const mockBack = jest.fn();

const mockTrack = jest.fn();
jest.mock("@/lib/track", () => ({
  track: (...args: unknown[]) => mockTrack(...args),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: mockBack,
  }),
}));

describe("BackToEncounters", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders Back to encounters button", () => {
    render(<BackToEncounters />);

    expect(
      screen.getByRole("button", { name: /back to encounters/i }),
    ).toBeInTheDocument();
  });

  it("calls track with back_to_encounters_clicked and router.back when clicked", () => {
    render(<BackToEncounters fromEncounterId="enc_1001" />);

    fireEvent.click(
      screen.getByRole("button", { name: /back to encounters/i }),
    );

    expect(mockTrack).toHaveBeenCalledWith("back_to_encounters_clicked", {
      fromEncounterId: "enc_1001",
    });
    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it("calls track without fromEncounterId when prop is not passed", () => {
    render(<BackToEncounters />);

    fireEvent.click(
      screen.getByRole("button", { name: /back to encounters/i }),
    );

    expect(mockTrack).toHaveBeenCalledWith(
      "back_to_encounters_clicked",
      undefined,
    );
    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
