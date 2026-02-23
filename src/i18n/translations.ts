export const translations = {
  "app.title": "Jimini Health | Encounters",
  "app.description": "Jimini Health Encounters Dashboard",

  "encounters.loading": "Loading encounters...",
  "encounters.error": "Error fetching encounters",
  "encounters.empty": "No encounters found.",
  "encounters.pageOf": "Page {page} of {total}",
  "encounters.previous": "Previous",
  "encounters.next": "Next",

  "encounters.api.notFound": "Encounter not found",
} as const;

export type TranslationKey = keyof typeof translations;
