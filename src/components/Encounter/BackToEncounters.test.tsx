import { render, screen, fireEvent } from "@testing-library/react";
import { BackToEncounters } from "@/components/Encounter/BackToEncounters";

const mockBack = jest.fn();

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

    expect(screen.getByRole("button", { name: /back to encounters/i })).toBeInTheDocument();
  });

  it("calls router.back when clicked", () => {
    render(<BackToEncounters />);

    fireEvent.click(screen.getByRole("button", { name: /back to encounters/i }));

    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
