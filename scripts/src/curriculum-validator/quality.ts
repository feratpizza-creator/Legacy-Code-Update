import { rounded, type ModuleResult, type QualityScores } from "./domain";

function metric(results: ModuleResult[], module: string, key: string): number | undefined {
  return results.find((result) => result.module === module)?.metrics[key];
}

function clamp(value: number): number {
  return Math.max(0, Math.min(100, value));
}

function moduleHealth(results: ModuleResult[], module: string): number {
  const result = results.find((item) => item.module === module);
  if (!result) return 0;
  const errors = result.issues.filter((issue) => issue.severity === "error").length;
  const warnings = result.issues.filter((issue) => issue.severity === "warning").length;
  return clamp(100 - errors * 20 - warnings * 3);
}

export function calculateQuality(results: ModuleResult[]): QualityScores {
  const structureHealth = moduleHealth(results, "Structure Validator");
  const vocabularyCompletion = metric(results, "Vocabulary Validator", "translationCompletion") ?? 0;
  const metadata = results.find((result) => result.module === "Metadata Validator");
  const metadataValues = metadata?.metrics ?? {};
  const metadataQuality = Object.values(metadataValues).length === 0 ? 0 : Object.values(metadataValues).reduce((sum, value) => sum + value, 0) / Object.values(metadataValues).length;
  const topic = metric(results, "Topic Coverage Validator", "coveredDomains") ?? 0;
  const domainTotal = metric(results, "Topic Coverage Validator", "domains") ?? 1;
  const topicCoverage = (topic / domainTotal) * 100;
  const duplicates = metric(results, "Duplicate Validator", "suspicious") ?? 0;
  const duplicateWords = metric(results, "Duplicate Validator", "duplicateWords") ?? 0;
  const duplicateQuality = duplicateWords === 0 ? 100 : clamp(100 - (duplicates / duplicateWords) * 100);
  const cefrAgreement = metric(results, "CEFR Validator", "heuristicAgreement") ?? 0;
  const architectureQuality = structureHealth;
  const curriculumConsistency = (structureHealth + moduleHealth(results, "Vocabulary Validator")) / 2;
  const vocabularyQuality = (vocabularyCompletion + cefrAgreement) / 2;
  const lessonConsistency = structureHealth;
  const unitConsistency = structureHealth;
  const overallQuality = (architectureQuality + curriculumConsistency + vocabularyQuality + metadataQuality + topicCoverage + lessonConsistency + unitConsistency + duplicateQuality) / 8;
  return {
    architectureQuality: rounded(architectureQuality),
    curriculumConsistency: rounded(curriculumConsistency),
    vocabularyQuality: rounded(vocabularyQuality),
    metadataQuality: rounded(metadataQuality),
    topicCoverage: rounded(topicCoverage),
    lessonConsistency: rounded(lessonConsistency),
    unitConsistency: rounded(unitConsistency),
    duplicateQuality: rounded(duplicateQuality),
    overallQuality: rounded(overallQuality),
  };
}
