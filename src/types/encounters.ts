export type EncounterType =
  | "therapy_session"
  | "initial_assessment"
  | "follow_up"
  | "crisis_intervention"
  | "medication_review"
  | "group_therapy";

export type EncounterStatus =
  | "scheduled"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "no_show";

export interface Assessment {
  name: string;
  score: number;
}

export interface Encounter {
  id: string;
  patientId: string;
  patientInitials: string;
  encounterDate: string;
  encounterType: EncounterType;
  duration: number;
  status: EncounterStatus;
  notes: string;
  assessments?: Assessment[];
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}

export interface EncountersResponse {
  encounters: Encounter[];
  pagination: PaginationInfo;
}
