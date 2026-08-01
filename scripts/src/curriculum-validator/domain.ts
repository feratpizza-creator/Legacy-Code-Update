export const CEFR_LEVELS = ["A0", "A1", "A2", "B1", "B2", "C1", "C2"] as const;
export type CefrLevel = (typeof CEFR_LEVELS)[number];

export type IssueSeverity = "error" | "warning" | "info";

export type ValidationIssue = {
  module: string;
  severity: IssueSeverity;
  code: string;
  path: string;
  message: string;
  details?: string;
};

export type VocabularyRecord = {
  word: string;
  normalizedWord: string;
  translation: string;
  translationLang?: string;
  pos?: string;
  definition?: string;
  ipa?: string;
  audioUrl?: string;
  example?: string;
  exampleTranslation?: string;
  synonyms?: string[] | string;
  antonyms?: string[] | string;
  collocations?: string[] | string;
  wordFamily?: string[] | string;
  tags?: string[] | string;
  category?: string;
  level: CefrLevel;
  unitId: string;
  unitTitle: string;
  lessonId: string;
  lessonTitle: string;
  path: string;
};

export type CurriculumLesson = {
  id: string;
  title: string;
  vocabulary: VocabularyRecord[];
  grammar: unknown[];
  reading?: Record<string, unknown>;
  exercises: unknown[];
  quiz: unknown[];
  reviewItems: string[];
  flashcards: unknown[];
  raw: Record<string, unknown>;
};

export type CurriculumUnit = {
  id: string;
  title: string;
  description: string;
  lessons: CurriculumLesson[];
  raw: Record<string, unknown>;
};

export type CurriculumLevel = {
  id: string;
  cefr: string;
  title: string;
  description: string;
  units: CurriculumUnit[];
  raw: Record<string, unknown>;
};

export type CurriculumPack = {
  id: string;
  name: string;
  targetLang: string;
  explanationLangs: string[];
  levels: CurriculumLevel[];
};

export type ValidationContext = {
  pack: CurriculumPack;
  records: VocabularyRecord[];
};

export type ModuleResult = {
  module: string;
  issues: ValidationIssue[];
  metrics: Record<string, number>;
  data?: unknown;
};

export type ValidatorModule = {
  name: string;
  run(context: ValidationContext): ModuleResult;
};

export type CurriculumStatistics = {
  vocabularyRecords: number;
  uniqueVocabulary: number;
  duplicateRatio: number;
  levels: number;
  units: number;
  lessons: number;
  averageLessonSize: number;
  averageUnitSize: number;
  averageVocabularyGrowth: number;
  vocabularyByLevel: Record<string, number>;
  vocabularyByUnit: Record<string, number>;
  lessonsByLevel: Record<string, number>;
  unitsByLevel: Record<string, number>;
};

export type QualityScores = {
  architectureQuality: number;
  curriculumConsistency: number;
  vocabularyQuality: number;
  metadataQuality: number;
  topicCoverage: number;
  lessonConsistency: number;
  unitConsistency: number;
  duplicateQuality: number;
  overallQuality: number;
};

export type ValidationRun = {
  generatedAt: string;
  pack: CurriculumPack;
  results: ModuleResult[];
  statistics: CurriculumStatistics;
  quality: QualityScores;
  errorCount: number;
  warningCount: number;
};

export function percentage(value: number, total: number): number {
  return total === 0 ? 0 : (value / total) * 100;
}

export function rounded(value: number, digits = 1): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}
