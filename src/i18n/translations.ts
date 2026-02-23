export const translations = {
  "app.title": "Jimini Health | Encounters",
  "app.description": "Jimini Health Encounters Dashboard",

  "encounters.loading": "Loading encounters...",
  "encounters.error": "Error fetching encounters",
  "encounters.empty": "No encounters found.",

  "encounters.table.initials": "Initials",
  "encounters.table.date": "Date",
  "encounters.table.encounterType": "Encounter Type",
  "encounters.table.status": "Status",
  "encounters.table.viewEncounter": "View encounter for {initials} on {date}",

  "encounters.pagination.pageOf": "Page {page} of {total}",
  "encounters.pagination.previous": "Previous",
  "encounters.pagination.next": "Next",

  "encounters.api.notFound": "Encounter not found",
} as const;

export type TranslationKey = keyof typeof translations;
