import { redact } from "@/lib/redact";

describe("redact", () => {
  it("returns null for null", () => {
    expect(redact(null)).toBe(null);
  });

  it("returns undefined for undefined", () => {
    expect(redact(undefined)).toBe(undefined);
  });

  it("returns primitives unchanged", () => {
    expect(redact("hello")).toBe("hello");
    expect(redact(42)).toBe(42);
    expect(redact(true)).toBe(true);
  });

  it("redacts patientId and notes at top level", () => {
    const input = { patientId: "pat_101", notes: "Secret note" };
    expect(redact(input)).toEqual({
      patientId: "[REDACTED]",
      notes: "[REDACTED]",
    });
  });

  it("leaves non-sensitive keys unchanged", () => {
    const input = {
      id: "enc_1001",
      patientInitials: "J.D.",
      encounterType: "therapy_session",
      status: "completed",
    };
    expect(redact(input)).toEqual(input);
  });

  it("redacts nested patientId and notes", () => {
    const input = {
      encounter: {
        id: "enc_1",
        patientId: "pat_1",
        notes: "Clinical notes here",
      },
    };
    expect(redact(input)).toEqual({
      encounter: {
        id: "enc_1",
        patientId: "[REDACTED]",
        notes: "[REDACTED]",
      },
    });
  });

  it("redacts inside arrays", () => {
    const input = [{ patientId: "pat_1" }, { notes: "note" }];
    expect(redact(input)).toEqual([
      { patientId: "[REDACTED]" },
      { notes: "[REDACTED]" },
    ]);
  });

  it("does not mutate the original object", () => {
    const input = { patientId: "pat_101", id: "enc_1" };
    const result = redact(input);
    expect(input.patientId).toBe("pat_101");
    expect(result).not.toBe(input);
  });
});
