import type { Encounter } from "@/types/encounters";

export interface TrackEventMap {
  encounter_viewed: { encounter: Encounter };
  encounters_list_viewed: { page: number };
  encounter_row_clicked: { encounterId: string };
  pagination_changed: { fromPage: number; toPage: number };
  back_to_encounters_clicked: { fromEncounterId: string } | undefined;
  encounters_fetch_error: { page: number };
}
