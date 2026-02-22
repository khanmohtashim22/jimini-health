import type { Encounter, EncounterType, EncounterStatus, Assessment } from '@/types/encounters';

const FIRST_INITIALS = ['J', 'M', 'S', 'A', 'R', 'K', 'L', 'D', 'E', 'T', 'C', 'N', 'B', 'P', 'H'];
const LAST_INITIALS = ['D', 'S', 'M', 'J', 'W', 'B', 'T', 'K', 'R', 'L', 'C', 'H', 'G', 'N', 'P'];

const ENCOUNTER_TYPES: EncounterType[] = [
  'therapy_session',
  'initial_assessment',
  'follow_up',
  'crisis_intervention',
  'medication_review',
  'group_therapy',
];

const STATUSES: EncounterStatus[] = ['scheduled', 'in_progress', 'completed', 'cancelled', 'no_show'];
const STATUS_WEIGHTS = [0.1, 0.05, 0.7, 0.1, 0.05];

const DURATIONS = [30, 45, 50, 60, 90];

const ASSESSMENT_TYPES: { name: string; maxScore: number }[] = [
  { name: 'GAD-7', maxScore: 21 },
  { name: 'PHQ-9', maxScore: 27 },
  { name: 'PCL-5', maxScore: 80 },
  { name: 'BDI-II', maxScore: 63 },
  { name: 'BAI', maxScore: 63 },
  { name: 'AUDIT', maxScore: 40 },
];

const THERAPY_NOTES = [
  'Patient showed improvement in anxiety management techniques. Continued focus on cognitive restructuring exercises.',
  'Discussed coping strategies for work-related stress. Patient reports better sleep patterns this week.',
  'Explored childhood experiences and their impact on current relationships. Patient showed emotional insight.',
  'Reviewed medication adherence. Patient reports side effects have diminished. Mood stability improving.',
  'Crisis intervention session. Patient presented with acute anxiety. Implemented grounding techniques.',
  'Group session focused on interpersonal skills. Patient participated actively in role-playing exercises.',
  'Follow-up on previous session goals. Patient completed homework assignments. Progress noted in social situations.',
  'Initial assessment completed. Established treatment goals and therapeutic alliance.',
  'Patient reports decreased depressive symptoms. Continued behavioral activation strategies.',
  'Addressed trauma-related triggers. EMDR session conducted with positive response.',
  'Family dynamics explored. Patient gaining insight into communication patterns.',
  'Mindfulness exercises introduced. Patient receptive to meditation practice.',
  'Relapse prevention strategies reviewed. Patient maintaining sobriety milestones.',
  'Occupational stress management discussed. Work-life balance strategies implemented.',
  'Patient expressed concerns about medication changes. Psychoeducation provided.',
];

function seededRandom(seed: number): () => number {
  return () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
}

function weightedRandom<T>(items: T[], weights: number[], random: () => number): T {
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  let value = random() * totalWeight;
  
  for (let i = 0; i < items.length; i++) {
    value -= weights[i];
    if (value <= 0) return items[i];
  }
  
  return items[items.length - 1];
}

function generatePatientId(index: number, random: () => number): string {
  const patientPool = 50;
  const patientNum = Math.floor(random() * patientPool) + 100;
  return `pat_${patientNum}`;
}

function generateInitials(random: () => number): string {
  const first = FIRST_INITIALS[Math.floor(random() * FIRST_INITIALS.length)];
  const last = LAST_INITIALS[Math.floor(random() * LAST_INITIALS.length)];
  return `${first}.${last}.`;
}

function generateDate(index: number, total: number): string {
  const now = new Date('2024-11-25T00:00:00Z');
  const daysBack = Math.floor((index / total) * 180);
  const date = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);
  
  const hours = 8 + Math.floor(Math.random() * 10);
  const minutes = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
  date.setHours(hours, minutes, 0, 0);
  
  return date.toISOString();
}

function generateAssessments(random: () => number): Assessment[] | undefined {
  if (random() > 0.4) return undefined;
  
  const count = Math.floor(random() * 3) + 1;
  const shuffled = [...ASSESSMENT_TYPES].sort(() => random() - 0.5);
  
  return shuffled.slice(0, count).map(({ name, maxScore }) => ({
    name,
    score: Math.floor(random() * (maxScore * 0.6)),
  }));
}

function generateEncounter(index: number, total: number): Encounter {
  const seed = index * 12345 + 67890;
  const random = seededRandom(seed);
  
  const patientId = generatePatientId(index, random);
  
  return {
    id: `enc_${(1000 + index).toString()}`,
    patientId,
    patientInitials: generateInitials(random),
    encounterDate: generateDate(index, total),
    encounterType: ENCOUNTER_TYPES[Math.floor(random() * ENCOUNTER_TYPES.length)],
    duration: DURATIONS[Math.floor(random() * DURATIONS.length)],
    status: weightedRandom(STATUSES, STATUS_WEIGHTS, random),
    notes: THERAPY_NOTES[Math.floor(random() * THERAPY_NOTES.length)],
    assessments: generateAssessments(random),
  };
}

const TOTAL_ENCOUNTERS = 150;

export const mockEncounters: Encounter[] = Array.from(
  { length: TOTAL_ENCOUNTERS },
  (_, i) => generateEncounter(i, TOTAL_ENCOUNTERS)
);

export function getEncounterById(id: string): Encounter | undefined {
  return mockEncounters.find((enc) => enc.id === id);
}

export function getEncounters(
  page: number = 1,
  pageSize: number = 20
): { encounters: Encounter[]; pagination: { page: number; pageSize: number; total: number; hasMore: boolean } } {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const encounters = mockEncounters.slice(start, end);
  
  return {
    encounters,
    pagination: {
      page,
      pageSize,
      total: TOTAL_ENCOUNTERS,
      hasMore: end < TOTAL_ENCOUNTERS,
    },
  };
}
