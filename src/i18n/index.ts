import { translations, type TranslationKey } from "@/i18n/translations";

type InterpolationMap = Record<string, string | number>;

export function text(key: TranslationKey, params?: InterpolationMap): string {
  const value = translations[key];
  if (!params) return value;

  return Object.entries(params).reduce(
    (acc, [k, v]) => acc.replace(`{${k}}`, String(v)),
    value,
  );
}
