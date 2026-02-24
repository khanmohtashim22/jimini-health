import { redact } from "@/lib/redact";

/**
 * Tracks an event with redacted data. Sensitive fields (patientId, notes)
 * are replaced before output. Use for logging and analytics.
 * Currently logs to console; can be extended to send to analytics services.
 */
export function track(event: string, data?: Record<string, unknown>): void {
  const payload = data ? redact(data) : undefined;
  if (typeof window !== "undefined") {
    // eslint-disable-next-line no-console
    console.log("[track]", event, payload ?? {});
  }
}
