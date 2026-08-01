import { normalizePack } from "./normalize";
import { structureValidator } from "./structure-validator";
import { vocabularyValidator } from "./vocabulary-validator";
import { duplicateValidator } from "./duplicate-validator";
import { metadataValidator } from "./metadata-validator";
import { topicValidator } from "./topic-validator";
import { cefrValidator } from "./cefr-validator";
import { statisticsGenerator } from "./statistics";
import { calculateQuality } from "./quality";
import type { ValidationRun } from "./domain";

export type CurriculumPackLoader = () => Promise<unknown>;

export async function loadEnglishPack(): Promise<unknown> {
  // Keep the source curriculum outside the scripts TypeScript program. tsx
  // resolves this runtime-only import when the validator is executed.
  const curriculumModulePath = "../../../artifacts/lengoali/src/curriculum-en.ts";
  const module = await import(curriculumModulePath);
  return module.ENGLISH_PACK;
}

export async function validatePack(loadPack: CurriculumPackLoader = loadEnglishPack): Promise<ValidationRun> {
  const sourcePack = await loadPack();
  const pack = normalizePack(sourcePack);
  const records = pack.levels.flatMap((level) => level.units.flatMap((unit) => unit.lessons.flatMap((lesson) => lesson.vocabulary)));
  const context = { pack, records };
  const modules = [structureValidator, vocabularyValidator, duplicateValidator, metadataValidator, topicValidator, cefrValidator, statisticsGenerator];
  const results = modules.map((module) => module.run(context));
  const quality = calculateQuality(results);
  const issues = results.flatMap((result) => result.issues);
  return { generatedAt: new Date().toISOString(), pack, results, statistics: results.find((result) => result.module === "Statistics Generator")?.data as ValidationRun["statistics"], quality, errorCount: issues.filter((issue) => issue.severity === "error").length, warningCount: issues.filter((issue) => issue.severity === "warning").length };
}
