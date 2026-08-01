import type { DuplicateAnalysis } from "./duplicate-types";
import type { CurriculumStatistics, ModuleResult, QualityScores, ValidationIssue, ValidationRun } from "./domain";

function escapeCell(value: unknown): string {
  return String(value ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function table(values: Record<string, unknown>, header = "Value"): string {
  return [
    `| Key | ${header} |`,
    "|---|---:|",
    ...Object.entries(values).map(([key, value]) => `| ${escapeCell(key)} | ${escapeCell(value)} |`),
    "",
  ].join("\n");
}

function issueTable(issues: ValidationIssue[]): string {
  if (issues.length === 0) return "No issues reported by this module.\n";
  return [
    "| Severity | Code | Path | Message |",
    "|---|---|---|---|",
    ...issues.map((issue) => `| ${issue.severity} | ${escapeCell(issue.code)} | ${escapeCell(issue.path)} | ${escapeCell(issue.message)}${issue.details ? ` — ${escapeCell(issue.details)}` : ""} |`),
    "",
  ].join("\n");
}

function scoreTable(scores: QualityScores): string {
  return [
    "| Dimension | Score / 100 |",
    "|---|---:|",
    ...Object.entries(scores).map(([key, value]) => `| ${escapeCell(key)} | ${value} |`),
    "",
  ].join("\n");
}

function statsTable(stats: CurriculumStatistics): string {
  return table({
    "Vocabulary records": stats.vocabularyRecords,
    "Unique vocabulary": stats.uniqueVocabulary,
    "Duplicate ratio (%)": stats.duplicateRatio,
    "CEFR levels": stats.levels,
    Units: stats.units,
    Lessons: stats.lessons,
    "Average lesson size": stats.averageLessonSize,
    "Average unit size": stats.averageUnitSize,
    "Average vocabulary growth": stats.averageVocabularyGrowth,
  });
}

function duplicateSection(result: ModuleResult | undefined): string {
  const data = result?.data as DuplicateAnalysis | undefined;
  const duplicates = data?.duplicates ?? [];
  if (duplicates.length === 0) return "No repeated vocabulary was detected.\n";
  return [
    "| Word | Count | Category | Severity | Reason |",
    "|---|---:|---|---|---|",
    ...duplicates.map((item) => `| ${escapeCell(item.word)} | ${item.count} | ${escapeCell(item.category)} | ${item.severity} | ${escapeCell(item.reason)} |`),
    "",
  ].join("\n");
}

function moduleSections(results: ModuleResult[]): string {
  return results.map((result) => `### ${result.module}\n\n${issueTable(result.issues)}\n**Metrics**\n\n${table(result.metrics)}`).join("\n");
}

export function renderReport(run: ValidationRun): string {
  const errors = run.results.flatMap((result) => result.issues.filter((issue) => issue.severity === "error"));
  const warnings = run.results.flatMap((result) => result.issues.filter((issue) => issue.severity === "warning"));
  const duplicateResult = run.results.find((result) => result.module === "Duplicate Validator");
  const topicResult = run.results.find((result) => result.module === "Topic Coverage Validator");
  const metadataResult = run.results.find((result) => result.module === "Metadata Validator");
  const cefrResult = run.results.find((result) => result.module === "CEFR Validator");
  const topicData = topicResult?.data as { coverage?: Record<string, number>; byLevel?: Record<string, Record<string, number>> } | undefined;
  const metadataData = metadataResult?.data as { fields?: Record<string, number> } | undefined;
  const cefrData = cefrResult?.data as { method?: string; estimatedDistribution?: Record<string, number> } | undefined;
  const unitsAndLessons = Object.fromEntries(Object.keys(run.statistics.unitsByLevel).map((level) => [level, `${run.statistics.unitsByLevel[level]} units / ${run.statistics.lessonsByLevel[level]} lessons`]));

  return `# Lengoali Curriculum Validation Report

- **Validator version:** 1.0.0
- **Generated at:** ${run.generatedAt}
- **Scope:** English curriculum (ENGLISH_PACK), read-only analysis
- **Source of truth:** runtime ENGLISH_PACK assembled by the existing curriculum modules
- **Mutation policy:** this run never changes curriculum data

## Executive Summary

The validator inspected **${run.statistics.vocabularyRecords} vocabulary records**, **${run.statistics.units} units**, and **${run.statistics.lessons} lessons** across CEFR levels ${run.pack.levels.map((level) => level.cefr).join(", ")}. It found **${run.errorCount} errors** and **${run.warningCount} warnings**. The measurable overall quality score is **${run.quality.overallQuality}/100**.

This is a quality gate and diagnostic report, not an automatic cleaner. Repeated words are classified rather than blindly deleted, and CEFR results remain heuristic until an official dataset is connected.

## Architecture Summary

The validator runs outside the React application in scripts/src/curriculum-validator. It imports the already-built English language pack, normalizes it into internal domain records, runs independent modules, aggregates measurable results, and writes this Markdown report. It has no dependency on LearnCenter, App.tsx, browser state, or UI rendering.

The current source pipeline remains unchanged: curriculum modules construct LanguagePack objects, loadLanguagePacks() lazy-loads them for the frontend, and LearnCenter consumes the resulting pack. The validator observes that boundary rather than changing it.

## Validation Results

${moduleSections(run.results)}

## Errors

${issueTable(errors)}

## Warnings

${issueTable(warnings)}

## Vocabulary Statistics

${statsTable(run.statistics)}

### Vocabulary by CEFR

${table(run.statistics.vocabularyByLevel)}

### Units and Lessons by CEFR

${table(unitsAndLessons)}

## Duplicate Analysis

Repeated vocabulary is not automatically an error. The first version uses location, CEFR spread, and part-of-speech differences to classify candidates into intentional review, contextual reuse, different part of speech, or suspicious duplicate. Human review remains necessary for different meaning and contextual nuance.

${duplicateSection(duplicateResult)}

## Metadata Completion

${table(metadataData?.fields ?? {})}

## Topic Coverage

Coverage is derived from unit titles, descriptions, vocabulary categories, and tags using transparent keyword families. It is a directional signal, not semantic understanding.

${table(topicData?.coverage ?? {})}

### Topic coverage by CEFR

${Object.entries(topicData?.byLevel ?? {}).map(([level, values]) => `#### ${level}\n\n${table(values)}`).join("\n")}

## CEFR Analysis

The current CEFR module is deliberately conservative. It estimates review candidates from transparent word-shape heuristics only; it does not claim official CEFR placement. The architecture exposes a future dataset adapter boundary for Oxford, English Vocabulary Profile, frequency lists, corpus statistics, or another licensed source.

- Method: ${cefrData?.method ?? "not available"}

${table(cefrData?.estimatedDistribution ?? {})}

## Quality Scores

${scoreTable(run.quality)}

Scores are derived from observable counts: structural health, required-field completion, heuristic agreement, topic-domain presence, and duplicate classifications. They are not editorial truth and should be interpreted with the warnings above.

## Recommendations

1. Resolve structural errors before accepting future curriculum expansion.
2. Review suspicious duplicates manually; preserve intentional review and contextual reuse.
3. Enrich high-value metadata, especially definitions, IPA, examples, and example translations.
4. Connect an official CEFR/frequency dataset before using CEFR flags as automated decisions.
5. Replace keyword topic detection with curated topic tags when the curriculum model can support them without changing existing content.
6. Add Finnish and future packs by supplying another pack to the same normalizer and module pipeline.

## Future Recommendations

The next evolution should add fixture-based unit tests for each validator, a machine-readable JSON artifact, explicit curated duplicate decisions, and CI execution on curriculum-related pull requests. None of those recommendations are represented as implemented by this report.
`;
}
