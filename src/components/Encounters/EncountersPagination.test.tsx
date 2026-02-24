import { render, screen, fireEvent } from "@testing-library/react";
import { EncountersPagination } from "@/components/Encounters/EncountersPagination";
import type { PaginationInfo } from "@/types/encounters";

const createPagination = (overrides: Partial<PaginationInfo> = {}): PaginationInfo => ({
  page: 1,
  pageSize: 20,
  total: 150,
  hasMore: true,
  ...overrides,
});

describe("EncountersPagination", () => {
  it("renders page info and buttons", () => {
    const onPageChange = jest.fn();
    const pagination = createPagination({ page: 2 });

    render(
      <EncountersPagination pagination={pagination} onPageChange={onPageChange} />
    );

    expect(screen.getByText("Page 2 of 8")).toBeInTheDocument();
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("calls onPageChange with previous page when Previous is clicked", () => {
    const onPageChange = jest.fn();
    const pagination = createPagination({ page: 2 });

    render(
      <EncountersPagination pagination={pagination} onPageChange={onPageChange} />
    );

    fireEvent.click(screen.getByText("Previous"));

    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("calls onPageChange with next page when Next is clicked", () => {
    const onPageChange = jest.fn();
    const pagination = createPagination({ page: 2 });

    render(
      <EncountersPagination pagination={pagination} onPageChange={onPageChange} />
    );

    fireEvent.click(screen.getByText("Next"));

    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("disables Previous button on page 1", () => {
    const onPageChange = jest.fn();
    const pagination = createPagination({ page: 1 });

    render(
      <EncountersPagination pagination={pagination} onPageChange={onPageChange} />
    );

    const previousButton = screen.getByText("Previous").closest("button");

    expect(previousButton).toBeDisabled();
  });

  it("disables Next button on last page", () => {
    const onPageChange = jest.fn();
    const pagination = createPagination({
      page: 8,
      pageSize: 20,
      total: 150,
      hasMore: false,
    });

    render(
      <EncountersPagination pagination={pagination} onPageChange={onPageChange} />
    );

    const nextButton = screen.getByText("Next").closest("button");

    expect(nextButton).toBeDisabled();
  });
});
