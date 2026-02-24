import { track } from "@/lib/track";

const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

describe("track", () => {
  beforeEach(() => {
    consoleSpy.mockClear();
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  it("calls console.log with event and redacted payload", () => {
    track("encounter_viewed", {
      encounter: {
        id: "enc_1",
        patientId: "pat_1",
        patientInitials: "J.D.",
        encounterDate: "2024-01-01",
        encounterType: "therapy_session",
        duration: 50,
        status: "completed",
        notes: "Secret",
      },
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      "[track]",
      "encounter_viewed",
      expect.objectContaining({
        encounter: expect.objectContaining({
          id: "enc_1",
          patientId: "[REDACTED]",
          notes: "[REDACTED]",
        }),
      }),
    );
  });

  it("calls console.log with event and empty object when data is undefined", () => {
    track("back_to_encounters_clicked", undefined);

    expect(consoleSpy).toHaveBeenCalledWith(
      "[track]",
      "back_to_encounters_clicked",
      {},
    );
  });
});
