import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@/components/Button/Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);

    expect(
      screen.getByRole("button", { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Submit</Button>);

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Submit</Button>);

    expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled();
  });

  it("applies custom className", () => {
    render(<Button className="custom-class">Save</Button>);

    const button = screen.getByRole("button", { name: /save/i });
    expect(button).toHaveClass("custom-class");
  });
});
