import { SENSITIVE_KEYS } from "@/config/sensitive-keys";

const REDACTED = "[REDACTED]";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

const sensitiveKeySet = new Set<string>(SENSITIVE_KEYS);

/**
 * Recursively redacts sensitive fields from an object.
 * Uses keys from @/config/sensitive-keys. Returns a deep copy with
 * sensitive values replaced by [REDACTED]. Safe for logging and event tracking.
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
      if (sensitiveKeySet.has(key)) {
        result[key] = REDACTED;
      } else {
        result[key] = redact(val);
      }
    }
    return result as T;
  }

  return value;
}
