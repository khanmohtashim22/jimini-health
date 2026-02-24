const SENSITIVE_KEYS = ["patientId", "notes"] as const;
const REDACTED = "[REDACTED]";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

/**
 * Recursively redacts sensitive fields (patientId, notes) from an object.
 * Returns a deep copy with sensitive values replaced by [REDACTED].
 * Safe for logging and event tracking.
 */
export function redact<T>(value: T): T {
  if (value === null || value === undefined) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => redact(item)) as T;
  }

  if (isPlainObject(value)) {
    const result: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value)) {
      if (SENSITIVE_KEYS.includes(key as (typeof SENSITIVE_KEYS)[number])) {
        result[key] = REDACTED;
      } else {
        result[key] = redact(val);
      }
    }
    return result as T;
  }

  return value;
}
