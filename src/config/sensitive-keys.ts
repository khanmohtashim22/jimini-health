/**
 * Keys that should be redacted before logging or event tracking.
 * Extend this list when adding new sensitive fields.
 */
export const SENSITIVE_KEYS = ["patientId", "notes"] as const;
