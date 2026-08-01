import type { IssueSeverity } from "./domain";

export type DuplicateOccurrence = {
  word: string;
  count: number;
  category: "Intentional Review" | "Contextual Reuse" | "Different Meaning" | "Different Context" | "Different Part of Speech" | "Suspicious Duplicate" | "Accidental Duplicate";
  severity: IssueSeverity;
  reason: string;
  occurrences: Array<{ level: string; unitId: string; lessonId: string; path: string; pos?: string }>;
};

export type DuplicateAnalysis = { duplicates: DuplicateOccurrence[] };
