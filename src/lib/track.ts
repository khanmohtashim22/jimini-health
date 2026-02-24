import { redact } from "@/lib/redact";
import type { TrackEventMap } from "@/types/track-events";

/**
 * Tracks an event with redacted data. Sensitive fields (patientId, notes)
 * are replaced before output. Use for logging and analytics.
 * Currently logs to console; can be extended to send to analytics services.
 */
export function track<K extends keyof TrackEventMap>(
  event: K,
  data: TrackEventMap[K],
): void {
  const payload =
    data !== undefined ? redact(data as Record<string, unknown>) : undefined;
  if (typeof window !== "undefined") {
    // eslint-disable-next-line no-console
    console.log("[track]", event, payload ?? {});
  }
}
